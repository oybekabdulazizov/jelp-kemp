import { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

import { Campground_Type } from '../../shared/types';

export default function EditCampgroundForm() {
  const initialState: Campground_Type = {
    title: '',
    location: '',
    price: 0,
    image: '',
    description: '',
  };
  const [campgroundToBeEdited, setCamproundToBeEdited] = useState<{
    [x: string]: string | number;
  }>(initialState);
  const { _id } = useParams();

  useEffect(() => {
    const findCampground = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3001/campgrounds/${_id}`
        );
        const data = await response.data;
        if (data) setCamproundToBeEdited(data);
      } catch (err) {
        console.log(err);
      }
    };
    findCampground();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name } = e.target;
    let value: number | string =
      name === 'price' ? parseInt(e.target.value) : e.target.value;
    setCamproundToBeEdited((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: SyntheticEvent): Promise<void> => {
    e.preventDefault();

    try {
      const response = await axios.put(
        `http://localhost:3001/campgrounds/${_id}`,
        campgroundToBeEdited,
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

    setCamproundToBeEdited(initialState);
  };

  return (
    <div className='h-100'>
      <div className='col-4 offset-4 py-2'>
        <h2 className='text-center py-4 m-0'>Edit Campground</h2>
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
              value={campgroundToBeEdited.title}
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
              value={campgroundToBeEdited.location}
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
                value={campgroundToBeEdited.price}
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
              value={campgroundToBeEdited.image}
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
              value={campgroundToBeEdited.description}
              onChange={handleChange}
            />
          </div>

          <button type='submit' className='btn btn-success w-100 py-2 mb-2'>
            Save Campground
          </button>
          <Link
            to={`/campgrounds/${_id}`}
            className='btn btn-secondary w-100 py-2'
          >
            Cancel
          </Link>
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
