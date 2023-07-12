import { NextFunction, Request, Response } from 'express';

import { asyncHandler } from '../utils';
import Campground from '../models/campground';
import Review from '../models/review';

export const addReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { campground_id } = req.params;
    const campground = await Campground.findById(campground_id);
    if (!campground) return res.json({ error: 'Campground not found!' });

    const { rating, text } = req.body;
    const review = new Review({ rating, text });

    campground.reviews.push(review);
    await review.save();
    await campground.save();

    res.json({ message: 'Review added.' });
  }
);

export const deleteReview = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { campground_id, review_id } = req.params;
    await Review.findByIdAndDelete(review_id);
    await Campground.findByIdAndUpdate(campground_id, {
      $pull: { reviews: review_id },
    });
    res.json({ message: 'Review deleted.' });
  }
);
