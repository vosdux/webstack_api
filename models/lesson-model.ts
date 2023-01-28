import sequelize from "../db";
import { DataTypes, Model, Optional, UUIDV4, UUID } from "sequelize";
import { User } from "./user-model";
import { CompletedLessons } from "./completed-lessons-model";

export interface LessonAttributes {
  id: string;
  name: string;
  video: string;
  text: string;
  homework: string;
  courseId?: string;
}

export interface LessonCreationAttributes extends Optional<LessonAttributes, "id"> {}

export interface LessonInstance
  extends Model<LessonAttributes, LessonCreationAttributes>,
  LessonAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Lesson = sequelize.define<LessonInstance>("lesson", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: { type: DataTypes.STRING },
  video: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
  homework: { type: DataTypes.STRING },
});

Lesson.belongsToMany(User, { through: { model: CompletedLessons } });
User.belongsToMany(Lesson, { through: { model: CompletedLessons } });
