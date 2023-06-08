import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import userRouter from './routes/userRouter';
import { globalErrorHandler } from './controller/errorController';
import { AppError } from './utils/appError';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError('Route not founed!', 404));
});

app.use(globalErrorHandler);

export default app;
