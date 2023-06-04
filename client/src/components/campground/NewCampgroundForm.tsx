import axios from 'axios';
import { ChangeEvent, SyntheticEvent, useState } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

import { Campground_Type } from '../../shared/types';

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
  const navigate: NavigateFunction = useNavigate();

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    let value: number | string =
      name === 'price' ? parseInt(e.target.value) : e.target.value;

    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.post(
        'http://localhost:3001/campgrounds',
        formData,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );
      console.log(response);
    } catch (err) {
      console.log(err);
    }

    setFormData(initialState);
    navigate(`/campgrounds`);
  };

  return (
    <div className='h-100'>
      <div className='col-4 offset-4 py-2'>
        <h2 className='text-center py-4 m-0'>New Campground</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='title' className='form-label'>
              Title
            </label>
            <input
              type='text'
              className='form-control'
              id='title'
              name='title'
              value={formData.title}
              onChange={handleChange}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='location' className='form-label'>
              Location
            </label>
            <input
              type='text'
              className='form-control'
              id='location'
              name='location'
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='price' className='form-label'>
              Price
            </label>
            <div className='input-group'>
              <span className='input-group-text bg-body-secondary'>$</span>
              <input
                type='number'
                className='form-control'
                id='price'
                placeholder='0'
                name='price'
                value={formData.price}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='mb-3'>
            <label htmlFor='image' className='form-label'>
              Image (Url)
            </label>
            <input
              type='text'
              className='form-control'
              id='image'
              name='image'
              value={formData.image}
              onChange={handleChange}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='description' className='form-label'>
              Description
            </label>
            <textarea
              className='form-control'
              id='description'
              name='description'
              value={formData.description}
              onChange={handleChange}
            />
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
