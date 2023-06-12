import express, { Express, NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import colors from 'colors/safe';

import AppError from './AppError';
import Campground from './models/campground';
import Review from './models/review';
import { validateCampgroundFormData, validateReviewFormData } from './utils';

const error = colors.red;

connect('mongodb://127.0.0.1:27017/jelp-kemp')
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err: any) => {
    console.log(error('***** FAILED TO CONNECT TO MONGODB *****'));
    console.log(err.message);
  });

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

const asyncHandler =
  (func: any) => (req: Request, res: Response, next: NextFunction) => {
    func(req, res, next).catch(next);
  };

app.get(
  '/campgrounds',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const campgrounds = await Campground.find({});
    res.json(campgrounds);
  })
);

app.post(
  '/campgrounds',
  validateCampgroundFormData,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const newCampground = new Campground({ ...req.body });
    await newCampground.save();
    res.status(200).send();
  })
);

app.put(
  '/campgrounds/:_id',
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

app.delete(
  '/campgrounds/:_id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    await Campground.findByIdAndDelete(_id);
    res.status(200).send();
  })
);

app.get(
  '/campgrounds/:_id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const campground = await Campground.findById(_id).populate('reviews');
    if (!campground) return next(new AppError(404, 'Campground Not Found!'));
    res.json(campground);
  })
);

app.get('*', (req: Request, res: Response, next: NextFunction) => {
  next(new AppError(404, 'Page Not Found!'));
});

app.post(
  '/campgrounds/:_id/reviews',
  validateReviewFormData,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const campground = await Campground.findById(req.params._id);
    if (!campground) return next(new AppError(404, 'Campground Not Found!'));

    const { rating, text } = req.body;
    const review = new Review({ rating, text });

    campground.reviews.push(review);
    await review.save();
    await campground.save();

    res.status(200).send();
  })
);

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  const { code = 500, message = 'Something went wrong!' } = err;
  let updatedCode: number = code;
  let updatedMessage: string = message;

  if (message.includes('Cast to ObjectId failed')) {
    updatedCode = 404;
    updatedMessage = 'Campground Not Found!';
  }
  res.status(updatedCode).send(updatedMessage);
});

app.listen('3001', () => {
  console.log('Listening to port 3001...');
});
