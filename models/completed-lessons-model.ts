import sequelize from "../db";
import { Model, Optional, UUIDV4, UUID } from "sequelize";

interface CompletedLessonsAttributes {
  id: string;
  lessonId?: string;
  userId?: string;
}

interface CompletedLessonsCreationAttributes extends Optional<CompletedLessonsAttributes, "id"> {}

export interface CompletedLessonsInstance
  extends Model<CompletedLessonsAttributes, CompletedLessonsCreationAttributes>,
  CompletedLessonsAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const CompletedLessons = sequelize.define<CompletedLessonsInstance>("completed-lessons", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
});
