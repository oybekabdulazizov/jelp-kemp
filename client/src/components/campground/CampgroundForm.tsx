import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Link,
  Location,
  Navigate,
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

import { CampgroundSchema } from '../../shared/schemas';
import { CurrentUser_Type } from '../../shared/types';

type Props = {
  currentUser: CurrentUser_Type | null;
};

export default function CampgroundForm({ currentUser }: Props) {
  const [allValid, setAllValid] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const { _id } = useParams();
  const isCreate: boolean = !_id;

  const create = async (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('location', values.location);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('image', values.image);

    try {
      const { data } = await axios.post('/campgrounds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (err: any) {
      console.log(err);
    }
  };

  const edit = async (values: any) => {
    try {
      const { data } = await axios.put(`/campgrounds/${_id}`, values);
      return data;
    } catch (err: any) {
      console.log(err);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const img = e.target.files ? e.target.files[0] : '';
    setFieldValue('image', img);
  };

  const onSubmit = async (values: any, actions: any) => {
    if (Object.keys(errors).length < 1) setAllValid(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (isCreate) {
      const data = await create(values);
      if (data.error) {
        toast.error(data.error);
        navigate(`/campgrounds`);
        return;
      }
      if (data.message) {
        actions.resetForm();
        toast.success(data.message);
        navigate(`/campgrounds`);
        return;
      }
    }

    if (!isCreate) {
      const data = await edit(values);
      if (data.error) {
        toast.error(data.error);
        navigate(`/campgrounds/${_id}`);
        return;
      }
      if (data.message) {
        actions.resetForm();
        toast.success(data.message);
        navigate(`/campgrounds/${_id}`);
        return;
      }
    }
  };

  const initialValues = {
    title: '',
    location: '',
    price: '',
    // image: '',
    description: '',
    author: currentUser?.user_id,
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    resetForm,
    setValues,
    touched,
    values,
    setFieldValue,
  } = useFormik({
    initialValues,
    validationSchema: CampgroundSchema,
    onSubmit,
  });

  useEffect(() => {
    if (!isCreate) {
      const findCampground = async () => {
        try {
          const response = await axios.get(`/campgrounds/${_id}`);
          const data = await response.data;
          if (data.author._id !== currentUser?.user_id) {
            toast.error(
              'Oops! You do not have permission to edit this campground.'
            );
            navigate(`/campgrounds/${_id}`, {});
          }
          setValues(data);
        } catch (err: any) {
          toast.error(err.messsage);
          navigate(`/campgrounds`, {});
        }
      };
      findCampground();
    } else {
      resetForm();
    }
  }, [isCreate]);

  const state = {
    path: location.pathname,
  };

  return (
    <>
      {currentUser !== null ? (
        <div>
          <div className='col-4 offset-4 pb-4 pt-3'>
            <h2 className='text-center pt-3 pb-2 m-0'>
              {isCreate ? 'New Campground' : 'Edit Campground'}
            </h2>
            <form onSubmit={handleSubmit} encType='multipart/form-data'>
              <div className='mb-3'>
                <label htmlFor='title' className='form-label fw-medium'>
                  Title
                </label>
                <input
                  type='text'
                  className={`form-control ${
                    errors.title && touched.title && 'border border-danger'
                  }`}
                  id='title'
                  name='title'
                  value={values.title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.title && touched.title && (
                  <div className='text-danger'>{errors.title}</div>
                )}
                {allValid && <div className='text-success'>Looks good!</div>}
              </div>

              <div className='mb-3 row'>
                <div className='d-inline-block col-6'>
                  <label htmlFor='location' className='form-label fw-medium'>
                    Location
                  </label>
                  <input
                    type='text'
                    className={`form-control ${
                      errors.location &&
                      touched.location &&
                      'border border-danger'
                    }`}
                    id='location'
                    name='location'
                    value={values.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {errors.location && touched.location && (
                    <div className='text-danger'>{errors.location}</div>
                  )}
                  {allValid && <div className='text-success'>Looks good!</div>}
                </div>
                <div className='d-inline-block col-6'>
                  <label htmlFor='price' className='form-label fw-medium'>
                    Price
                  </label>
                  <div className='input-group'>
                    <span
                      className={`input-group-text bg-body-secondary ${
                        errors.price && touched.price && 'border border-danger'
                      }`}
                    >
                      $
                    </span>
                    <input
                      type='number'
                      className={`form-control ${
                        errors.price && touched.price && 'border border-danger'
                      }`}
                      id='price'
                      placeholder='0'
                      name='price'
                      value={values.price}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    />
                  </div>
                  {errors.price && touched.price && (
                    <div className='text-danger'>{errors.price}</div>
                  )}
                  {allValid && <div className='text-success'>Looks good!</div>}
                </div>
              </div>

              <div className='mb-3'>
                <input
                  type='file'
                  name='image'
                  id='image'
                  accept='.png, .jpg, .jpeg'
                  onChange={handleImageChange}
                />
                {/* <label htmlFor='image' className='form-label fw-medium'>
                  Image (Url)
                </label>
                <input
                  type='text'
                  className={`form-control ${
                    errors.image && touched.image && 'border border-danger'
                  }`}
                  id='image'
                  name='image'
                  value={values.image}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.image && touched.image && (
                  <div className='text-danger'>{errors.image}</div>
                )}
                {allValid && <div className='text-success'>Looks good!</div>} */}
              </div>

              <div className='mb-3'>
                <label htmlFor='description' className='form-label fw-medium'>
                  Description
                </label>
                <textarea
                  className={`form-control ${
                    errors.description &&
                    touched.description &&
                    'border border-danger'
                  }`}
                  id='description'
                  name='description'
                  rows={6}
                  value={values.description}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.description && touched.description && (
                  <div className='text-danger'>{errors.description}</div>
                )}
                {allValid && <div className='text-success'>Looks good!</div>}
              </div>

              {isCreate && (
                <button
                  type='submit'
                  className='btn btn-success w-100 py-2 fw-medium'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className='spinner-border spinner-border-sm'
                        role='status'
                        aria-hidden='true'
                      ></span>{' '}
                      Adding
                    </>
                  ) : (
                    'Add Campground'
                  )}
                </button>
              )}
              {!isCreate && (
                <button
                  type='submit'
                  className='btn btn-success w-100 py-2 fw-medium'
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span
                        className='spinner-border spinner-border-sm'
                        role='status'
                        aria-hidden='true'
                      ></span>{' '}
                      {''}
                      Saving
                    </>
                  ) : (
                    'Save'
                  )}
                </button>
              )}
            </form>
            {!isCreate && (
              <Link
                to={`/campgrounds/${_id}`}
                className='btn btn-secondary mt-2 w-100 py-2 fw-medium'
              >
                Cancel
              </Link>
            )}
            <div className='mt-3 text-center'>
              <Link to='/campgrounds' className='link-offset-2 fw-medium'>
                All Campgrounds
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to='/login' state={state} />
      )}
    </>
  );
}
