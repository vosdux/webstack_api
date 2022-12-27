import sequelize from "../db";
import { DataTypes, Model, Optional } from "sequelize";

interface TokenAttributes {
  id: string;
  refreshToken: string;
  userId?: string;
}

interface TokenCreationAttributes extends Optional<TokenAttributes, "id"> {};

export interface TokenInstance
  extends Model<TokenAttributes, TokenCreationAttributes>,
    TokenAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Token = sequelize.define<TokenInstance>("token", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  refreshToken: { type: DataTypes.STRING, unique: true },
});
