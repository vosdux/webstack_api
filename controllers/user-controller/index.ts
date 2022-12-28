import dotenv from 'dotenv';
import { NextFunction, Request, Response } from "express";
import userService from "../../services/user-service";

dotenv.config();

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const REFRESH_COOKIES_OPTIONS = { maxAge: THIRTY_DAYS, httpOnly: true };

class UserController {
  registration = async (
    req: Request<{}, {}, RegistrationBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email, password, secondPassword } = req.body;
      const userData = await userService.registration(
        email,
        password,
        secondPassword
      );
      res.cookie(
        "refreshToken",
        userData.refreshToken,
        REFRESH_COOKIES_OPTIONS
      );
      res.json(userData);
    } catch (error) {
      next(error);
    }
  };

  login = async (
    req: Request<{}, {}, LoginBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { username, password } = req.body;
      const userData = await userService.login(username, password);
      res.cookie(
        "refreshToken",
        userData.refreshToken,
        REFRESH_COOKIES_OPTIONS
      );
      res.json(userData);
    } catch (error) {
      next(error);
    }
  };

  activate = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { link } = req.params;
      await userService.activate(link);
      return res.redirect(process.env.CLIENT_URL);
    } catch (error) {
      next(error);
    }
  };

  logout = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const token = await userService.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (error) {
      next(error);
    }
  };

  refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { refreshToken } = req.cookies;
      const userData = await userService.refresh(refreshToken);
      res.cookie(
        "refreshToken",
        userData.refreshToken,
        REFRESH_COOKIES_OPTIONS
      );
      return res.json(userData);
    } catch (error) {
      next(error);
    }
  };

  changePasswordRequest = async (
    req: Request<{}, {}, { email: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { email } = req.body;
      await userService.changePasswordRequest(email);
      res.status(200);
    } catch (error) {
      next(error);
    }
  };

  changePassword = async (
    req: Request<{}, {}, ChnagePasswordBoody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { password, secondPassword, chnageLink } = req.body;
      await userService.changePassword(password, secondPassword, chnageLink);
      res.status(200);
    } catch (error) {
      next(error);
    }
  };

  check = async (
    req: Request<{}, {}, { token: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { token } = req.body;
      
    } catch (error) {}
  };
}

export default new UserController();
