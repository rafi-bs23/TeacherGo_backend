import express, { Request, Response, NextFunction } from 'express';
import morgan from 'morgan';

import userRouter from './routes/userRouter';
import { globalErrorHandler } from './controller/errorController';

const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use('/api/v1/users', userRouter);

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  next('Route not founded');
});

app.use(globalErrorHandler);

export default app;
