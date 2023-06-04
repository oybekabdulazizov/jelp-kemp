import { Link } from 'react-router-dom';

import { Campground_Type } from '../../shared/types';
import useResize from '../../hooks/useResize';

type Props = Campground_Type;

export default function Campground({
  _id,
  title,
  description,
  price,
  image,
  location,
}: Props) {
  const { width } = useResize();

  return (
    <div className='container'>
      <div className={`card mb-3 ${width >= 992 ? 'w-75' : 'w-100'} mx-auto`}>
        <div className='row g-0'>
          <div className='col-md-4'>
            <img
              src={`${image}`}
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
                  <h5 className='card-title d-inline'>{title}</h5> &nbsp;
                  <span className='f5-text'>{location}</span>
                </Link>
              </div>
              <p className='card-text text-truncate'>{description}</p>
              <p className='card-text'>${price}</p>
              <Link
                to={`/campgrounds/${_id}`}
                className='mt-auto link-offset-2'
              >
                See more
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
