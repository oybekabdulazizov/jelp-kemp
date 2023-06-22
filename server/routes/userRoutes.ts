import express, { NextFunction, Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';

import { asyncHandler } from '../utils';
import User from '../models/user';
import AppError from '../AppError';
// import passport from 'passport';

const userRouter: Router = express.Router();

userRouter.post(
  '/register',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;

    const userWithExistingEmail = await User.findOne({ email });
    if (userWithExistingEmail) throw new AppError(400, 'Email already taken.');
    const userWithExistingUsername = await User.findOne({ username });
    if (userWithExistingUsername)
      throw new AppError(400, 'Username already taken.');

    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({ email, username, password: hashedPassword });
    await newUser.save();

    return res.json({
      user_id: newUser._id,
      username: newUser.username,
      user_email: newUser.email,
    });
    // try {
    //   const { email, username, password } = req.body;
    //   const user = new User({ email, username });
    //   await User.register(user, password);
    //   res.status(200).json({
    //     user_id: user._id,
    //     username: username,
    //     user_email: email,
    //   });
    // } catch (err: any) {
    //   return next(err);
    // }
    // const { email, username, password } = req.body;
    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //   throw new AppError(400, 'Username is already taken.');
    // }
    // const hashpassword: string = await bcrypt.hash(password, 10);
    // const newUser = new User({ email, username, hashpassword });
    // await newUser.save();
    // req.session.save((err) => {
    //   if (err) return next(err);
    // });
    // req.user = {
    //   user_id: newUser._id,
    //   username: newUser.username,
    //   user_email: newUser.email,
    // };
    // res.json(req.user);
  })
);

// userRouter.get('/user', (req: Request, res: Response) => {
//   console.log(req.user);
//   res.send(req.user);
// });

userRouter.post(
  '/login',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });
    if (!user) throw new AppError(400, 'Username or password is incorrect.');
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      throw new AppError(400, 'Username or password is incorrect.');

    res.json({
      user_id: user._id,
      username: user.username,
      user_email: user.email,
    });

    // await passport.authenticate('local', (err: any, user: any, info: any) => {
    //   if (err) {
    //     console.log(err);
    //     throw err;
    //   }
    //   if (info) {
    //     console.log(info);
    //     return res.status(401).json(info);
    //   }
    //   if (user) {
    //     req.logIn(user, (err) => {
    //       req.user = user;
    //       if (err) throw err;
    //     });
    //     res.status(200).json({
    //       user_id: user._id,
    //       username: user.username,
    //       user_email: user.email,
    //     });
    //   }
    // })(req, res, next);
    // await passport.authenticate('local', (err: any, user: any, info: any) => {
    //   if (err) return next(err);
    //   if (info) {
    //     res.status(401).send(info.message);
    //   }
    //   if (user) {
    //     req.logIn(user, (err) => {
    //       if (err) return next(err);
    //       req.session.save((err) => {
    //         if (err) return next(err);
    //       });
    //       return res.send(user);
    //       // return res.json({
    //       //   user_id: user._id,
    //       //   username: user.username,
    //       //   user_email: user.email,
    //       // });
    //     });
    //   }
    // })(req, res, next);
  })
);

userRouter.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  // req.logOut((err: any) => {
  //   if (err) throw err;
  // });
  res.status(200).send('Logged you out.');
});

export default userRouter;
