import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../../exceptions";
import { LessonCreationAttributes } from "../../models/lesson-model";
import { lessonService } from "../../services";

class LessonController {
  getLessons = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { offset, limit } = req.query;
      const lessons = await lessonService.getLessons(offset as string, limit as string);

      res.send(lessons);
    } catch (error) {
      next(error);
    }
  };

  createLesson = async (
    req: Request<{}, {}, LessonCreationAttributes>,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Ошибка валидации", errors.array()));
      }

      const lesson = await lessonService.createLesson(req.body);

      res.send(lesson);
    } catch (error) {
      next(error);
    }
  };

  updateLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const lesson = await lessonService.updateLesson(req.body);

      res.send(lesson);
    } catch (error) {
      next(error);
    }
  };

  deleteLesson = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { lessonId } = req.params;
      const id = await lessonService.deleteLesson(lessonId);
      res.send({ id });
    } catch (error) {
      next(error);
    }
  };
}

export default new LessonController();
