import sequelize from "../db";
import { DataTypes, Model, Optional, UUIDV4, UUID } from "sequelize";
import { Lesson } from "./lesson-model";
import { User } from "./user-model";
import { Bought } from "./bought-model";

interface CourseAttributes {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
}

interface CourseCreationAttributes extends Optional<CourseAttributes, "id"> {}

export interface UserInstance
  extends Model<CourseAttributes, CourseCreationAttributes>,
    CourseAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Course = sequelize.define<UserInstance>("course", {
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
});

Course.hasOne(Lesson, { sourceKey: "id" });
Lesson.belongsTo(Course, { targetKey: "id" });

Course.hasMany(User, { sourceKey: "id" });
User.belongsToMany(Course, { through: { model: Bought } });