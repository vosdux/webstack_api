import sequelize from "../db";
import { DataTypes, Model, Optional, UUIDV4, UUID } from "sequelize";
import { Lesson } from "./lesson-model";
import { User } from "./user-model";
import { Bought } from "./bought-model";
import { CompletedCourses } from "./completed-courses-model";

export interface CourseAttributes {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  completedCount: number;
}

export interface CourseCreationAttributes
  extends Optional<CourseAttributes, "id" | "rating" | "completedCount"> {}

export interface CourseInstance
  extends Model<CourseAttributes, CourseCreationAttributes>,
    CourseAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Course = sequelize.define<CourseInstance>("course", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  price: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  rating: { type: DataTypes.INTEGER, defaultValue: 0 },
  completedCount: { type: DataTypes.INTEGER, defaultValue: 0 },
});

Course.hasOne(Lesson, { sourceKey: "id" });
Lesson.belongsTo(Course, { targetKey: "id" });

Course.hasMany(User, { sourceKey: "id" });
User.belongsToMany(Course, { through: { model: Bought } });

Course.hasMany(User, { sourceKey: "id" });
User.belongsToMany(Course, { through: { model: CompletedCourses } });
