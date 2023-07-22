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
import { toast } from 'react-hot-toast';

import { Campground_Type, CurrentUser_Type } from '../../shared/types';
import { ReviewSchema } from '../../shared/schemas';
import ReviewForm from './ReviewForm';
import CustomSnackbar from '../CustomSnackbar';

type Props = {
  currentUser: CurrentUser_Type | null;
};

export default function Details({ currentUser }: Props) {
  const { _id } = useParams();
  const [campground, setCampground] = useState<Campground_Type>();
  const [deleting, setDeleting] = useState<boolean>(false);
  const [isValidReview, setIsValidReview] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  useEffect(() => {
    const findCampground = async () => {
      try {
        const { data } = await axios.get(`/campgrounds/${_id}`);
        if (data.error) {
          toast.error(data.error);
          navigate('/campgrounds', {});
        } else {
          const campgroundFromDb = await data;
          setCampground(campgroundFromDb);
        }
      } catch (err: any) {
        toast.error(err.message);
        navigate('/campgrounds', {});
      }
    };
    if (!deleting) findCampground();
  }, [campground]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const { data } = await axios.delete(`/campgrounds/${_id}`);

      if (data.error) {
        toast.error(data.error);
        navigate(`/campgrounds`);
      }

      if (data.message) {
        toast.success(data.message);
        navigate(`/campgrounds`);
      }
    } catch (err) {
      console.log(err);
    }
    setDeleting(false);
  };

  const initialValues = {
    rating: 5,
    text: '',
    author: currentUser?.user_id,
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
      const { data } = await axios.delete(
        `/campgrounds/${_id}/reviews/${review_id}`
      );
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (data.message) {
        toast.success(data.message);
        return;
      }
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
              <li className='list-group-item'>
                Submitted by {campground?.author.username}
              </li>
              <li className='list-group-item'>${campground?.price}/night</li>
            </ul>
            {currentUser?.user_id &&
              campground?.author._id === currentUser?.user_id && (
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
              )}
            <div className='card-footer text-body-secondary'>2 days ago</div>
          </div>
        </div>
        <div className='col-6'>
          <ReviewForm
            {...formik}
            isValidReview={isValidReview}
            currentUser={currentUser}
          />
          <div className='card'>
            <ul className='list-group list-group-flush'>
              {campground?.reviews.map((review) => (
                <li className='list-group-item' key={review._id}>
                  <h5 className='card-text'> By: {review.author.username}</h5>
                  <p className='card-title'>Rating: {review.rating}</p>
                  <p className='card-text'>Review: {review.text}</p>
                  {review.author._id === currentUser?.user_id && (
                    <button
                      className='btn btn-sm btn-danger'
                      onClick={() => handleReviewDelete(review._id)}
                    >
                      Delete
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
