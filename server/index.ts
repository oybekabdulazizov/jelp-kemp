import express, { Express, Request, Response } from 'express';
import { connect } from 'mongoose';

import Campground from './models/camground';

connect('mongodb://127.0.0.1:27017/jelp-kemp')
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.log('ERROR OCCURRED WHILE CONNECTING TO THE DATABASE:');
    console.log(err);
  });

const app: Express = express();

app.get('/makecampground', async (req: Request, res: Response) => {
  const camp = new Campground({
    title: 'My Backyard',
    price: '1',
    description: 'Cheap camping :)',
    location: 'Warsaw, Poland',
  });
  await camp.save();
  res.send(camp);
});

app.listen('3001', () => {
  console.log('Listening to port 3001...');
});
