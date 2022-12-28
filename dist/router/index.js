"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controllers/user-controller"));
const router = (0, express_1.Router)();
router.post('/registration', user_controller_1.default.registration);
router.post('/login', user_controller_1.default.login);
router.post('/logout', user_controller_1.default.logout);
router.post('/change-password-request', user_controller_1.default.changePasswordRequest);
router.post('/change-password', user_controller_1.default.changePassword);
router.get('/activate/:link', user_controller_1.default.activate);
router.get('/refresh', user_controller_1.default.refresh);
exports.default = router;
