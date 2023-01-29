import { NextFunction, Request, Response } from "express";
import { userInfoService } from "../../services";

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
    req: Request<{ userId: string }>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.params;

      const data = await userInfoService.getUserInfo(userId);

      res.json(data);
    } catch (error) {
      next(error);
    }
  };
}

export default new UserInfoController();
