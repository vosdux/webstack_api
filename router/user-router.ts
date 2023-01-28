import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/user-controller";

const userRouter = Router();

userRouter.post(
  "/registration",
  body("email").isEmail(),
  body("password")
    .isLength({ min: 8, max: 32 })
    .withMessage("Пароль слишком короткий")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")
    .withMessage("Недостаточно надежный пароль"),
  UserController.registration
);
userRouter.post("/login", UserController.login);
userRouter.post("/logout", UserController.logout);
userRouter.post(
  "/change-password-request",
  body("email").isEmail(),
  UserController.changePasswordRequest
);
userRouter.post(
  "/change-password",
  body("password")
    .isLength({ min: 8, max: 32 })
    .withMessage("Пароль слишком короткий")
    .matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])")
    .withMessage("Недостаточно надежный пароль"),
  UserController.changePassword
);
userRouter.post("/resend", UserController.resendEmail);
userRouter.post("/check", UserController.check);
userRouter.get("/activate/:link", UserController.activate);
userRouter.get("/refresh", UserController.refresh);

export default userRouter;
