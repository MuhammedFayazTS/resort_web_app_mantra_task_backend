import express from 'express';
import asyncHandler from 'express-async-handler';

import { addNewBooking, getAllBookings } from '@/controllers/booking.controller.js';

const router = express.Router();

router.get('/', asyncHandler(getAllBookings));
router.post('/', asyncHandler(addNewBooking));

export default router;