import { Response } from "express";

class AppError extends Error {
  statusCode: number;
  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export { AppError };

export const handleError = (err: AppError, res: Response) => {
  const { statusCode, message } = err;

  return res.status(statusCode).json({
    status: "error",
    statusCode,
    message,
  });
};
