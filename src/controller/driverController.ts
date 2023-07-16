import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User, { IUser } from '../model/userModel';

export const getAllDrivers = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const teachers: IUser[] = await User.find({
      role: 'teacher',
      isAdminApproved: true,
    });

    res.status(200).json({
      status: 'success',
      result: teachers.length,
      teachers,
    });
  }
);

export const updateDriverStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { isDriverOk } = req.body;
    const statusUpdate = User.findOneAndUpdate(
      { _id: req.params.id },
      { isDriverOk },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      statusUpdate,
    });
  }
);
