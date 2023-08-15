import { Link, NavLink, useLocation } from 'react-router-dom';

import { CurrentUser_Type } from '../shared/types';
import { logOut } from '../common';
import '../styles/navbar.css';

type Props = {
  currentUser: CurrentUser_Type | null;
  setCurrentUser: (currentUser: CurrentUser_Type | null) => void;
};

export default function NavBar({ currentUser, setCurrentUser }: Props) {
  const handleLogout = async () => {
    await logOut();
    setCurrentUser(null);
  };
  const location = useLocation();

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
            {currentUser !== null ? (
              <button className='nav-link mx-2' onClick={handleLogout}>
                Log out
              </button>
            ) : (
              <>
                <NavLink
                  to='/login'
                  state={{ from: location.pathname }}
                  end
                  className='nav-link mx-2'
                >
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
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='offcanvas'
          data-bs-target='#offcanvasWithBothOptions'
          aria-controls='offcanvasWithBothOptions'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='offcanvas offcanvas-end d-lg-none w-50 bg-dark'
          data-bs-scroll='true'
          tabIndex={-2}
          id='offcanvasWithBothOptions'
          aria-labelledby='offcanvasWithBothOptionsLabel'
        >
          <div className='offcanvas-header'>
            <button
              type='button'
              className='btn-close btn-close-white'
              data-bs-dismiss='offcanvas'
              aria-label='Close'
            ></button>
          </div>
          <div className='offcanvas-body text-secondary'>
            <div className='d-flex flex-column m-2'>
              <NavLink
                to='/'
                end
                className='nav-link navlink d-inline mb-2 fs-5'
              >
                Home
              </NavLink>
              <NavLink
                to='/campgrounds'
                end
                className='nav-link navlink d-inline mb-2 fs-5'
              >
                Campgrounds
              </NavLink>
              <NavLink
                to='/campgrounds/new'
                end
                className='nav-link navlink mb-3 fs-5'
              >
                New Campground
              </NavLink>
              <hr className='m-0 mb-3' />
              {currentUser !== null ? (
                <div
                  className='nav-link navlink mb-2 fs-5'
                  onClick={handleLogout}
                >
                  Log out
                </div>
              ) : (
                <>
                  <NavLink
                    to='/login'
                    end
                    className='nav-link navlink mb-2 fs-5'
                  >
                    Log in
                  </NavLink>
                  <NavLink
                    to='/signup'
                    end
                    className='nav-link navlink mb-2 fs-5'
                  >
                    Sign up
                  </NavLink>
                </>
              )}
            </div>
          </div>
        </div>

        {/* <div className='dropdown-menu d-lg-none'>
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
        </div> */}
      </div>
    </nav>
  );
}
