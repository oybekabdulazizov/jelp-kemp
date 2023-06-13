import express, { Response, Request, NextFunction, Router } from 'express';
import { validateCampgroundFormData } from '../utils';
import Campground from '../models/campground';
import AppError from '../AppError';

const campgroundRouter: Router = express.Router();

export const asyncHandler =
  (func: any) => (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };

campgroundRouter.get(
  '/',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const campgrounds = await Campground.find({});
    res.json(campgrounds);
  })
);

campgroundRouter.post(
  '/',
  validateCampgroundFormData,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const newCampground = new Campground({ ...req.body });
    await newCampground.save();
    res.status(200).send();
  })
);

campgroundRouter.put(
  '/:_id',
  validateCampgroundFormData,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const campground = await Campground.findById(_id);
    if (!campground) return next(new AppError(404, 'Campground Not Found!'));
    await Campground.findByIdAndUpdate(
      _id,
      { ...req.body },
      { runValidators: true }
    );
    res.status(200).send();
  })
);

campgroundRouter.delete(
  '/:_id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    await Campground.findByIdAndDelete(_id);
    res.status(200).send();
  })
);

campgroundRouter.get(
  '/:_id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const campground = await Campground.findById(_id).populate('reviews');
    if (!campground) return next(new AppError(404, 'Campground Not Found!'));
    res.json(campground);
  })
);

export default campgroundRouter;
