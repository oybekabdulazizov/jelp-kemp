import express, { Router } from 'express';

import { validateLoginFormData, validateSignupFormData } from '../middlewares';
import { login, logout, signup } from '../controllers/userController';

const userRouter: Router = express.Router();

userRouter.post('/register', validateSignupFormData, signup);

userRouter.post('/login', validateLoginFormData, login);

userRouter.get('/logout', logout);

export default userRouter;
