import express, { NextFunction, Request, Response, Router } from 'express';
import bcrypt from 'bcrypt';

import { asyncHandler } from '../utils';
import User from '../models/user';
import AppError from '../AppError';

const userRouter: Router = express.Router();

userRouter.post(
  '/register',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, username, password } = req.body;
    const hash: string = await bcrypt.hash(password, 10);
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      throw new AppError(400, 'Username is already taken.');
    }

    const newUser = new User({ email, username, hash });
    await newUser.save();
    res.json(newUser);
  })
);

userRouter.post('/login', async (req: Request, res: Response) => {});

export default userRouter;
