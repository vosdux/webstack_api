import { Router } from "express";
import { body } from "express-validator";
import courseController from "../controllers/course-controller";
import fileMiddleware from "../middleware/file-middleware";

const coursesRouter = Router();

coursesRouter.get("/courses", courseController.getCourses);
coursesRouter.get("/courses/:courseId", courseController.getCourseInfo);
coursesRouter.post(
  "/courses",
  fileMiddleware.single("avatar"),
  body("name").isLength({ min: 3, max: 30 }),
  body("description").isLength({ min: 3, max: 300 }),
  body("price").isLength({ min: 3, max: 10 }),
  courseController.createCourse
);
coursesRouter.put(
  "/courses",
  fileMiddleware.single("avatar"),
  body("id").notEmpty(),
  body("name").isLength({ min: 3, max: 30 }),
  body("description").isLength({ min: 3, max: 300 }),
  body("price").isLength({ min: 3, max: 10 }),
  courseController.updateCourse
);

export default coursesRouter;
