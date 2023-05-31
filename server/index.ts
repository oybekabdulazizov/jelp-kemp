import express, { Express, Request, Response } from 'express';
import { connect } from 'mongoose';

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

app.get('/campgrounds', async (req: Request, res: Response) => {
  const campgrounds = await Campground.find({});
  res.json(campgrounds);
});

app.listen('3001', () => {
  console.log('Listening to port 3001...');
});
