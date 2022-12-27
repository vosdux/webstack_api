"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = __importDefault(require("../exceptions"));
exports.default = (err, req, res, next) => {
    console.log(err, 'err');
    if (err instanceof exceptions_1.default) {
        return res.status(err.status).json({ message: err.message, erros: err.errors });
    }
    return res.status(500).json({ message: 'Непредвиденная ошибка' });
};
