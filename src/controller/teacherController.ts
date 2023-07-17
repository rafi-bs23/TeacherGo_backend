import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import User, { IUser } from '../model/userModel';
import RouteModel from '../model/routeModel';

export const getAllTeacher = catchAsync(
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

export const updateTeacherStatus = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { isTeacherWillGo } = req.body;
    console.log(isTeacherWillGo);
    const statusUpdate = await User.findOneAndUpdate(
      { _id: req.params.id },
      { isTeacherWillGo },
      { new: true }
    );
    res.status(200).json({
      status: 'success',
      statusUpdate,
    });
  }
);

export const getMyDriver = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const route = await RouteModel.findOne({ endTo: req.params.endTo });
    const driver = await User.findById(route?.driver);
    res.status(200).json({
      status: 'success',
      driver,
    });
  }
);
