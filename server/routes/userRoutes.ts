import express, { NextFunction, Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import {
  asyncHandler,
  validateLoginFormData,
  validateSignupFormData,
} from '../utils';
import User from '../models/user';
import AppError from '../AppError';

const userRouter: Router = express.Router();

userRouter.post(
  '/register',
  validateSignupFormData,
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

    jwt.sign(
      {
        user_id: newUser._id,
        username: newUser.username,
        user_email: newUser.email,
      },
      'jwt-secret-key-so-private',
      {},
      (err, token) => {
        if (err) throw new AppError(500, err.message);
        res.cookie('token', token, { httpOnly: true }).json({
          user_id: newUser._id,
          username: newUser.username,
          user_email: newUser.email,
        });
      }
    );
  })
);

userRouter.post(
  '/login',
  validateLoginFormData,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { username, password } = req.body;

    const user = await User.findOne({
      $or: [{ username: username }, { email: username }],
    });
    if (!user) throw new AppError(400, 'Username or password is incorrect.');
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches)
      throw new AppError(400, 'Username or password is incorrect.');

    jwt.sign(
      {
        user_id: user._id,
        username: user.username,
        user_email: user.email,
      },
      'jwt-secret-key-so-private',
      {},
      (err, token) => {
        if (err) throw new AppError(500, err.message);
        res.cookie('token', token, { httpOnly: true }).json({
          user_id: user._id,
          username: user.username,
          user_email: user.email,
        });
      }
    );
  })
);

userRouter.get('/logout', (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('token');
  res.status(200).send('Logged you out.');
});

export default userRouter;
