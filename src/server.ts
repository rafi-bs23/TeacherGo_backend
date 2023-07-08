import dotenv from 'dotenv';
dotenv.config({ path: './.env' });
import mongoose from 'mongoose';

import app from './app';

const port = process.env.PORT || 8000;

const DB = process.env.MONGO_DB_URL || '';

mongoose
  .connect(DB)
  .then(() => console.log('Database connected successfully...'));

app.listen(port, () => console.log(`Listening on port ${port}...`));
