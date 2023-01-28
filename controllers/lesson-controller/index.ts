import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import ApiError from "../../exceptions";
import { LessonCreationAttributes } from "../../models/lesson-model";
import { lessonService } from "../../services";

class LessonController {
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
}

export default new LessonController();
