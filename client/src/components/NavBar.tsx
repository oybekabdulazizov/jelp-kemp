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
            <NavLink to='/' className='nav-link mx-2'>
              Home
            </NavLink>
            <NavLink to='/campgrounds' className='nav-link mx-2'>
              Campgrounds
            </NavLink>
            <NavLink to='/campgrounds/new' className='nav-link mx-2'>
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
            <NavLink to='/' className='dropdown-item'>
              Home
            </NavLink>
            <NavLink to='/campgrounds' className='dropdown-item'>
              Campgrounds
            </NavLink>
            <NavLink to='/campgrounds/new' className='dropdown-item'>
              New Campground
            </NavLink>
            <hr className='dropdown-divider' />
            <NavLink to='/something' className='dropdown-item'>
              Something
            </NavLink>
            <NavLink to='/another-thing' className='dropdown-item'>
              Another thing
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
}
