import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import RouteModel, { IRoute } from '../model/routeModel';
import { AppError } from '../utils/appError';

export const createRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, endTo, driver } = req.body;
    const route: IRoute = new RouteModel({
      name,
      endTo,
      driver,
    });
    await route.save();
    res.status(201).json({
      status: 'success',
      route,
    });
  }
);

export const updateRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { endTo, driver } = req.body;
    const route: IRoute | null = await RouteModel.findOneAndUpdate(
      { _id: req.params.id },
      { endTo, driver },
      { new: true } // Option to return the updated document
    );

    if (!route) {
      return next(new AppError('invalid route id', 404));
    }

    res.status(200).json({
      status: 'success',
      route,
    });
  }
);

export const getAllRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const routes: IRoute[] | null = await RouteModel.find().populate('driver');
    res.status(200).json({
      status: 'success',
      result: routes ? routes.length : 0,
      routes: routes || [],
    });
  }
);

export const getAllDriverAndTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
