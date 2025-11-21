import express from 'express';
import asyncHandler from 'express-async-handler';

import { getAllPackages } from '../controllers/package.controller.js';

const router = express.Router();

router.get('/', asyncHandler(getAllPackages));

export default router;
