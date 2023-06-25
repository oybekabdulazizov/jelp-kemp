import express, { Express, NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import colors from 'colors/safe';
// import session from 'express-session';
// import passport from 'passport';
// import { Strategy } from 'passport-local';
// import bcrypt from 'bcrypt';

// import User from './models/user';
import AppError from './AppError';
import campgroundRouter from './routes/campgroundRoutes';
import reviewRouter from './routes/reviewRoutes';
import userRouter from './routes/userRoutes';
import cookieParser from 'cookie-parser';

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
// app.use(async (req: Request, res: Response, next: NextFunction) => {
//   res.header('Access-Control-Allow-Origin', 'http://localhost:5173/');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.header('Access-Control-Allow-Methods', 'DELETE,GET,HEAD,PATCH,POST,PUT');
//   res.header(
//     'Access-Control-Allow-Headers',
//     'Origin, X-Requested-With, Content-Type, Accept'
//   );
//   next();
// });
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: 'DELETE,GET,HEAD,PATCH,POST,PUT',
    optionsSuccessStatus: 200,
  })
);
app.use(express.urlencoded({ extended: false }));

// app.use(
//   session({
//     secret: 'justasecretfornow',
//     resave: false,
//     saveUninitialized: true,
//     cookie: {
//       httpOnly: true,
//     },
//   })
// );
// express session must come before passport sesion.
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(
//   // new LocalStrategy(User.authenticate())
//   new Strategy(async (username, password, done) => {
//     const existingUser = await User.findOne({ username });
//     if (!existingUser)
//       return done(null, false, {
//         message: 'Username or password is incorrect.',
//       });

//     const passwordMatches = await bcrypt.compare(
//       password,
//       existingUser.password
//     );

//     if (!passwordMatches) {
//       return done(null, false, {
//         message: 'Username or password is incorrect.',
//       });
//     }
//     return done(null, {
//       user_id: existingUser._id,
//       username: existingUser.username,
//       user_email: existingUser.email,
//     });
//   })
// );

// passport.serializeUser(User.serializeUser());
// passport.serializeUser((user, done) => {
//   done(null, user);
// });
// // passport.deserializeUser(User.deserializeUser());
// passport.deserializeUser((id, done) => {
//   User.findById({ _id: id }, (err: any, user: any) => {
//     done(err, user);
//   });
// });

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
