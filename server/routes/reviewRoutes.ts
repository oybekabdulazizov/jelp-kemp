import express, { NextFunction, Request, Response, Router } from 'express';

import { asyncHandler, validateReviewFormData } from '../utils';
import Campground from '../models/campground';
import AppError from '../AppError';
import Review from '../models/review';

const reviewRouter: Router = express.Router({ mergeParams: true });

reviewRouter.post(
  '/',
  validateReviewFormData,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const campground = await Campground.findById(req.params.campground_id);
    if (!campground) return next(new AppError(404, 'Campground Not Found!'));

    const { rating, text } = req.body;
    const review = new Review({ rating, text });

    campground.reviews.push(review);
    await review.save();
    await campground.save();

    res.status(200).send();
  })
);

reviewRouter.delete(
  '/:review_id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { campground_id, review_id } = req.params;
    await Review.findByIdAndDelete(review_id);
    await Campground.findByIdAndUpdate(campground_id, {
      $pull: { reviews: review_id },
    });
    res.status(200).send();
  })
);

export default reviewRouter;
