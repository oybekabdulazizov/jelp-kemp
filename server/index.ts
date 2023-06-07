import express, { Express, NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import colors from 'colors/safe';
import Joi from 'joi';

import AppError from './AppError';
import Campground from './models/campground';

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
    // try {
    const campgrounds = await Campground.find({});
    res.json(campgrounds);
    // } catch (err: any) {
    //   console.log(error('***** GET - Unexpected error occurred *****'));
    //   next(err);
    // }
  })
);

app.post(
  '/campgrounds',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // try {
    const campgroundSchemaJoi = Joi.object({
      title: Joi.string().max(100).required(),
      location: Joi.string().max(100).required(),
      price: Joi.number().min(0).max(1000).required(),
      image: Joi.string().max(250).required(),
      description: Joi.string().max(1000).required(),
    });
    const { error } = campgroundSchemaJoi.validate(req.body);
    if (error) {
      throw new AppError(400, error.details[0].message);
    }
    const newCampground = new Campground({ ...req.body });
    await newCampground.save();
    res.status(200).send();
    // } catch (err: any) {
    //   console.log(error('***** POST - Campground Validation Failed *****'));
    //   next(err);
    // }
  })
);

app.put(
  '/campgrounds/:_id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    // try {
    const campgroundSchemaJoi = Joi.object({
      title: Joi.string().max(100).required(),
      location: Joi.string().max(100).required(),
      price: Joi.number().min(0).max(1000).required(),
      image: Joi.string().max(250).required(),
      description: Joi.string().max(1000).required(),
    });
    const { error } = campgroundSchemaJoi.validate(req.body);
    if (error) {
      throw new AppError(400, error.details[0].message);
    }
    await Campground.findByIdAndUpdate(
      _id,
      { ...req.body },
      { runValidators: true }
    );
    res.status(200).send();
    // } catch (err: any) {
    //   console.log(error('***** PUT - Campground Update Failed *****'));
    //   next(err);
    // }
  })
);

app.delete(
  '/campgrounds/:_id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    // try {
    await Campground.findByIdAndDelete(_id);
    res.status(200).send();
    // } catch (err) {
    //   console.log(error('***** DELETE - Campground Deletion Failed *****'));
    //   next(err);
    // }
  })
);

app.get(
  '/campgrounds/:_id',
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    // try {
    const { _id } = req.params;
    const campground = await Campground.findById(_id);
    if (!campground) return next(new AppError(404, 'Campground Not Found!'));
    res.json(campground);
    // } catch (err: any) {
    //   console.log(error('***** GET(id) - Campground Not Found *****'));
    //   next(new AppError(404, 'Not Found!'));
    // }
  })
);

app.get('*', (req, res, next) => {
  next(new AppError(404, 'Page Not Found!'));
});

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  const { code = 500, message = 'Something went wrong!' } = err;
  res.status(code).send(message);
});

app.listen('3001', () => {
  console.log('Listening to port 3001...');
});
