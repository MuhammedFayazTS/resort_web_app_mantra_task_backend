import express from 'express';
import asyncHandler from 'express-async-handler';

import { addCheckIn, addCheckOut, addNewBooking, cancelBooking, getAllBookings } from '@/controllers/booking.controller.js';

const router = express.Router();

router.get('/', asyncHandler(getAllBookings));
router.post('/', asyncHandler(addNewBooking));
router.put('/check-in/:bookingId', asyncHandler(addCheckIn));
router.put('/check-out/:bookingId', asyncHandler(addCheckOut));
router.put('/cancel/:bookingId', asyncHandler(cancelBooking));

export default router;