import axios from 'axios';
import { useState } from 'react';
import {
  Link,
  Navigate,
  NavigateFunction,
  useNavigate,
} from 'react-router-dom';
import { useFormik } from 'formik';
import { toast } from 'react-hot-toast';

import { CampgroundSchema } from '../../shared/schemas';
import { CurrentUser_Type } from '../../shared/types';

type Props = {
  currentUser: CurrentUser_Type | null;
};

export default function CreateCampground({ currentUser }: Props) {
  const [allValid, setAllValid] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const [images, setImages] = useState<{
    [x: number]: File;
    length?: number | undefined;
    item?: ((index: number) => File | null) | undefined;
    [Symbol.iterator]?: (() => IterableIterator<File>) | {};
  }>({});

  const create = async (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('location', values.location);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('author', values.author);
    for (const key of Object.keys(images)) {
      formData.append('images', images[key as any]);
    }

    try {
      const { data } = await axios.post('/campgrounds', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (err: any) {
      if (err.response) {
        toast.error(err.response.data);
        console.log(err.response.data);
      }
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = { ...e.target.files };
    setImages(images);
  };

  const onSubmit = async (values: any, actions: any) => {
    if (Object.keys(errors).length < 1) setAllValid(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

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
  };

  const initialValues = {
    title: '',
    location: '',
    price: '',
    images: [],
    description: '',
    author: currentUser?.user_id,
  };

  const {
    errors,
    handleBlur,
    handleChange,
    handleSubmit,
    isSubmitting,
    touched,
    values,
  } = useFormik({
    initialValues,
    validationSchema: CampgroundSchema,
    onSubmit,
  });

  return (
    <>
      {currentUser !== null ? (
        <div>
          <div className='col-4 offset-4 my-2'>
            <h2 className='text-center mb-3'>New Campground</h2>
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

              <div className='mb-3'>
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
              <div className='mb-3'>
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

              <div className='mb-3'>
                <label className='form-label fw-medium' htmlFor='images'>
                  Image(s)
                </label>
                <div className='input-group mb-1'>
                  <input
                    type='file'
                    className='form-control'
                    id='images'
                    name='images'
                    accept='image/*'
                    multiple
                    onChange={handleImageChange}
                  />
                </div>
              </div>

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
            </form>
            <div className='mt-3 text-center'>
              <Link to='/campgrounds' className='link-offset-2 fw-medium'>
                All Campgrounds
              </Link>
            </div>
          </div>
        </div>
      ) : (
        <Navigate to='/login' />
      )}
    </>
  );
}
