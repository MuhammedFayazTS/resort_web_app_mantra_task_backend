import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db.js';
import { errorHandler } from './middlewares/errorHandler.js';
import routes from './routes/index.routes.js';

dotenv.config();

const app = express();

await connectDB();

app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }),
);
app.use(express.json());

const port = process.env.PORT ?? '3005';

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Resort app backend listening on port:${port}`);
});
