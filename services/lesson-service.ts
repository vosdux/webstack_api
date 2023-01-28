import { Lesson, LessonCreationAttributes } from '../models/lesson-model';

class LessonService {
  createLesson = async (data: LessonCreationAttributes) => {
    return await Lesson.create(data);
  };
}

export default new LessonService();
