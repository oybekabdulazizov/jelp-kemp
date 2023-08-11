import { useEffect, useState } from 'react';
import axios from 'axios';

import Campground from './Campground';
import { Campground_Type } from '../../shared/types';
import ClusteredMap from './ClusteredMap';

export default function Campgrounds() {
  const [campgroundsData, setCampgroundsData] = useState<Campground_Type[]>([]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const { data } = await axios.get('/campgrounds');
        if (data) {
          setCampgroundsData(data);
        }
      } catch (err) {
        console.log('error occurred: ');
        console.log(err);
      }
    };
    fetchCampgrounds();
  }, []);

  return (
    <>
      <div style={{ width: '100%', height: '400px' }}>
        <ClusteredMap campgroundsData={campgroundsData} />
      </div>
      <div className='container'>
        <h2 className='w-75 mx-auto mb-3'>All Campgrounds</h2>
        {campgroundsData.slice().map((campground) => (
          <Campground {...campground} key={campground._id} />
        ))}
      </div>
    </>
  );
}
