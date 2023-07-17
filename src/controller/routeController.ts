import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import RouteModel, { IRoute } from '../model/routeModel';
import { AppError } from '../utils/appError';
import User from '../model/userModel';

export const createRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { name, endTo, driver } = req.body;

    const userDriver = await User.findById(driver);
    if (!userDriver) {
      return next(new AppError('driver not founded', 404));
    }
    userDriver.routeId = `${name}-${endTo}`;
    const driverName = userDriver.name;
    await userDriver.save();
    const route: IRoute = new RouteModel({
      name,
      endTo,
      driver,
      driverName,
    });

    await route.save();
    res.status(201).json({
      status: 'success1',
      route,
    });
  }
);

export const updateRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { endTo, driver } = req.body;

    const userDriver = await User.findById(driver);
    if (!userDriver) {
      return next(new AppError('driver not founded', 404));
    }
    const driverName = userDriver.name;

    const route: IRoute | null = await RouteModel.findOneAndUpdate(
      { _id: req.params.id },
      { endTo, driver, driverName },
      { new: true } // Option to return the updated document
    );

    if (!route) {
      return next(new AppError('invalid route id', 404));
    }

    res.status(200).json({
      status: 'success2',
      route,
    });
  }
);

export const getAllRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const routes: IRoute[] | null = await RouteModel.find();
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
