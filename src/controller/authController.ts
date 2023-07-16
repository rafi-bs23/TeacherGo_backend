import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User, { IUser } from '../model/userModel';
import { AppError } from '../utils/appError';
import { signToken } from '../utils/signToken';

export const signup = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, email, id, phone, routeId, password, role } = req.body;
    const user: IUser = new User({
      id,
      name,
      email,
      password,
      phone,
      role,
      routeId,
    });
    await user.save();
    const token: string = signToken(user.email);
    res.status(201).json({
      status: 'success',
      token,
      user,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user: IUser | null = await User.findOne({ email });

    if (!user || !(await user.comparePassword(password, user.password)))
      return next(new AppError('User not Founded', 404));

    const token: string = signToken(user.email);
    res.status(200).json({
      status: 'success',
      token,
      user,
    });
  }
);

export const protect = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    next();
  }
);

export const updateUserInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, phone } = req.body;
    const user = User.findOneAndUpdate(
      { _id: req.params.id },
      { name, phone },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      user,
    });
  }
);
