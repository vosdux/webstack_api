"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('webstack', 'postgres', '123', {
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: 5433,
});
exports.default = sequelize;
