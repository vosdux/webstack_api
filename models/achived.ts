import sequelize from "../db";
import { Model, Optional, UUIDV4, UUID } from "sequelize";

interface AchivedAttributes {
  id: string;
  courseId?: string;
  achivmentId?: string;
}

interface AchivedCreationAttributes
  extends Optional<AchivedAttributes, "id"> {}

export interface AchivedInstance
  extends Model<AchivedAttributes, AchivedCreationAttributes>,
  AchivedAttributes {
  createdAt?: Date;
  updatedAt?: Date;
}

export const Achived = sequelize.define<AchivedInstance>("achived", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: UUID,
    defaultValue: UUIDV4,
  },
});
