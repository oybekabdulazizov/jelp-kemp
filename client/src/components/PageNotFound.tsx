import { Link } from 'react-router-dom';

export default function PageNotFound() {
  return (
    <div className='container my-5'>
      <div className='alert alert-danger m-0 w-50 mx-auto' role='alert'>
        <h4 className='alert-heading'>404 - Page Not Found!</h4>
        <hr />
        <p>
          Sorry, unable to find the page you are looking for. It might have been
          either modified or removed. Try going back to the previous page or go
          to <Link to='/'>Homepage</Link>.
        </p>
      </div>
    </div>
  );
}
