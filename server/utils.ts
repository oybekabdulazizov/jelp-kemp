import { NextFunction, Request, Response } from 'express';
import { campgroundSchemaJoi } from './schemas';
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
