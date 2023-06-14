import { useEffect, useState } from 'react';
import axios from 'axios';
import { Location, useLocation } from 'react-router-dom';

import Campground from './Campground';
import { Campground_Type } from '../../shared/types';
import CustomSnackbar from '../CustomSnackbar';

export default function Campgrounds() {
  const [campgroundsData, setCampgroundsData] = useState<Campground_Type[]>([]);
  const location: Location = useLocation();

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axios.get('http://localhost:3001/campgrounds');
        const data = await response.data;
        setCampgroundsData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCampgrounds();
  }, []);

  return (
    <div className='container'>
      <CustomSnackbar location={location} />
      <h2 className='w-75 mx-auto mb-3'>All Campgrounds</h2>
      {campgroundsData.map((campground) => (
        <Campground {...campground} key={campground._id} />
      ))}
    </div>
  );
}
