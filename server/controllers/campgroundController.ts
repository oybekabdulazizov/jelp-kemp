import { NextFunction, Request, Response } from 'express';

import { asyncHandler } from '../utils';
import Campground from '../models/campground';

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
    res.json({
      message: 'Campground created successfully.',
    });
  }
);

export const editCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const campground = await Campground.findById(_id);
    if (!campground) return res.json({ error: 'Campground Not Found!' });
    await Campground.findByIdAndUpdate(
      _id,
      { ...req.body },
      { runValidators: true }
    );
    res.json({
      message: 'Campground modified successfully.',
    });
  }
);

export const deleteCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    await Campground.findByIdAndDelete(_id);
    res.json({
      message: 'Campground deleted successfully.',
    });
  }
);

export const getCampground = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const campground = await Campground.findById(_id).populate('reviews');
    if (!campground) return res.json({ error: 'Campground not found!' });
    res.json(campground);
  }
);
