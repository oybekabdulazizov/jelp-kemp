import axios from 'axios';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

import { Campground_Type, Validation_Type } from '../../shared/types';
import { CampgroundSchema } from '../../shared/schemas';

export default function NewCampgroundForm() {
  const initialState: Campground_Type = {
    title: '',
    location: '',
    price: 0,
    image: '',
    description: '',
  };
  const [formData, setFormData] = useState<{
    [x: string]: string | number;
  }>(initialState);
  const [validationMessages, setValidationMessages] = useState<Validation_Type>(
    {
      title: 'initial',
      location: 'initial',
      image: 'initial',
      description: 'initial',
      price: 'initial',
    }
  );

  const navigate: NavigateFunction = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    let value: number | string =
      name === 'price' ? parseInt(e.target.value) : e.target.value;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
    setTimeout(() => {
      setValidationMessages((prevState) => ({
        ...prevState,
        [name]: value ? true : false,
      }));
    }, 1000);
  };

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    const isValid: boolean = await CampgroundSchema.isValid(formData, {
      abortEarly: false,
    });

    if (isValid) {
      setValidationMessages({
        title: true,
        description: true,
        location: true,
        price: true,
        image: true,
      });
      try {
        await axios.post('http://localhost:3001/campgrounds', formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        });
        setTimeout(() => {
          setFormData(initialState);
          navigate(`/campgrounds`);
          return;
        }, 1000);
      } catch (err: any) {
        console.log(err);
      }
    } else {
      setValidationMessages({
        title: true,
        description: true,
        location: true,
        price: true,
        image: true,
      });
      let schemaValidationResponse = await CampgroundSchema.validate(formData, {
        abortEarly: false,
      }).catch((err) => {
        return err.inner.reduce((acc: any, error: any) => {
          return {
            ...acc,
            [error.path]: error.message,
          };
        }, {});
      });
      setValidationMessages((prevState) => ({
        ...prevState,
        ...schemaValidationResponse,
      }));
    }
  };

  return (
    <div className='vh-100'>
      <div className='col-4 offset-4 py-2'>
        <h2 className='text-center py-4 m-0'>New Campground</h2>
        <form className={'needs-validation'} onSubmit={handleSubmit} noValidate>
          <div className='mb-3 has-validation'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className={`form-control ${
                validationMessages.title !== 'initial' &&
                validationMessages.title !== true &&
                'border border-danger'
              }`}
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
              required
            />
            {validationMessages.title === true && (
              <div className='text-success'>Looks good!</div>
            )}
            {validationMessages.title !== true &&
              validationMessages.title !== 'initial' && (
                <div className='text-danger'>{validationMessages.title}</div>
              )}
          </div>

          <div className='mb-3'>
            <label htmlFor='location' className='form-label'>
              Location
            </label>
            <input
              type='text'
              className={`form-control ${
                validationMessages.location !== 'initial' &&
                validationMessages.location !== true &&
                'border border-danger'
              }`}
              id='location'
              name='location'
              value={formData.location}
              onChange={handleChange}
              required
            />
            {validationMessages.location === true && (
              <div className='text-success'>Looks good!</div>
            )}
            {validationMessages.location !== true &&
              validationMessages.location !== 'initial' && (
                <div className='text-danger'>{validationMessages.location}</div>
              )}
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
                  validationMessages.price !== 'initial' &&
                  validationMessages.price !== true &&
                  'border border-danger'
                }`}
                id='price'
                placeholder='0'
                name='price'
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            {validationMessages.price === true && (
              <div className='text-success'>Looks good!</div>
            )}
            {validationMessages.price !== true &&
              validationMessages.price !== 'initial' && (
                <div className='text-danger'>{validationMessages.price}</div>
              )}
          </div>

          <div className='mb-3'>
            <label htmlFor='image' className='form-label'>
              Image (Url)
            </label>
            <input
              type='text'
              className={`form-control ${
                validationMessages.image !== 'initial' &&
                validationMessages.image !== true &&
                'border border-danger'
              }`}
              id='image'
              name='image'
              value={formData.image}
              onChange={handleChange}
            />
            {validationMessages.image === true && (
              <div className='text-success'>Looks good!</div>
            )}
            {validationMessages.image !== true &&
              validationMessages.image !== 'initial' && (
                <div className='text-danger'>{validationMessages.image}</div>
              )}
          </div>

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <textarea
              className={`form-control ${
                validationMessages.description !== 'initial' &&
                validationMessages.description !== true &&
                'border border-danger'
              }`}
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
              required
            />
            {validationMessages.description === true && (
              <div className='text-success'>Looks good!</div>
            )}
            {validationMessages.description !== true &&
              validationMessages.description !== 'initial' && (
                <div className='text-danger'>
                  {validationMessages.description}
                </div>
              )}
          </div>

          <button type='submit' className='btn btn-success w-100 py-2'>
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
