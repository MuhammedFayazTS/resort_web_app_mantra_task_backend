import express from 'express';

import { addNewBooking, getAllBookings } from '@/controllers/booking.controller.js';

const router = express.Router();

router.get('/', getAllBookings);
router.post('/', addNewBooking);

export default router;