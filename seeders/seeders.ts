import mongoose from 'mongoose';

import connectDB from '../src/config/db.js';
import { packageSeed } from './package.seeder.js';
import { serviceSeed } from './service.seeder.js';

async function runSeed() {
  try {
    await connectDB();

    await packageSeed();

    await serviceSeed();

    console.log('All seeders completed successfully');
  } catch (err) {
    console.error('Seeder failed:', err);
  } finally {
    await mongoose.disconnect();
    process.exit(0);
  }
}

await runSeed();
