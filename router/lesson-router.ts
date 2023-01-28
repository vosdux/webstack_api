import { Router } from "express";
import { body } from "express-validator";
import lessonController from "../controllers/lesson-controller";
import fileMiddleware from "../middleware/file-middleware";

const lessonRouter = Router();

lessonRouter.post(
  "/lessons",
  fileMiddleware.single("avatar"),
  body("name").isLength({ min: 3, max: 20 }),
  body("video").isURL(),
  body("text").isLength({ min: 3, max: 300 }),
  body("homework").isLength({ min: 3, max: 300 }),
  body("courseId").notEmpty(),
  lessonController.createLesson
);

export default lessonRouter;
