import { Router } from "express";
import userInfoController from "../controllers/user-info-controller";
import fileMiddleware from "../middleware/file-middleware";

const userInfoRouter = Router();

userInfoRouter.post("/user-info", fileMiddleware.single('avatar'), userInfoController.updateUserInfo);
userInfoRouter.get("/user-info/:userId", userInfoController.getUserInfo);

export default userInfoRouter;
