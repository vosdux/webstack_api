"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
const token_model_1 = require("./token-model");
exports.User = db_1.default.define("user", {
    id: {
        allowNull: false,
        primaryKey: true,
        type: sequelize_1.UUID,
        defaultValue: sequelize_1.UUIDV4,
    },
    email: { type: sequelize_1.DataTypes.STRING, unique: true, allowNull: false },
    password: { type: sequelize_1.DataTypes.STRING, allowNull: false },
    role: { type: sequelize_1.DataTypes.STRING, defaultValue: "USER" },
    isActivated: { type: sequelize_1.DataTypes.BOOLEAN, defaultValue: false },
    activateLink: { type: sequelize_1.DataTypes.STRING, allowNull: false, unique: true },
    changeLink: { type: sequelize_1.DataTypes.STRING, allowNull: true },
});
exports.User.hasOne(token_model_1.Token, { sourceKey: "id" });
token_model_1.Token.belongsTo(exports.User, { targetKey: "id" });
