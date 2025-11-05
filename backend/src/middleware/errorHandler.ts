import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { statusCode = 500, message, stack } = error;

  logger.error(`Error ${statusCode}: ${message}`, {
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get("user-agent"),
    stack: process.env.NODE_ENV === "development" ? stack : undefined,
  });

  const response = {
    success: false,
    error: {
      message: statusCode === 500 ? "Internal Server Error" : message,
      ...(process.env.NODE_ENV === "development" && { stack }),
    },
  };

  res.status(statusCode).json(response);
};
