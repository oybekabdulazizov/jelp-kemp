import express, { Express, NextFunction, Request, Response } from 'express';
import { connect } from 'mongoose';
import cors from 'cors';

import AppError from './AppError';
import Campground from './models/campground';

connect('mongodb://127.0.0.1:27017/jelp-kemp')
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.log('ERROR OCCURRED WHILE CONNECTING TO THE DATABASE:');
    console.log(err);
  });

const app: Express = express();
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/campgrounds', async (req: Request, res: Response) => {
  const campgrounds = await Campground.find({});
  res.json(campgrounds);
});

app.post('/campgrounds', async (req: Request, res: Response) => {
  const newCampground = new Campground({ ...req.body });
  newCampground.save();
  res.status(200).send();
});

app.put('/campgrounds/:_id', async (req: Request, res: Response) => {
  const { _id } = req.params;
  await Campground.findByIdAndUpdate(
    _id,
    { ...req.body },
    { runValidators: true }
  );
  res.status(200).send();
});

app.delete('/campgrounds/:_id', async (req: Request, res: Response) => {
  const { _id } = req.params;
  await Campground.findByIdAndDelete(_id);
  res.status(200).send();
});

app.get(
  '/campgrounds/:_id',
  async (req: Request, res: Response, next: NextFunction) => {
    const { _id } = req.params;
    const campground = await Campground.findById(_id);
    if (!campground) return next(new AppError(404, 'Campground Not Found!'));
    res.json(campground);
  }
);

app.use((err: any, req: Request, res: Response) => {
  const { status = 500, message = 'Something went wrong!' } = err;
  res.status(status).send(message);
});

app.listen('3001', () => {
  console.log('Listening to port 3001...');
});
