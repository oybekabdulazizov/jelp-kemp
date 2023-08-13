import { Link, NavLink } from 'react-router-dom';
import { CurrentUser_Type } from '../shared/types';
import { logOut } from '../common';

export default function Home({
  currentUser,
  setCurrentUser,
}: {
  currentUser: CurrentUser_Type | null;
  setCurrentUser: (user: CurrentUser_Type | null) => void;
}) {
  const handleLogout = async () => {
    await logOut();
    setCurrentUser(null);
  };
  return (
    <>
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
              {currentUser !== null ? (
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
              {currentUser !== null ? (
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
      <h1>Home</h1>
    </>
  );
}
