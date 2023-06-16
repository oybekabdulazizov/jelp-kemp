import express, { Express, NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import colors from 'colors/safe';
import session from 'express-session';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

import AppError from './AppError';
import campgroundRouter from './routes/campgroundRoutes';
import reviewRouter from './routes/reviewRoutes';
import User from './models/user';
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
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  session({
    secret: 'justasecretfornow',
    resave: false,
    saveUninitialized: true,
    cookie: {
      httpOnly: true,
    },
  })
);
// express session must come before passport sesion.
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

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

  if (message.includes('Cast to ObjectId failed')) {
    updatedCode = 404;
    updatedMessage = 'Campground Not Found!';
  }
  res.status(updatedCode).send(updatedMessage);
});

app.listen('3001', () => {
  console.log('Listening to port 3001...');
});
