import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/user-controller";

const userRouter = Router();

userRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.registration
);
userRouter.post("/login", UserController.login);
userRouter.post("/logout", UserController.logout);
userRouter.post("/change-password-request", UserController.changePasswordRequest);
userRouter.post(
  "/change-password",
  body("password").isLength({ min: 3, max: 32 }),
  UserController.changePassword
);
userRouter.post("/resend", UserController.resendEmail);
userRouter.get("/check", UserController.check);
userRouter.get("/activate/:link", UserController.activate);
userRouter.get("/refresh", UserController.refresh);

export default userRouter;
