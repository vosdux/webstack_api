import { NextFunction, Request, Response } from "express";
import { userInfoService } from "../../services";

class UserInfoController {
  updateUserInfo = async (
    req: Request<{}, {}, UserInfoBody>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const userInfo = await userInfoService.updateUserInfo(
        req.body,
        req.user,
        req.file
      );

      res.json(userInfo);
    } catch (error) {
      next(error);
    }
  };

  getUserInfo = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const data = await userInfoService.getUserInfo(req.user as string);

      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new UserInfoController();
