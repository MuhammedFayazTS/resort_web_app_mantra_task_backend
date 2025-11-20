import express from 'express';

import bookingRoutes from './booking.routes.js';
import packageRoutes from './package.routes.js';

const router = express.Router();
const API_PREFIX = '/api';

router.get('/', (req, res) => {
    res.send('API is working!');
});

router.get(API_PREFIX, (req, res) => {
    res.send('API entry endpoint is working!');
});

router.use(`${API_PREFIX}/bookings`, bookingRoutes);
router.use(`${API_PREFIX}/packages`, packageRoutes);

export default router;