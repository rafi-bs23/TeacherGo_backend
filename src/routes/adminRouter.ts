import express from 'express';

import * as authController from '../controller/authController';
import * as adminController from '../controller/adminController';

const router = express.Router();



router.get(
  '/teachers-request',
  authController.protect,
  adminController.allRequestedTeacher
);
router.get(
  '/drivers-request',
  authController.protect,
  adminController.allRequestedDriver
);

router.patch(
  '/approve',
  authController.protect,
  adminController.approveDriverAndTeacher
);

export default router;
