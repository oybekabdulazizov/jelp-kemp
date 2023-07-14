import { NextFunction, Request, Response } from 'express';

import {
  campgroundSchemaJoi,
  loginSchemaJoi,
  reviewSchemaJoi,
  signupSchemaJoi,
} from './schemas';
import AppError from './AppError';

export const validateCampgroundFormData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { title, location, price, image, description } = req.body;
  const { error } = campgroundSchemaJoi.validate({
    title,
    location,
    price,
    image,
    description,
  });
  if (error) {
    throw new AppError(400, error.details[0].message);
  } else {
    next();
  }
};

export const validateReviewFormData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { rating, text } = req.body;
  const { error } = reviewSchemaJoi.validate({ rating, text });
  if (error) {
    console.dir(error);
    throw new AppError(400, error.details[0].message);
  } else {
    next();
  }
};

export const validateSignupFormData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, username, password } = req.body;
  const { error } = signupSchemaJoi.validate({ email, username, password });
  if (error) {
    console.dir(error);
    throw new AppError(400, error.details[0].message);
  } else {
    next();
  }
};

export const validateLoginFormData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { username, password } = req.body;
  const { error } = loginSchemaJoi.validate({ username, password });
  if (error) {
    console.dir(error);
    throw new AppError(400, error.details[0].message);
  } else {
    next();
  }
};
