import bcrypt from "bcrypt";
import dotenv from 'dotenv';
import { v4 as uuid } from "uuid";
import mailService from "./mail-service";
import tokenService from "./token-service";
import UserDto from "../dto/user-dto";
import ApiError from "../exceptions/index";
import { User } from "../models";
import { UserInstance } from "../models/user-model";

dotenv.config();

class UserService {
  private giveTokensToUser = async (user: UserInstance) => {
    const userDto = new UserDto(user);
    const tokens = tokenService.generateTokens({
      id: userDto.id,
      role: userDto.role,
      email: userDto.email,
    });
    await tokenService.saveToken(user.id, tokens.refreshToken);

    return {
      ...tokens,
      user: userDto,
    };
  };

  registration = async (
    email: string,
    password: string,
    secondPassword: string
  ) => {
    const candidate = await User.findOne({ where: { email } });

    if (password !== secondPassword) {
      throw ApiError.BadRequest("Пароли не совпадают");
    }

    if (candidate) {
      throw ApiError.BadRequest("Такой email уже существует");
    }
    const hashPassword = await bcrypt.hash(password, 3);
    const activateLink = uuid();
    const user = await User.create({
      email,
      password: hashPassword,
      activateLink,
    });

    await mailService.sendActivationMail(
      email,
      `${process.env.API_URL}/api/activate${activateLink}`
    );

    return await this.giveTokensToUser(user);
  };

  login = async (username: string, password: string) => {
    const err = "Неверный логин или пароль";
    const user = await User.findOne({ where: { email: username } });

    if (!user) {
      throw ApiError.BadRequest(err);
    }

    const isPasswordEqual = await bcrypt.compare(password, user.password);

    if (!isPasswordEqual) {
      throw ApiError.BadRequest(err);
    }

    return await this.giveTokensToUser(user);
  };

  activate = async (activateLink: string) => {
    const user = await User.findOne({ where: { activateLink } });

    if (!user) {
      throw ApiError.BadRequest("Некоректная ссылка активации");
    }

    user.isActivated = true;
    await user.save();
  };

  logout = async (refreshToken: string) => {
    return await tokenService.removeToken(refreshToken);
  };

  refresh = async (refreshToken: string) => {
    if (!refreshToken) {
      throw ApiError.BadRequest("Нет токена");
    }
    const userData = await tokenService.validateRefreshToken(refreshToken);
    const tokenFromDb = await tokenService.findToken(refreshToken);

    if (!userData || !tokenFromDb) {
      throw ApiError.BadRequest("Не авторизован");
    }

    const user = (await User.findOne({
      // @ts-ignore
      where: { id: userData.id },
    })) as UserInstance;
    return this.giveTokensToUser(user);
  };

  changePasswordRequest = async (email: string) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw ApiError.BadRequest("Неверный email");
    }

    const changeLink = uuid();

    user.changeLink = changeLink;
    await user.save();
    await mailService.sendChangePasswordMail(
      email,
      `${process.env.API_URL}/api/activate${changeLink}`
    );
  };

  changePassword = async (
    password: string,
    secondPassword: string,
    changeLink: string
  ) => {
    const user = await User.findOne({ where: { changeLink } });

    if (!user) {
      throw ApiError.BadRequest("Неверная ссылка для смены пароля");
    }

    if (password !== secondPassword) {
      throw ApiError.BadRequest("Пароли не совпадают");
    }

    user.password = await bcrypt.hash(password, 3);
    user.save();
  };

  check = async (accessToken: string, refreshToken: string) => {
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }

    

  }
}

export default new UserService();
