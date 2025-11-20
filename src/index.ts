import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import routes from '@/routes/index.routes.js';

import connectDB from './config/db.js';

dotenv.config();

const app = express();

await connectDB();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
}))
app.use(express.json());

const port = process.env.PORT ?? '3005';

app.use(routes)

app.listen(port, () => {
  console.log(`Restaurant app backend listening on port:${port}`);
});
