import sequelize from "../db";
import { DataTypes, Model, Optional, UUIDV4, UUID } from "sequelize";
import { User } from "./user-model";

interface UserAttributes {
  id: string;
  firstName: string;
  lastName: string;
  country: string;
  city: boolean;
  info: string;
  avatar: string
  userId?: string;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "firstName" | "lastName" | "country" | "city" | "info" | "avatar"
  > {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const UserInfo = sequelize.define<UserInstance>("user", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  firstName: { type: DataTypes.STRING },
  lastName: { type: DataTypes.STRING },
  country: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  info: { type: DataTypes.STRING },
  avatar: { type: DataTypes.BLOB },
});
