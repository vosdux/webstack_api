import sequelize from "../db";
import { DataTypes, Model, Optional, UUIDV4, UUID } from "sequelize";
import { User } from "./user-model";
import { Achived } from "./achived-model";

interface AchivmentAttributes {
  id: string;
  name: string;
  image: string;
  description: string;
  steps: number;
}

interface AchivmentCreationAttributes extends Optional<AchivmentAttributes, "id"> {}

export interface UserInstance
  extends Model<AchivmentAttributes, AchivmentCreationAttributes>,
  AchivmentAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Achivment = sequelize.define<UserInstance>("achivment", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  name: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  image: { type: DataTypes.STRING },
  steps: { type: DataTypes.INTEGER }
});

Achivment.belongsToMany(User, { through: { model: Achived } });
User.belongsToMany(Achivment, { through: { model: Achived } });