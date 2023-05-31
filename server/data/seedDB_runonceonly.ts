// const mongoose = require('mongoose');
// const Campground = require('../models/campground');
// const cities = require('./cities.json');
// const descriptors = require('./discriptors.json');
// const places = require('./places.json');

import { connect } from 'mongoose';
import Campground from '../models/campground';
import cities from './cities.json';
import descriptors from './descriptors.json';
import places from './places.json';

// const connect = mongoose.connect;
connect('mongodb://127.0.0.1:27017/jelp-kemp')
  .then(() => {
    console.log('Database connected...');
  })
  .catch((err) => {
    console.log('ERROR OCCURRED WHILE CONNECTING TO THE DATABASE:');
    console.log(err);
  });

const getRadnomItem = (arr: string[]) =>
  arr[Math.floor(Math.random() * arr.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 100; i++) {
    const rand1000 = Math.floor(Math.random() * cities.length);
    const campground = new Campground({
      title: `${getRadnomItem(descriptors)} ${getRadnomItem(places)}`,
      location: `${cities[rand1000].city}, ${cities[rand1000].state}`,
    });
    campground.save();
  }
};

seedDB();
