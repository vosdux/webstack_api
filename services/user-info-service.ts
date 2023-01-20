import path from 'path';
import dotenv from 'dotenv';
import { UserInfo } from './../models/user-info-model';
import ApiError from "../exceptions";
import tokenService from './token-service';

dotenv.config();

class UserInfoService {
  updateUserInfo = async (data: UserInfoBody, accessToken?: string, file?: Express.Multer.File) => {
    if (!accessToken) {
      throw ApiError.UnauthorizedError();
    }

    const accessPayload = await tokenService.validateAccessToken(accessToken);

    if (!accessPayload) {
      throw ApiError.UnauthorizedError();
    }

    const userInfo = await UserInfo.findOne({ where: { userId: accessPayload.id } });

    if (!userInfo) {
      throw ApiError.BadRequest('Такого пользователя не существует');
    }

    if (file) {  
      if (file.size > 907390) {
        throw ApiError.BadRequest('Слишком большой размер');
      }

      userInfo.avatar = `${process.env.API_URL}/images/${file.filename}`;
    }

    const { firstName, lastName, country, city } = data;

    userInfo.city = city;
    userInfo.country = country;
    userInfo.lastName = lastName;
    userInfo.firstName = firstName;

    await userInfo.save();
  };

  getUserInfo = async (userId: string) => {
    const user = await UserInfo.findOne({ where: { userId } });

    if (!user) {
      throw ApiError.BadRequest('Пользователя не существует');
    }

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      country: user.country,
      city: user.city,
      info: user.info,
      avatar: user.avatar,
    };
  };
}

export default new UserInfoService();
