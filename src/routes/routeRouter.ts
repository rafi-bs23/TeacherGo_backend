import express from 'express';

import * as routeController from '../controller/routeController';
const router = express.Router();

router.post('/', routeController.createRoute);
router.patch('/:id', routeController.updateRoute);
router.get('/drivers-and-teachers', routeController.getAllDriverAndTeacher);

export default router;
