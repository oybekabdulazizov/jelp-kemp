import { useEffect, useState } from 'react';
import {
  Link,
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';

import { Campground_Type } from '../../shared/types';
import { ReviewSchema } from '../../shared/schemas';
import ReviewForm from './ReviewForm';
import CustomSnackbar from '../CustomSnackbar';

export default function Details() {
  const { _id } = useParams();
  const [campground, setCampground] = useState<Campground_Type>();
  const [isValidReview, setIsValidReview] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  useEffect(() => {
    const findCampground = async () => {
      try {
        const response = await axios.get(`/campgrounds/${_id}`);
        if (response.data.error) {
          navigate('/campgrounds', {
            state: { status: 'error', message: response.data.error },
          });
        } else {
          const campgroundFromDb = await response.data;
          setCampground(campgroundFromDb);
        }
      } catch (err: any) {
        navigate('/campgrounds', {
          state: { status: 'error', message: err.message },
        });
      }
    };
    findCampground();
  }, []);

  const handleDelete = async () => {
    try {
      await axios.delete(`/campgrounds/${_id}`);
      navigate(`/campgrounds`, {
        state: {
          status: 'success',
          message: `Successfully deleted the campground.`,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };

  const initialValues = {
    rating: 5,
    text: '',
  };

  const onSubmit = async (values: any, actions: any) => {
    if (Object.keys(formik.errors).length < 1) setIsValidReview(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      await axios.post(`/campgrounds/${_id}/reviews`, values);
      actions.resetForm();
      setIsValidReview(false);
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleReviewDelete = async (
    review_id: string | undefined
  ): Promise<void> => {
    try {
      await axios.delete(`/campgrounds/${_id}/reviews/${review_id}`);
    } catch (err: any) {
      console.log(err);
    }
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ReviewSchema,
    onSubmit,
  });

  return (
    <>
      <div className='row'>
        <CustomSnackbar location={location} />
        <div className='col-6'>
          <div className='card mb-3'>
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
        </div>
        <div className='col-6'>
          <ReviewForm {...formik} isValidReview={isValidReview} />
          <div className='card'>
            <ul className='list-group list-group-flush'>
              {campground?.reviews.map((review) => (
                <li className='list-group-item' key={review._id}>
                  <h5 className='card-title'>Rating: {review.rating}</h5>
                  <p className='card-text'>Review: {review.text}</p>
                  <button
                    className='btn btn-sm btn-danger'
                    onClick={() => handleReviewDelete(review._id)}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
