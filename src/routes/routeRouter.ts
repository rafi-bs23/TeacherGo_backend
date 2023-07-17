import express from 'express';

import * as routeController from '../controller/routeController';
const router = express.Router();

router.post('/', routeController.createRoute);
router.get('/', routeController.getAllRoute);
router.patch('/:id', routeController.updateRoute);
router.get('/drivers-and-teachers', routeController.getAllDriverAndTeacher);

router.get('/all-teachers/:endTo', routeController.getAllTeacherOnRoute);

export default router;
