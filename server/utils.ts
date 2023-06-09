import { NextFunction, Request, Response } from 'express';
import { campgroundSchemaJoi } from './schemas';
import AppError from './AppError';

export const validateCampgroundFormData = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { error } = campgroundSchemaJoi.validate(req.body);
  if (error) {
    throw new AppError(400, error.details[0].message);
  } else {
    next();
  }
};
