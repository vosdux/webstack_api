import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { TokenPayload } from "../services/token-service";

dotenv.config();

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    next();
  }
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Пользователь не авторизован" });
    }

    const decoded  = jwt.verify(token, process.env.JWT_ACCESS_SECRET) as TokenPayload;
    req.user = decoded.id;
    req.role = decoded.role;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Пользователь не авторизован" });
  }
};
