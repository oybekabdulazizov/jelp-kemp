import { Link } from 'react-router-dom';

import { Campground_Type } from '../../shared/types';
import campground_placeholder from '../../assets/campground_placeholder.png';

type Props = Campground_Type;

export default function Campground({
  _id,
  title,
  description,
  price,
  images,
  location,
}: Props) {
  return (
    <div className='card mb-3 col-lg-10 offset-lg-1'>
      <div className='row g-0'>
        <div className='col-md-4'>
          <img
            src={
              images.length > 0 ? `${images[0].url}` : campground_placeholder
            }
            className='img-fluid rounded-start mask'
            alt={title}
          />
        </div>
        <div className='col-md-8 h-auto'>
          <div className='card-body h-100 d-flex flex-column'>
            <div className='mb-2'>
              <Link
                to={`/campgrounds/${_id}`}
                className='link-dark link-offset-2'
              >
                <h5 className='card-title d-sm-inline'>{title}</h5>{' '}
                <span className='f5-text'>{location}</span>
              </Link>
            </div>
            <p className='card-text text-truncate d-none d-lg-block'>
              {description}
            </p>
            <p className='card-text'>${price}</p>
            <Link to={`/campgrounds/${_id}`} className='mt-auto link-offset-2'>
              See more
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
