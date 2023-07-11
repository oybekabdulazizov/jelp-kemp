import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { asyncHandler } from '../utils';
import User from '../models/user';
import AppError from '../AppError';

export const signup = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, username } = req.body;

    const userWithExistingEmail = await User.findOne({ email });
    if (userWithExistingEmail)
      return next(new AppError(400, 'Email already taken.'));
    const userWithExistingUsername = await User.findOne({ username });
    if (userWithExistingUsername)
      return next(new AppError(400, 'Username already taken'));

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
  }
);

export const login = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
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
  }
);

export const logout = (req: Request, res: Response, next: NextFunction) => {
  res.clearCookie('token');
  res.status(200).send('Logged you out.');
};
