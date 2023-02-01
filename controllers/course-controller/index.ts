import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../../exceptions";
import {
  CourseAttributes,
  CourseCreationAttributes,
} from "../../models/course-model";
import { courseService } from "../../services";

class CourseController {
  getCourses = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { offset, limit, search } = req.query;

      const courses = await courseService.getCourses(
        req.user as string,
        offset as string,
        limit as string,
        search as string | undefined,
      );

      res.send(courses);
    } catch (error) {
      next(error);
    }
  };

  getCourseInfo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { courseId } = req.params;
      const course = await courseService.getCourseInfo(courseId);

      res.send(course);
    } catch (error) {
      next(error);
    }
  };

  createCourse = async (
    req: Request<{}, {}, CourseCreationAttributes>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }

      const course = await courseService.createCourse(req.body, req.file);

      res.send(course);
    } catch (error) {
      next(error);
    }
  };

  updateCourse = async (
    req: Request<{}, {}, CourseAttributes>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }

      const course = await courseService.updateCourse(req.body, req.file);

      res.send(course);
    } catch (error) {
      next(error);
    }
  };

  deleteCourse = async (req: Request,
    res: Response,
    next: NextFunction) => {
      try {
        const { courseId } = req.params;

        const id = await courseService.deleteCourse(courseId);

        res.send({ id });
      } catch (error) {
        next(error);
      }
    }
}

export default new CourseController();
