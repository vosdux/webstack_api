"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const user_service_1 = __importDefault(require("../../services/user-service"));
dotenv_1.default.config();
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;
const REFRESH_COOKIES_OPTIONS = { maxAge: THIRTY_DAYS, httpOnly: true };
class UserController {
    constructor() {
        this.registration = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password, secondPassword } = req.body;
                const userData = yield user_service_1.default.registration(email, password, secondPassword);
                res.cookie("refreshToken", userData.refreshToken, REFRESH_COOKIES_OPTIONS);
                res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const userData = yield user_service_1.default.login(username, password);
                res.cookie("refreshToken", userData.refreshToken, REFRESH_COOKIES_OPTIONS);
                res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
        this.activate = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { link } = req.params;
                yield user_service_1.default.activate(link);
                return res.redirect(process.env.CLIENT_URL);
            }
            catch (error) {
                next(error);
            }
        });
        this.logout = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const token = yield user_service_1.default.logout(refreshToken);
                res.clearCookie("refreshToken");
                return res.json(token);
            }
            catch (error) {
                next(error);
            }
        });
        this.refresh = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { refreshToken } = req.cookies;
                const userData = yield user_service_1.default.refresh(refreshToken);
                res.cookie("refreshToken", userData.refreshToken, REFRESH_COOKIES_OPTIONS);
                return res.json(userData);
            }
            catch (error) {
                next(error);
            }
        });
        this.changePasswordRequest = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { email } = req.body;
                yield user_service_1.default.changePasswordRequest(email);
                res.status(200);
            }
            catch (error) {
                next(error);
            }
        });
        this.changePassword = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { password, secondPassword, chnageLink } = req.body;
                yield user_service_1.default.changePassword(password, secondPassword, chnageLink);
                res.status(200);
            }
            catch (error) {
                next(error);
            }
        });
        this.check = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { token } = req.body;
            }
            catch (error) { }
        });
    }
}
exports.default = new UserController();
