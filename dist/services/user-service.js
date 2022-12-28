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
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const uuid_1 = require("uuid");
const mail_service_1 = __importDefault(require("./mail-service"));
const token_service_1 = __importDefault(require("./token-service"));
const user_dto_1 = __importDefault(require("../dto/user-dto"));
const index_1 = __importDefault(require("../exceptions/index"));
const models_1 = require("../models");
dotenv_1.default.config();
class UserService {
    constructor() {
        this.giveTokensToUser = (user) => __awaiter(this, void 0, void 0, function* () {
            const userDto = new user_dto_1.default(user);
            const tokens = token_service_1.default.generateTokens({
                id: userDto.id,
                role: userDto.role,
                email: userDto.email,
            });
            yield token_service_1.default.saveToken(user.id, tokens.refreshToken);
            return Object.assign(Object.assign({}, tokens), { user: userDto });
        });
        this.registration = (email, password, secondPassword) => __awaiter(this, void 0, void 0, function* () {
            const candidate = yield models_1.User.findOne({ where: { email } });
            if (password !== secondPassword) {
                throw index_1.default.BadRequest("Пароли не совпадают");
            }
            if (candidate) {
                throw index_1.default.BadRequest("Такой email уже существует");
            }
            const hashPassword = yield bcrypt_1.default.hash(password, 3);
            const activateLink = (0, uuid_1.v4)();
            const user = yield models_1.User.create({
                email,
                password: hashPassword,
                activateLink,
            });
            yield mail_service_1.default.sendActivationMail(email, `${process.env.API_URL}/api/activate${activateLink}`);
            return yield this.giveTokensToUser(user);
        });
        this.login = (username, password) => __awaiter(this, void 0, void 0, function* () {
            const err = "Неверный логин или пароль";
            const user = yield models_1.User.findOne({ where: { email: username } });
            if (!user) {
                throw index_1.default.BadRequest(err);
            }
            const isPasswordEqual = yield bcrypt_1.default.compare(password, user.password);
            if (!isPasswordEqual) {
                throw index_1.default.BadRequest(err);
            }
            return yield this.giveTokensToUser(user);
        });
        this.activate = (activateLink) => __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ where: { activateLink } });
            if (!user) {
                throw index_1.default.BadRequest("Некоректная ссылка активации");
            }
            user.isActivated = true;
            yield user.save();
        });
        this.logout = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            return yield token_service_1.default.removeToken(refreshToken);
        });
        this.refresh = (refreshToken) => __awaiter(this, void 0, void 0, function* () {
            if (!refreshToken) {
                throw index_1.default.BadRequest("Нет токена");
            }
            const userData = yield token_service_1.default.validateRefreshToken(refreshToken);
            const tokenFromDb = yield token_service_1.default.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                throw index_1.default.BadRequest("Не авторизован");
            }
            const user = (yield models_1.User.findOne({
                // @ts-ignore
                where: { id: userData.id },
            }));
            return this.giveTokensToUser(user);
        });
        this.changePasswordRequest = (email) => __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ where: { email } });
            if (!user) {
                throw index_1.default.BadRequest("Неверный email");
            }
            const changeLink = (0, uuid_1.v4)();
            user.changeLink = changeLink;
            yield user.save();
            yield mail_service_1.default.sendChangePasswordMail(email, `${process.env.API_URL}/api/activate${changeLink}`);
        });
        this.changePassword = (password, secondPassword, changeLink) => __awaiter(this, void 0, void 0, function* () {
            const user = yield models_1.User.findOne({ where: { changeLink } });
            if (!user) {
                throw index_1.default.BadRequest("Неверная ссылка для смены пароля");
            }
            if (password !== secondPassword) {
                throw index_1.default.BadRequest("Пароли не совпадают");
            }
            user.password = yield bcrypt_1.default.hash(password, 3);
            user.save();
        });
        this.check = (accessToken, refreshToken) => __awaiter(this, void 0, void 0, function* () {
            if (!accessToken) {
                throw index_1.default.UnauthorizedError();
            }
        });
    }
}
exports.default = new UserService();
