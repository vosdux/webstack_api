import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./db";
import errorMiddleware from "./middleware/error-middleware";
import authMiddleware from "./middleware/auth-middleware";
import { userRouter, userInfoRouter, coursesRouter, lessonRouter } from "./router";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use('/images', express.static('images'));
app.use(cors({ credentials: true, origin: true }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", userRouter);
app.use("/api", authMiddleware, userInfoRouter);
app.use("/api", authMiddleware, coursesRouter);
app.use("/api", authMiddleware, lessonRouter);
app.use(errorMiddleware);

app.get("/health", (req, res) => {
  res.json({ active: true });
});

const start = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

start();
