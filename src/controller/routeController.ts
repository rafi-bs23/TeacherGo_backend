import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/catchAsync';
import RouteModel, { IRoute } from '../model/routeModel';

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

export const getAllRoute = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const routes: IRoute[] | null = await RouteModel.find();
    res.status(200).json({
      status: 'success',
      result: routes.length,
      routes,
    });
  }
);

export const getAllDriverAndTeacher = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
