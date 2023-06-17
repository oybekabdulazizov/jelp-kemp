import express, { NextFunction, Request, Response, Router } from 'express';
// import bcrypt from 'bcrypt';

import { asyncHandler } from '../utils';
import User from '../models/user';
// import AppError from '../AppError';
import passport from 'passport';

const userRouter: Router = express.Router();

userRouter.post(
  '/register',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, username, password } = req.body;
      const user = new User({ email, username });
      const registeredUser = await User.register(user, password);
      res.json(registeredUser);
    } catch (err: any) {
      console.log(err);
      return next(err);
    }

    // const hash: string = await bcrypt.hash(password, 10);
    // const existingUser = await User.findOne({ username });

    // if (existingUser) {
    //   throw new AppError(400, 'Username is already taken.');
    // }

    // const newUser = new User({ email, username, hash });
    // await newUser.save();
    // res.json(newUser);
  })
);

userRouter.post(
  '/login',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate('local', (err: any, user: any, info: any) => {
      if (err) {
        console.log(err);
        throw err;
      }

      if (info) {
        return res.status(401).json(info);
      }

      if (user) return res.status(200).json(user);
    })(req, res, next);
    console.log(req.user);

    //   passport.authenticate('local', (err: any, user: any, info: any) => {
    //     if (!user) {
    //       return res.send(info.message);
    //     }

    //     req.logIn(user, (err) => {
    //       return res.send('Successfully authenticated!');
    //     });
    //   })(req, res, next);
  })
);

export default userRouter;
