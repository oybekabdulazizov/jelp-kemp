import { useEffect, useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

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
      } catch (err: any) {
        if (err.response) {
          if (err.response.data) toast.error(err.response.data);
        }
        if (err.message) {
          toast.error(err.message);
        }
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
        <div className='mb-2' style={{ height: '80vh', overflowY: 'scroll' }}>
          {campgroundsData.slice().map((campground) => (
            <Campground {...campground} key={campground._id} />
          ))}
        </div>
      </div>
    </>
  );
}
