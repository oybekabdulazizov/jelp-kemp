import { useEffect, useState } from 'react';
import axios from 'axios';

import { Campground_Type } from './shared/types';
import Campgrounds from './components/campground';

export default function App() {
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
    <div className='container bg-dark text-light'>
      <Campgrounds campgroundsData={campgroundsData} />
    </div>
  );
}
