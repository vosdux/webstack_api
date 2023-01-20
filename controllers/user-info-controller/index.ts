import { NextFunction, Request, Response } from "express";
import userInfoService from "../../services/user-info-service";

class UserInfoController {
  updateUserInfo = async (
    req: Request<{}, {}, UserInfoBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { authorization } = req.headers;

      await userInfoService.updateUserInfo(
        req.body,
        authorization?.split(" ")[1],
        req.file
      );

      res.json({ succes: true });
    } catch (error) {
      next(error);
    }
  };

  getUserInfo = async (
    req: Request<{}, {}, {}, { id: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { id } = req.query;

      const data = await userInfoService.getUserInfo(id);

      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new UserInfoController();
