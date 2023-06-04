import { useEffect, useState } from 'react';
import axios from 'axios';

import { Campground_Type } from '../../shared/types';
import Campground from './Campground';

export default function Campgrounds() {
  const [campgroundsData, setCampgroundsData] = useState<Campground_Type[]>([]);

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
    <div className='container mt-4'>
      <h2 className='w-75 mx-auto mb-3'>All Campgrounds</h2>
      {campgroundsData.map((campground) => (
        <Campground {...campground} key={campground._id} />
      ))}
    </div>
  );
}
