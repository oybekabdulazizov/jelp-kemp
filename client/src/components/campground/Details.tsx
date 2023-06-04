import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { Campground_Type } from '../../shared/types';
import useResize from '../../hooks/useResize';

type Props = {
  campgrounds: Array<Campground_Type>;
};

export default function Details({}: Props) {
  const { _id } = useParams();
  const [campground, setCampground] = useState<Campground_Type>();

  const { width } = useResize();

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

    findCampground();
  }, []);

  return (
    <div className={`container my-4 ${width < 576 && 'px-4'}`}>
      <div className={`card ${width >= 992 ? 'w-50' : 'w-75'} mx-auto`}>
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
        <div className='card-body'>
          <Link
            to={`/campgrounds/${campground?._id}/edit`}
            className='btn btn-primary me-2'
          >
            Edit
          </Link>
        </div>
        <div className='card-footer text-body-secondary'>2 days ago</div>
      </div>
    </div>
  );
}
