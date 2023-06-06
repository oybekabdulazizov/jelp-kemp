import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Link,
  NavigateFunction,
  useNavigate,
  useParams,
} from 'react-router-dom';
import { useFormik } from 'formik';

import { CampgroundSchema } from '../../shared/schemas';

export default function CampgroundForm() {
  const navigate: NavigateFunction = useNavigate();
  const [allValid, setAllValid] = useState<boolean>(false);
  const { _id } = useParams();
  const isCreate: boolean = !_id;

  const create = async (values: any) => {
    try {
      await axios.post('http://localhost:3001/campgrounds', values, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const edit = async (values: any) => {
    try {
      await axios.put(`http://localhost:3001/campgrounds/${_id}`, values, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  const onSubmit = async (values: any, actions: any) => {
    if (Object.keys(errors).length < 1) setAllValid(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (isCreate) {
      await create(values);
      actions.resetForm();
      navigate(`/campgrounds`);
    } else {
      await edit(values);
      actions.resetForm();
      navigate(`/campgrounds/${_id}`);
    }
  };

  const initialValues = {
    title: '',
    location: '',
    price: '',
    image: '',
    description: '',
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
          const response = await axios.get(
            `http://localhost:3001/campgrounds/${_id}`
          );
          const data = await response.data;
          setValues(data);
        } catch (err) {
          console.log(err);
        }
      };
      findCampground();
    } else {
      resetForm();
    }
  }, [isCreate]);

  return (
    <div>
      <div className='col-4 offset-4 pb-4 pt-3'>
        <h2 className='text-center pt-3 pb-2 m-0'>
          {isCreate ? 'New Campground' : 'Edit Campground'}
        </h2>
        <form onSubmit={handleSubmit}>
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
            <label htmlFor='image' className='form-label fw-medium'>
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
  );
}
