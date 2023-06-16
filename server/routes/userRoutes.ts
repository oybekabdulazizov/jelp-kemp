import express, { NextFunction, Request, Response, Router } from 'express';

import { asyncHandler } from '../utils';
import User from '../models/user';

const userRouter: Router = express.Router();

userRouter.post(
  '/register',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, username } = req.body;
    const user = new User({ email, username });
    const registeredUser = await User.register(user, password);
    res.send(registeredUser);
  })
);

export default userRouter;
