import { Link } from 'react-router-dom';

import { NotFound_Type } from '../../shared/types';

export const NotFound = ({ status, message }: NotFound_Type) => {
  let item: string = '';
  if (message.toLowerCase().includes('campground')) item = 'campground';
  return (
    <div className='container my-5'>
      <div className='alert alert-danger m-0 w-50 mx-auto' role='alert'>
        <h4 className='alert-heading'>
          {status} - {message}
        </h4>
        <hr />
        <p>
          Uh oh, we can't seem to find the {item} you are looking for. It is
          possible that:
          <ul>
            <li>The link to this {item} may be incorrect or out-of-date.</li>
            <li>
              You may have bookmarked a {item} that has been moved or removed.
            </li>
          </ul>
        </p>
        <p>
          Please try going back to the previous page or go to{' '}
          <Link to='/'>Homepage</Link>.
        </p>
      </div>
    </div>
  );
};
