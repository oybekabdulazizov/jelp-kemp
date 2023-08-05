import { useEffect, useState } from 'react';
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from 'react-router-dom';
import axios from 'axios';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

import { Campground_Type, CurrentUser_Type } from '../../shared/types';
import { ReviewSchema } from '../../shared/schemas';
import ReviewForm from './ReviewForm';
import '../../styles/display-stars.css';

type Props = {
  currentUser: CurrentUser_Type | null;
};

export default function Details({ currentUser }: Props) {
  const { _id } = useParams();
  const [campground, setCampground] = useState<Campground_Type>();
  const [deleting, setDeleting] = useState<boolean>(false);
  const [isValidReview, setIsValidReview] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

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
    rating: 0,
    text: '',
    author: currentUser?.user_id,
  };

  const handleReviewSubmit = async (values: any, actions: any) => {
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

  const ratingStars = (length: number): Array<number> => {
    const arr: Array<number> = new Array();
    for (let i = 1; i <= 5; i++) {
      if (i <= length) {
        arr.push(1);
      } else {
        arr.push(0);
      }
    }
    return arr;
  };

  const formik = useFormik({
    initialValues,
    validationSchema: ReviewSchema,
    onSubmit: handleReviewSubmit,
  });

  return (
    <>
      <div className='row'>
        <div className='col-6'>
          <div
            id='carouselExampleAutoplaying'
            className='carousel slide'
            data-bs-ride='carousel'
          >
            <div className='carousel-inner'>
              {campground?.images.map((img, i) => (
                <div
                  className={`carousel-item ${i === 0 ? 'active' : ''}`}
                  key={i}
                >
                  <img
                    src={`${img.url}`}
                    className='d-block w-100'
                    alt={`campground-image-${i}`}
                  />
                </div>
              ))}
            </div>
            {campground?.images?.length && campground.images.length > 1 && (
              <>
                <button
                  className='carousel-control-prev'
                  type='button'
                  data-bs-target='#carouselExampleAutoplaying'
                  data-bs-slide='prev'
                >
                  <span
                    className='carousel-control-prev-icon'
                    aria-hidden='true'
                  ></span>
                  <span className='visually-hidden'>Previous</span>
                </button>
                <button
                  className='carousel-control-next'
                  type='button'
                  data-bs-target='#carouselExampleAutoplaying'
                  data-bs-slide='next'
                >
                  <span
                    className='carousel-control-next-icon'
                    aria-hidden='true'
                  ></span>
                  <span className='visually-hidden'>Next</span>
                </button>
              </>
            )}
          </div>
          <div className='card mb-3'>
            {/* <img
              src={`${campground?.image}`}
              className='card-img-top'
              alt={campground?.title}
            /> */}
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
                  <h5 className='card-text mb-0'>{review.author.username}</h5>
                  <div className='stars-wrapper'>
                    {ratingStars(review.rating).map((s, i) => {
                      return (
                        <p
                          className={`star ${s === 1 ? 'filled' : 'empty'}`}
                          key={i}
                        >
                          &#9733;
                        </p>
                      );
                    })}
                  </div>
                  <p className='card-text'>{review.text}</p>
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
