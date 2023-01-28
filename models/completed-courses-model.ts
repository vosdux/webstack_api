import sequelize from "../db";
import { Model, Optional, UUIDV4, UUID } from "sequelize";

interface CompletedCoursesAttributes {
  id: string;
  lessonId?: string;
  userId?: string;
}

interface CompletedCoursesCreationAttributes extends Optional<CompletedCoursesAttributes, "id"> {}

export interface CompletedCoursesInstance
  extends Model<CompletedCoursesAttributes, CompletedCoursesCreationAttributes>,
  CompletedCoursesAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const CompletedCourses = sequelize.define<CompletedCoursesInstance>("completed-courses", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
});
