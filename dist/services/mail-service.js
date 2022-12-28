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
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;
console.log(SMTP_HOST, 'SMTP_HOST');
console.log(SMTP_PASSWORD, 'SMTP_PASSWORD');
class MailService {
    constructor() {
        this.sendActivationMail = (to, link) => __awaiter(this, void 0, void 0, function* () {
            yield this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: "Актицвация аккаунта",
                text: "",
                html: `
        <div>
          <h1>Для активации перейдите поссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
            });
        });
        this.sendChangePasswordMail = (to, link) => __awaiter(this, void 0, void 0, function* () {
            yield this.transporter.sendMail({
                from: process.env.SMTP_USER,
                to,
                subject: 'Актицвация аккаунта',
                text: '',
                html: `
        <div>
          <h1>Для смены пароля перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `
            });
        });
        this.transporter = nodemailer_1.default.createTransport({
            //@ts-ignore
            host: SMTP_HOST,
            port: SMTP_PORT,
            secure: true,
            auth: {
                user: SMTP_USER,
                pass: SMTP_PASSWORD,
            },
        });
    }
}
exports.default = new MailService();
