import sequelize from "../db";
import { DataTypes, Model, Optional, UUIDV4, UUID } from "sequelize";

interface LessonAttributes {
  id: string;
  title: string;
  video: string;
  text: string;
  homework: string;
  courseId?: string;
}

interface LessonCreationAttributes extends Optional<LessonAttributes, "id"> {}

export interface UserInstance
  extends Model<LessonAttributes, LessonCreationAttributes>,
  LessonAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Lesson = sequelize.define<UserInstance>("lesson", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  title: { type: DataTypes.STRING },
  video: { type: DataTypes.STRING },
  text: { type: DataTypes.STRING },
  homework: { type: DataTypes.STRING },
});
