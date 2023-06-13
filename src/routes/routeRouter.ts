import express from 'express';

import * as routeController from '../controller/routeController';

const router = express.Router();

router.post('/', routeController.createRoute);

export default router;
