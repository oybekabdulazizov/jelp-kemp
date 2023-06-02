import { useEffect, useState } from 'react';
import axios from 'axios';

import './App.css';

type Campground_Type = {
  title: string;
  description: string;
  price: number;
  location: string;
  imgUrl?: string;
};

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
    <div>
      <ul>
        {campgroundsData.map((camp, id) => (
          <li key={id}>
            {camp.title} ({camp.location}) - ${camp.price}/night
          </li>
        ))}
      </ul>
    </div>
  );
}
