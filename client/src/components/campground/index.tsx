import { useEffect, useState } from 'react';
import axios from 'axios';

import Campground from './Campground';
import { Campground_Type } from '../../shared/types';

export default function Campgrounds() {
  const [campgroundsData, setCampgroundsData] = useState<Campground_Type[]>([]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axios.get('/campgrounds');
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
      <h2 className='w-75 mx-auto mb-3'>All Campgrounds</h2>
      {campgroundsData.slice().map((campground) => (
        <Campground {...campground} key={campground._id} />
      ))}
    </div>
  );
}
