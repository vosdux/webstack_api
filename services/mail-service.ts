import nodemailer from "nodemailer";

class MailService {
  transporter: nodemailer.Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      //@ts-ignore
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  sendActivationMail = async (to: string, link: string) => {
    await this.transporter.sendMail({
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
  };

  sendChangePasswordMail = async (to: string, link: string) => {
    await this.transporter.sendMail({
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
    })
  }
}

export default new MailService();
