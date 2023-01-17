import { UserInfo } from './../models/user-info-model';
import { UploadedFile } from "express-fileupload"
import ApiError from "../exceptions";
import tokenService from './token-service';

const allowedAvatrTypes = ['image/png'];

class UserInfoService {
  updateUserInfo = async (data: UserInfoBody, accessToken?: string, file?: UploadedFile | UploadedFile[]) => {
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
      if (Array.isArray(file)) {
        throw ApiError.BadRequest('Загрузите одну картинку');
      }
  
      if (!allowedAvatrTypes.some(elem => elem === file.mimetype)) {
        throw ApiError.BadRequest('Не поддерживаемый формат');
      }
  
      if (file.size > 907390) {
        throw ApiError.BadRequest('Слишком большой размер');
      }

      file.mv('/avatars');

      userInfo.avatar = `${process.env.API_URL}/avatars`;
    }

    const { firstName, lastName, country, city } = data;

    userInfo.city = city;
    userInfo.country = country;
    userInfo.lastName = lastName;
    userInfo.firstName = firstName;

    await userInfo.save();
  }
}

export default new UserInfoService();
