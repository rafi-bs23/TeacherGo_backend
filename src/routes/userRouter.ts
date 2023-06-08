import express from 'express';

import * as authController from '../controller/authController';

const router = express.Router();

router.post('/signup', authController.protect, authController.signup);
router.post('/login', authController.protect, authController.login);

export default router;
