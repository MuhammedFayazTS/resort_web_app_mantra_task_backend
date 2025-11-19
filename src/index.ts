import dotenv from 'dotenv';
import express from 'express';

import connectDB from './config/db.js';

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

const port = process.env.PORT ?? '3005';

app.get('/', (req, res) => {
  res.send('API is working!');
});

app.listen(port, () => {
  console.log(`Restaurant app backend listening on port:${port}`);
});
