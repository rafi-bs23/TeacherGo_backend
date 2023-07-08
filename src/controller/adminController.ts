import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User, { IUser } from '../model/userModel';
import { AppError } from '../utils/appError';

export const allRequestedTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const teachers: IUser[] = await User.find({
      isAdminApproved: false,
      role: 'teacher',
    });
    res.status(200).json({
      status: 'success',
      result: teachers.length,
      teachers,
    });
  }
);

export const allRequestedDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const drivers: IUser[] = await User.find({
      isAdminApproved: false,
      role: 'driver',
    });
    res.status(200).json({
      status: 'success',
      result: drivers.length,
      drivers,
    });
  }
);

export const approveDriverAndTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser | null = await User.findOne({ _id: req.params.id });
    if (!user) return next(new AppError('User Not Founded', 404));

    user.isAdminApproved = true;
    await user.save();

    res.status(200).json({
      status: 'success',
      message: 'User accepted',
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user: IUser | null = await User.findByIdAndRemove(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'user deleteed successfully.',
      user,
    });
  }
);
