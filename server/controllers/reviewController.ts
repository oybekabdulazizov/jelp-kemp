import { NextFunction, Request, Response } from 'express';

import { asyncHandler } from '../utils';
import Campground from '../models/campground';
import AppError from '../AppError';
import Review from '../models/review';

export const addReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { campground_id } = req.params;
    const campground = await Campground.findById(campground_id);
    if (!campground) return next(new AppError(404, 'Campground Not Found!'));

    const { rating, text } = req.body;
    const review = new Review({ rating, text });

    campground.reviews.push(review);
    await review.save();
    await campground.save();

    res.status(200).send();
  }
);

export const deleteReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { campground_id, review_id } = req.params;
    await Review.findByIdAndDelete(review_id);
    await Campground.findByIdAndUpdate(campground_id, {
      $pull: { reviews: review_id },
    });
    res.status(200).send();
  }
);
