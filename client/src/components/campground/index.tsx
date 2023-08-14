import { useEffect, useState } from 'react';
import axios from 'axios';

import Campground from './Campground';
import { Campground_Type } from '../../shared/types';
import ClusteredMap from './ClusteredMap';
import '../../styles/map.css';

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
      <div className='clustered-map-wrapper mb-4'>
        <ClusteredMap campgroundsData={campgroundsData} />
      </div>
      <div className='container'>
        <h2 className='offset-lg-1 mb-3'>All Campgrounds</h2>
        {campgroundsData.slice().map((campground) => (
          <Campground {...campground} key={campground._id} />
        ))}
      </div>
    </>
  );
}
