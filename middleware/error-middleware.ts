import { Response, Request } from "express";
import ApiError from "../exceptions";

export default (err: Error, req: Request, res: Response) => {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message, erros: err.errors })
  }

  return res.status(500).json({ message: 'Непредвиденная ошибка' })
}