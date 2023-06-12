import { useEffect, useState } from 'react';
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';

import { Campground_Type } from '../../shared/types';
import useResize from '../../hooks/useResize';
import { NotFound_Type } from './types';
import { NotFound } from './ErrorTemplate';

export default function Details() {
  const { _id } = useParams();
  const [campground, setCampground] = useState<Campground_Type>();
  const [notFound, setNotFound] = useState<NotFound_Type>({
    status: 0,
    message: '',
  });
  const { width } = useResize();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    const findCampground = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/campgrounds/${_id}`
        );
        const campgroundFromDb = await response.data;
        setCampground(campgroundFromDb);
      } catch (err: any) {
        setNotFound({
          status: err.response.status,
          message: err.response.data,
        });
      }
    };

    findCampground();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/campgrounds/${_id}`);
      navigate(`/campgrounds`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {notFound.status === 404 ? (
        <NotFound status={notFound.status} message={notFound.message} />
      ) : (
        <div className={`container my-4 ${width < 576 && 'px-4'}`}>
          <div className={`${width >= 992 ? 'w-50' : 'w-75'} mx-auto`}>
            <div className={`card w-auto`}>
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
                <button className='btn btn-danger' onClick={handleDelete}>
                  Delete
                </button>
              </div>
              <div className='card-footer text-body-secondary'>2 days ago</div>
            </div>
            <div className={`w-auto`}>
              <h2 className='pt-3 pb-2 m-0'>Leave a review</h2>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(e.target);
                }}
              >
                <div className='mb-3'>
                  <label htmlFor='rating' className='form-label fw-medium'>
                    Rating
                  </label>
                  <input
                    type='range'
                    className='form-range'
                    name='rating'
                    min={1}
                    max={5}
                    id='rating'
                  />
                </div>

                <div className='mb-3'>
                  <label htmlFor='text' className='form-label fw-medium'>
                    Review
                  </label>
                  <textarea
                    className={`form-control`}
                    id='text'
                    name='text'
                    rows={4}
                  />
                </div>
                <button
                  type='submit'
                  className='btn btn-success py-2 fw-medium'
                >
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
