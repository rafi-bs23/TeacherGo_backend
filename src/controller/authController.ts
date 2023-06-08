import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User, { IUser } from '../model/userModel';

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { id, name, email, password, phone, role } = req.body;
    const user: IUser = new User({
      id,
      name,
      email,
      password,
      phone,
      role,
    });
    await user.save();
    res.send('signup user');
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('login');
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);
