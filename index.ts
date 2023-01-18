import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import sequelize from "./db";
import router from "./router";
import errorMiddleware from "./middleware/error-middleware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(cors({ credentials: true, origin: true, allowedHeaders: ['authorization', 'content-type', 'Cookie'] }));
app.use(express.json());
app.use(cookieParser());
app.use("/api", router);
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
