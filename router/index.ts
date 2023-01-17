import { Router } from "express";
import { body } from "express-validator";
import UserController from "../controllers/user-controller";
import userInfoController from "../controllers/user-info-controller";

const router = Router();

router.post(
  "/registration",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 32 }),
  UserController.registration
);
router.post("/login", UserController.login);
router.post("/logout", UserController.logout);
router.post("/change-password-request", UserController.changePasswordRequest);
router.post(
  "/change-password",
  body("password").isLength({ min: 3, max: 32 }),
  UserController.changePassword
);
router.post("/resend", UserController.resendEmail);
router.get("/check", UserController.check);
router.get("/activate/:link", UserController.activate);
router.get("/refresh", UserController.refresh);

router.post("/user-info", userInfoController.updateUserInfo);

export default router;
