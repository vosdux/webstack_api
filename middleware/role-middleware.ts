import { NextFunction, Response, Request } from "express";

export default (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "OPTIONS") {
    next();
  }

  if (req.role !== 'ADMIN') {
    return res.status(403).json({ message: "Недостаточно прав" });
  }
  next();
};
