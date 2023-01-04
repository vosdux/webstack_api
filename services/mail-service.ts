import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASSWORD } = process.env;

class MailService {
  transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: +SMTP_PORT,
      secure: true,
      tls: { rejectUnauthorized: false },
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASSWORD,
      },
    });
  }

  sendActivationMail = async (to: string, link: string) => {
    await this.transporter.sendMail({
      from: SMTP_USER,
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
  };

  sendChangePasswordMail = async (to: string, link: string) => {
    await this.transporter.sendMail({
      from: process.env.SMTP_USER,
      to,
      subject: "Актицвация аккаунта",
      text: "",
      html: `
        <div>
          <h1>Для смены пароля перейдите по ссылке</h1>
          <a href="${link}">${link}</a>
        </div>
      `,
    });
  };
}

export default new MailService();
