import { Request, Response, NextFunction } from 'express';

export const globalErrorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  res.status(404).json({
    status: 'fail',
    message: err.message,
    err,
    stack: err.stack,
  });
};
