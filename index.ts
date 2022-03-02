/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable no-console */
import express from 'express';
import fs from 'fs';
import mongoose from 'mongoose';
import 'dotenv/config';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/todos';
import getTime from './additional/getTime';

const app = express();

app.use(cors({
  origin: '*',
}));

app.use(bodyParser.json());

app.use((req, res, next) => {
  const data = `${getTime()} ${req.method} ${req.url}`;
  fs.appendFile('server-logs.log', `${data}\n`, () => {});
  next();
});

app.use('/todos', router);

app.get('*', (req, res) => {
  res.status(404);
  res.send('Page not found!');
});

mongoose.connect(
  process.env.DB_CONNECTION!,
  (): void => {
    console.log('Connected to DB');
    const data = `${getTime()} Connected to DB`;
    fs.appendFile('server-logs.log', `${data}\n`, () => {});
  },
);

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.listen(3000, () => console.log('Server is listening on port 3000!'));
