import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User, { IUser } from '../model/userModel';
import { Dirent } from 'fs';

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
    res.send('approve teacer and driver request');
  }
);
