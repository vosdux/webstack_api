import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from 'dotenv';
import { Token } from "../models/token-model";

dotenv.config();

type TokenPayload = { id: string; email: string; role: string };

class TokenService {
  generateTokens = (payload: TokenPayload) => {
    const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "30m",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "30d",
    });

    return {
      accessToken,
      refreshToken,
    };
  };

  saveToken = async (userId: string, refreshToken: string) => {
    const tokenData = await Token.findOne({ where: { userId } });

    if (tokenData) {
      tokenData.refreshToken = refreshToken;
      await tokenData.save()
    } else {
      const token = await Token.create({ userId, refreshToken });
      return token;
    }
  };

  removeToken = async (refreshToken: string) => {
    const tokenData = await Token.destroy({ where: { refreshToken } });
    return tokenData;
  };

  validateAccessToken = async (token: string) => {
    try {
      const userData = await jwt.verify(token, process.env.JWT_ACCESS_SECRET) as JwtPayload;
      return userData;
    } catch (error) {
      return null;
    }
  };

  validateRefreshToken = async (token: string) => {
    try {
      const userData = await jwt.verify(token, process.env.JWT_REFRESH_SECRET) as JwtPayload;
      return userData;
    } catch (error) {
      return null;
    }
  };

  findToken = async (refreshToken: string) => {
    return await Token.findOne({ where: { refreshToken } });
  };
}

export default new TokenService();
