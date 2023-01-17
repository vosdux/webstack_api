import { NextFunction, Request, Response } from "express";
import userInfoService from "../../services/user-info-service";

class UserInfoController {
  updateUserInfo = async (
    req: Request<{}, {}, UserInfoBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const file = req.files?.file
      const { authorization } = req.headers;

      await userInfoService.updateUserInfo(req.body, authorization?.split(" ")[1], file);

      res.json({ succes: true });
    } catch (error) {
      next(error);
    }
  };
}

export default new UserInfoController();