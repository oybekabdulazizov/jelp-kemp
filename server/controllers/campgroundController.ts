import { NextFunction, Request, Response } from 'express';

import { asyncHandler } from '../utils';
import Campground from '../models/campground';
import AppError from '../AppError';

export const getCampgrounds = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const campgrounds = await Campground.find({});
    res.json(campgrounds);
  }
);

export const createCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const newCampground = new Campground({ ...req.body });
    await newCampground.save();
    res.status(200).send();
  }
);

export const editCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const campground = await Campground.findById(_id);
    if (!campground) return next(new AppError(404, 'Campground Not Found!'));
    await Campground.findByIdAndUpdate(
      _id,
      { ...req.body },
      { runValidators: true }
    );
    res.status(200).send();
  }
);

export const deleteCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    await Campground.findByIdAndDelete(_id);
    res.status(200).send();
  }
);

export const getCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const campground = await Campground.findById(_id).populate('reviews');
    if (!campground) return next(new AppError(404, 'Campground Not Found!'));
    res.json(campground);
  }
);
