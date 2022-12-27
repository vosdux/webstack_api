import sequelize from "../db";
import { DataTypes, Model, Optional, UUIDV4, UUID } from "sequelize";
import { Token } from "./token-model";

interface UserAttributes {
  id: string;
  email: string;
  password: string;
  role: string;
  isActivated: boolean;
  activateLink: string;
  changeLink: string;
}

interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    "id" | "isActivated" | "role" | "changeLink"
  > {}

export interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const User = sequelize.define<UserInstance>("user", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
  isActivated: { type: DataTypes.BOOLEAN, defaultValue: false },
  activateLink: { type: DataTypes.STRING, allowNull: false, unique: true },
  changeLink: { type: DataTypes.STRING, allowNull: true, unique: true },
});

User.hasOne(Token, { sourceKey: "id" });
Token.belongsTo(User, { targetKey: "id" });
