import { Lesson, LessonAttributes, LessonCreationAttributes } from '../models/lesson-model';
import ApiError from '../exceptions/index';
import { Course } from '../models';

class LessonService {
  getLessons = async (offset = "0", limit = '1000') => {
    const lessons = await Lesson.findAndCountAll({
      offset: +offset,
      limit: +limit,
    });

    const formatedLessons = await Promise.all(lessons.rows.map(async (item) => {
      const course = await Course.findOne({ where: { id: item.courseId  } });

      return {
        id: item.id,
        homework: item.homework,
        name: item.name,
        text: item.text, 
        video: item.video,
        course: {
          courseId: item.courseId,
          courseName: course?.name,
        }
      }
    }));

    return {
      rows: formatedLessons,
      count: lessons.count,
    }
  };

  createLesson = async (data: LessonCreationAttributes) => {
    return await Lesson.create(data);
  };

  updateLesson = async (data: LessonAttributes) => {
    const lessons = await Lesson.findOne({ where: { id: data.id } });

    if (!lessons) {
      throw ApiError.BadRequest('Нет такого урока!');
    }

    lessons.name = data.name;
    lessons.video = data.video;
    lessons.text = data.text;
    lessons.homework = data.homework;
    lessons.courseId = data.courseId;
    lessons.save();

    return lessons;
  }

  deleteLesson = async (id: string) => {
    return await Lesson.destroy({ where: { id } });
  }
}

export default new LessonService();
