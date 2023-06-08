import { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/appError';

const operationalError = (err: AppError, res: Response) => {
  res.status(err.statusCode).json({
    status: 'fail',
    message: err.message,
    err,
    stack: err.stack,
  });
};

const nonOperationalError = (err: Error, res: Response) => {
  res.status(500).json({
    status: 'Error',
    message: err.message,
    err,
    stack: err.stack,
  });
};

export const globalErrorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) operationalError(err, res);
  else nonOperationalError(err, res);
};
