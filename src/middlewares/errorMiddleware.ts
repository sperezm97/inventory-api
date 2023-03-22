import { type Request, type Response } from 'express';
import { type AppError } from '../helpers/HttpException';

export const errorMiddleware = (error: AppError, req: Request, res: Response): void => {
  res.status(error.httpCode).json({
    message: error.message,
  });
};

export const errorLoggerMiddleware = (error: AppError, req: Request, res: Response): void => {
  res.status(error.httpCode).json({
    message: error.message,
  });
};

export const errorServiceMiddleware = (error: AppError, req: Request, res: Response): void => {
  res.status(error.httpCode).send({
    message: error.message,
  });
};
