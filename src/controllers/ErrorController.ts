import { Request, Response } from "express";
import AppError from "../libs/AppError";
import cors from "../services/CorsService";

export default (
  error: AppError,
  request: Request,
  response: Response,
  next: Function
) => {
  error.statusCode = error.statusCode||500;
  error.status = error.status ;
  response.status(error.statusCode).json({
      status:error.status,
      error,
      message:error.message,
      stack:error.stack
  })
};
