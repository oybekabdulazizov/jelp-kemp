import express, { Express, NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import colors from 'colors/safe';

import AppError from './AppError';
import campgroundRouter from './routes/campgroundRoutes';
import reviewRouter from './routes/reviewRoutes';
import userRouter from './routes/userRoutes';

const error = colors.red;

connect('mongodb://127.0.0.1:27017/jelp-kemp')
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err: any) => {
    console.log(error('***** FAILED TO CONNECT TO MONGODB *****'));
    console.log(err.message);
  });

const app: Express = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'DELETE,GET,HEAD,PATCH,POST,PUT',
    optionsSuccessStatus: 200,
    allowedHeaders: ['Content-Type'],
    exposedHeaders: ['Content-Type'],
  })
);
app.use(express.urlencoded({ extended: false }));

app.use('/campgrounds', campgroundRouter);
app.use('/campgrounds/:campground_id/reviews', reviewRouter);
app.use(userRouter);

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, 'Page Not Found!'));
});

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  const { code = 500, message = 'Something went wrong!' } = err;
  let updatedCode: number = code;
  let updatedMessage: string = message;

  if (message.includes('jwt must be provided')) {
    updatedCode = 401;
    updatedMessage = 'You do not have permission to delete this campground.';
  }

  if (message.includes('Cast to ObjectId failed')) {
    updatedCode = 404;
    updatedMessage = 'Campground Not Found!';
  }

  console.log('err: ');
  console.log(err);
  res.status(updatedCode).send(updatedMessage);
});

app.listen('3001', () => {
  console.log('Listening to port 3001...');
});
