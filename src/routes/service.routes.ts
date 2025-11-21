import express from 'express';
import asyncHandler from 'express-async-handler';

import { getAllServices } from '../controllers/service.controller.js';

const router = express.Router();

router.get('/', asyncHandler(getAllServices));

export default router;
