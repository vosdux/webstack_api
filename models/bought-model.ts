import sequelize from "../db";
import { Model, Optional, UUIDV4, UUID } from "sequelize";

interface BoughtAttributes {
  id: string;
  courseId?: string;
  userId?: string;
}

interface BoughtCreationAttributes extends Optional<BoughtAttributes, "id"> {}

export interface BoughtInstance
  extends Model<BoughtAttributes, BoughtCreationAttributes>,
  BoughtAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Bought = sequelize.define<BoughtInstance>("bought", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
});
