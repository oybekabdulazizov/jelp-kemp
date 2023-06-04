import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Campground_Type } from '../../shared/types';
import axios from 'axios';

type Props = {
  campgrounds: Array<Campground_Type>;
};

type Dimentions_Type = {
  width: number;
  height: number;
};

export default function Details({}: Props) {
  const { _id } = useParams();
  const [campground, setCampground] = useState<Campground_Type>();
  const [dimentions, setDimentions] = useState<Dimentions_Type>({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const findCampground = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/campgrounds/${_id}`
        );
        const campgroundFromDb = await response.data;
        setCampground(campgroundFromDb);
      } catch (err) {
        console.log(err);
      }
    };

    const handleResize = () => {
      setDimentions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    findCampground();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={`container my-4 ${dimentions.width < 576 && 'px-4'}`}>
      <div
        className={`card ${dimentions.width >= 992 ? 'w-50' : 'w-75'} mx-auto`}
      >
        <img
          src={`${campground?.image}`}
          className='card-img-top'
          alt={campground?.title}
        />
        <div className='card-body'>
          <h5 className='card-title'>{campground?.title} </h5>

          <p className='card-text'>{campground?.description}</p>
        </div>
        <ul className='list-group list-group-flush'>
          <li className='list-group-item'>{campground?.location}</li>
          <li className='list-group-item'>${campground?.price}/night</li>
        </ul>
        <div className='card-body'></div>
        <div className='card-footer text-body-secondary'>2 days ago</div>
      </div>
    </div>
  );
}
