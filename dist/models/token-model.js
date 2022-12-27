"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Token = void 0;
const db_1 = __importDefault(require("../db"));
const sequelize_1 = require("sequelize");
;
exports.Token = db_1.default.define("token", {
    id: { type: sequelize_1.DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    refreshToken: { type: sequelize_1.DataTypes.STRING, unique: true },
});
