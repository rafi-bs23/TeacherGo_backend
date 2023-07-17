import express from 'express';

import * as authController from '../controller/authController';
import * as teacherController from '../controller/teacherController';
import * as driverController from '../controller/driverController';

const router = express.Router();

router.post('/signup', authController.protect, authController.signup);
router.post('/login', authController.protect, authController.login);
router.get('/teachers', teacherController.getAllTeacher);
router.get('/drivers', driverController.getAllDrivers);

router.patch('/update-user-info/:id', authController.updateUserInfo);
router.get('/get-user/:id', authController.getUser);

router.patch('/teacher/:id', teacherController.updateTeacherStatus);
router.patch('/driver/:id', driverController.updateDriverStatus);

router.get('/get-my-driver/:endTo', teacherController.getMyDriver);
export default router;
