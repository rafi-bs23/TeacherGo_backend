import express from 'express';

import * as authController from '../controller/authController';
import * as teacherController from '../controller/teacherController';

const router = express.Router();

router.post('/signup', authController.protect, authController.signup);
router.post('/login', authController.protect, authController.login);
router.get('/teachers', teacherController.getAllTeacher);
export default router;
