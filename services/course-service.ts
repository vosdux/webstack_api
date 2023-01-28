import ApiError from "../exceptions/index";
import { Bought, Course, Lesson, CompletedLessons } from "../models";
import {
  CourseAttributes,
  CourseCreationAttributes,
} from "../models/course-model";

class CourseService {
  getCourses = async (userId: string, offset = "0", limit = "1000") => {
    const courses = await Course.findAndCountAll({
      offset: +offset,
      limit: +limit,
    });

    const formatedCourses = await Promise.all(
      courses.rows.map(async (item) => {
        const lessons = await Lesson.findAll({ where: { courseId: item.id } });
        const purchased = await Bought.findOne({
          where: { userId: userId, courseId: item.id },
        });

        const oneLessonPercent = 100 / 7;
        const lessonsId = lessons.map((item) => item.id);
        const completedLessons = await CompletedLessons.findAll({
          where: { id: lessonsId, userId },
        });

        const completedLength = completedLessons.length || 0;

        return {
          name: item.name,
          lessons: lessons.length,
          percent: completedLength * oneLessonPercent,
          purchased: !!purchased,
        };
      })
    );

    return {
      data: formatedCourses,
      total: courses.count,
    };
  };

  createCourse = async (
    data: CourseCreationAttributes,
    file?: Express.Multer.File
  ) => {
    let fileUrl = "";
    if (file) {
      if (file.size > 907390) {
        throw ApiError.BadRequest("Слишком большой размер");
      }

      fileUrl = `${process.env.API_URL}/images/${file.filename}`;
    }

    return await Course.create({ ...data, image: fileUrl });
  };

  updateCourse = async (data: CourseAttributes, file?: Express.Multer.File) => {
    let fileUrl = "";
    if (file) {
      if (file.size > 907390) {
        throw ApiError.BadRequest("Слишком большой размер");
      }

      fileUrl = `${process.env.API_URL}/images/${file.filename}`;
    }

    const course = await Course.findOne({ where: { id: data.id } });

    if (!course) {
      throw ApiError.BadRequest("Нет такого курса");
    }

    if (!fileUrl) {
      fileUrl = course?.image;
    }

    course.name = data.name;
    course.description = data.description;
    course.price = data.price;
    course.image = fileUrl;
    course.save();

    return course;
  };

  getCourseInfo = async (courseId: string) => {
    const course = await Course.findOne({ where: { id: courseId } });

    if (!course) {
      throw ApiError.BadRequest("Такого курса не существует");
    }

    const lessons = await Lesson.findAll({ where: { courseId } });
    const lessonsWithStatus = await Promise.all(lessons.map(async (item) => {
      const completed = await CompletedLessons.findOne({
        where: { lessonId: item.id },
      });

      return {
        name: item.name,
        completed: !!completed,
      };
    }));

    return {
      name: course.name,
      description: course.description,
      lessons: lessonsWithStatus,
      rating: course.rating,
      price: course.price,
      completed: false,
    };
  };
}

export default new CourseService();
