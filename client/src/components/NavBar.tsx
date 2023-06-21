import axios from 'axios';
import { useEffect, useState } from 'react';
import {
  Link,
  Location,
  NavLink,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom';

// type Props = {
//   user: {} | null;
//   setUser: (user: {} | null) => void;
// };

export default function NavBar() {
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:3001/logout', {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      localStorage.removeItem('user-token');
      navigate('/login', {
        state: {
          status: 'success',
          message: response.data,
          path: location.pathname,
        },
      });
    } catch (err: any) {
      console.log(err);
    }
  };

  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
      <div className='container'>
        <Link to='/' className='navbar-brand text-light'>
          Jelp-Kemp
        </Link>
        <div className='collapse navbar-collapse w-auto' data-bs-theme='dark'>
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
          <div className='navbar-nav ms-auto'>
            {localStorage.getItem('user-token') ? (
              <button className='nav-link mx-2' onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <>
                <NavLink to='/login' end className='nav-link mx-2'>
                  Log in
                </NavLink>
                <NavLink
                  to='/signup'
                  end
                  className='nav-link mx-2 border border-secondary rounded'
                >
                  Sign up
                </NavLink>
              </>
            )}
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
            {localStorage.getItem('user-token') ? (
              <button className='dropdown-item' onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <>
                <NavLink to='/login' end className='dropdown-item'>
                  Log in
                </NavLink>
                <NavLink to='/signup' end className='dropdown-item'>
                  Sign up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
