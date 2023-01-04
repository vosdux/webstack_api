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

app.use((req, res, next) => {
  //allow access to current url. work for https as well
  res.setHeader("Access-Control-Allow-Origin", req.header("Origin") as string);
  res.removeHeader("x-powered-by");
  //allow access to current method
  res.setHeader("Access-Control-Allow-Methods", req.method);
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});
app.use(express.json());
// app.use(cors());
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
