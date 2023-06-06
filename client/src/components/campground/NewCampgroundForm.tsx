import axios from 'axios';
import { useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';

import { CampgroundSchema } from '../../shared/schemas';

export default function NewCampgroundForm() {
  const navigate: NavigateFunction = useNavigate();
  const [allValid, setAllValid] = useState<boolean>(false);

  const onSubmit = async (values: any, actions: any) => {
    if (Object.keys(errors).length < 1) setAllValid(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    try {
      await axios.post('http://localhost:3001/campgrounds', values, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      actions.resetForm();
      navigate(`/campgrounds`);
    } catch (err: any) {
      console.log(err);
    }
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
    initialValues: {
      title: '',
      location: '',
      price: '',
      image: '',
      description: '',
    },
    validationSchema: CampgroundSchema,
    onSubmit,
  });

  return (
    <div className='vh-100'>
      <div className='col-4 offset-4 py-2'>
        <h2 className='text-center py-4 m-0'>New Campground</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
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
            <label htmlFor='location' className='form-label'>
              Location
            </label>
            <input
              type='text'
              className={`form-control ${
                errors.location && touched.location && 'border border-danger'
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
            <label htmlFor='price' className='form-label'>
              Price
            </label>
            <div className='input-group'>
              <span className='input-group-text bg-body-secondary'>$</span>
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
            <label htmlFor='image' className='form-label'>
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
            {allValid && <div className='text-success'>Looks good!</div>}
          </div>

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
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
              value={values.description}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <div className='text-danger'>{errors.description}</div>
            )}
            {allValid && <div className='text-success'>Looks good!</div>}
          </div>

          <button
            type='submit'
            className='btn btn-success w-100 py-2'
            disabled={isSubmitting}
          >
            Add Campground
          </button>
        </form>
        <div className='mt-3 text-center'>
          <Link to='/campgrounds' className='link-offset-2'>
            All Campgrounds
          </Link>
        </div>
      </div>
    </div>
  );
}
