import { Router } from "express";
import { body } from "express-validator";
import courseController from "../controllers/course-controller";
import fileMiddleware from "../middleware/file-middleware";
import roleMiddleware from "../middleware/role-middleware";

const coursesRouter = Router();

coursesRouter.get("/courses", courseController.getCourses);
coursesRouter.get("/courses/:courseId", courseController.getCourseInfo);
coursesRouter.post(
  "/courses",
  roleMiddleware,
  fileMiddleware.single("image"),
  body("name").isLength({ min: 3, max: 30 }),
  body("description").isLength({ min: 3, max: 300 }),
  body("price").isLength({ min: 3, max: 10 }),
  courseController.createCourse
);
coursesRouter.put(
  "/courses",
  roleMiddleware,
  fileMiddleware.single("image"),
  body("id").notEmpty(),
  body("name").isLength({ min: 3, max: 30 }),
  body("description").isLength({ min: 3, max: 300 }),
  body("price").isLength({ min: 3, max: 10 }),
  courseController.updateCourse
);
coursesRouter.delete("/courses/:courseId", roleMiddleware, courseController.deleteCourse);

export default coursesRouter;
