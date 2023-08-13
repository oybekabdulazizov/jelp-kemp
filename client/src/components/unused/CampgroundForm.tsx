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
import { Campground_Type, CurrentUser_Type } from '../../shared/types';

type Props = {
  currentUser: CurrentUser_Type | null;
};

export default function CampgroundForm({ currentUser }: Props) {
  const [allValid, setAllValid] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();
  const { _id } = useParams();
  const isCreate: boolean = !_id;
  const [campground, setCampground] = useState<Campground_Type>();
  const [images, setImages] = useState<{
    [x: number]: File;
    length?: number | undefined;
    item?: ((index: number) => File | null) | undefined;
    [Symbol.iterator]?: (() => IterableIterator<File>) | {};
  }>({});
  const [isDeletingImage, setIsDeletingImage] = useState<boolean>(false);

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

  const edit = async (values: any) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('location', values.location);
    formData.append('price', values.price);
    formData.append('description', values.description);
    formData.append('author', values.author._id);
    for (const key of Object.keys(images)) {
      formData.append('images', images[key as any]);
    }

    try {
      const { data } = await axios.put(`/campgrounds/${_id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    } catch (err: any) {
      toast.error(err.response.data);
      console.log(err.response.data);
    }
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const images = { ...e.target.files };
    setImages(images);
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
    resetForm,
    setValues,
    touched,
    values,
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
            navigate(`/campgrounds/${_id}`);
          }
          setValues(data);
          setCampground(data);
        } catch (err: any) {
          toast.error(err.messsage);
          navigate(`/campgrounds`, {});
        }
      };
      findCampground();
    } else {
      resetForm();
    }
  }, [isCreate, isDeletingImage]);

  const deleteImage = async (image_filename: string) => {
    setIsDeletingImage(true);
    const image = image_filename.replace('JelpKemp/', '');
    try {
      await axios.delete(`/campgrounds/${_id}/images/${image}`);
    } catch (err: any) {
      toast.error(err.message);
    }
    setIsDeletingImage(false);
  };

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
                <div>
                  {campground?.images.map((i) => (
                    <div
                      key={i.filename}
                      onClick={() => deleteImage(i.filename)}
                    >
                      <img
                        className='mb-1 w-100'
                        src={`${i.url}`}
                        alt={`${i.filename}`}
                      />
                    </div>
                  ))}
                </div>
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
