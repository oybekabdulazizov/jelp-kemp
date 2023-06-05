import express, { Express, NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';
import colors from 'colors/safe';

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

app.get(
  '/campgrounds',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const campgrounds = await Campground.find({});
      res.json(campgrounds);
    } catch (err: any) {
      console.log(error('***** GET - Unexpected error occurred *****'));
      next(err);
    }
  }
);

app.post(
  '/campgrounds',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newCampground = new Campground({ ...req.body });
      await newCampground.save();
      res.status(200).send();
    } catch (err: any) {
      console.log(error('***** POST - Campground Validation Failed *****'));
      next(err);
    }
  }
);

app.put(
  '/campgrounds/:_id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    try {
      await Campground.findByIdAndUpdate(
        _id,
        { ...req.body },
        { runValidators: true }
      );
      res.status(200).send();
    } catch (err: any) {
      console.log(error('***** PUT - Campground Validation Failed *****'));
      next(err);
    }
  }
);

app.delete(
  '/campgrounds/:_id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    try {
      const deleted = await Campground.findByIdAndDelete(_id);
      console.log(deleted);
      res.status(200).send();
    } catch (err) {
      console.log(error('***** DELETE - Campground Deletion Failed *****'));
      next(err);
    }
  }
);

app.get(
  '/campgrounds/:_id',
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { _id } = req.params;
      const campground = await Campground.findById(_id);
      if (!campground) return next(new AppError(404, 'Not Found!'));
      res.json(campground);
    } catch (err: any) {
      console.log(error('***** GET(id) - Campground Not Found *****'));
      next(new AppError(404, 'Not Found!'));
    }
  }
);

app.use(async (err: any, req: Request, res: Response, next: NextFunction) => {
  const { status = 500, message = 'Something went wrong!' } = err;
  res.status(status).send(message);
});

app.listen('3001', () => {
  console.log('Listening to port 3001...');
});
