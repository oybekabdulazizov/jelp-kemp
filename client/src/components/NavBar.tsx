import { Link, NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
      <div className='container'>
        <Link to='/' className='navbar-brand text-light'>
          Jelp-Kemp
        </Link>
        <div className='collapse navbar-collapse' data-bs-theme='dark'>
          <div className='navbar-nav'>
            <NavLink to='/' end className='nav-link mx-2'>
              Home
            </NavLink>
            <NavLink to='/campgrounds' end className='nav-link mx-2'>
              Campgrounds
            </NavLink>
            <NavLink to='/campgrounds/new' end className='nav-link mx-2'>
              New Campground
            </NavLink>
          </div>
        </div>
        <div className='dropstart' data-bs-theme='dark'>
          <button
            className='navbar-toggler'
            role='button'
            data-bs-toggle='dropdown'
            aria-expanded='false'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='dropdown-menu d-lg-none'>
            <NavLink to='/' end className='dropdown-item'>
              Home
            </NavLink>
            <NavLink to='/campgrounds' end className='dropdown-item'>
              Campgrounds
            </NavLink>
            <NavLink to='/campgrounds/new' end className='dropdown-item'>
              New Campground
            </NavLink>
            <hr className='dropdown-divider' />
            <NavLink to='/something' end className='dropdown-item'>
              Something
            </NavLink>
            <NavLink to='/another-thing' end className='dropdown-item'>
              Another thing
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
