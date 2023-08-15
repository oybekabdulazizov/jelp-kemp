import { Link, NavLink } from 'react-router-dom';

import { CurrentUser_Type } from '../shared/types';
import { logOut } from '../shared/common';
import '../styles/home.css';

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
    <section className='body d-flex flex-column vh-100 w-100 text-white'>
      <header className='home-header mx-auto p-3 container'>
        <div className='d-flex justify-content-between'>
          <h3 className='mb-0'>JelpKemp</h3>
          <nav className='navbar-nav d-none d-md-flex flex-row'>
            <NavLink to='/' end className='nav-link home-nav-link'>
              Home
            </NavLink>
            <NavLink to='/campgrounds' end className='nav-link home-nav-link'>
              Campgrounds
            </NavLink>
            <NavLink
              to='/campgrounds/new'
              end
              className='nav-link home-nav-link'
            >
              New Campground
            </NavLink>
            <div className='d-flex flex-row ms-5'>
              {currentUser ? (
                <div
                  className='nav-link home-nav-link log-out'
                  onClick={handleLogout}
                >
                  Log out
                </div>
              ) : (
                <>
                  <NavLink to='/login' end className='nav-link home-nav-link'>
                    Log in
                  </NavLink>
                  <span className='nav-link home-nav-link'>/</span>
                  <NavLink to='/signup' end className='nav-link home-nav-link'>
                    Sign up
                  </NavLink>
                </>
              )}
            </div>
          </nav>
          <button
            className='navbar-toggler home-navbar-toggler d-md-none d-flex flex-column border px-2 pb-2 rounded'
            type='button'
            data-bs-toggle='offcanvas'
            data-bs-target='#offcanvas'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle offcanvas'
          >
            <span className='m-0 p-0 mt-2'></span>
            <span className='m-0 p-0 mt-2'></span>
            <span className='m-0 p-0 mt-2'></span>
          </button>

          <div
            className='offcanvas home-offcanvas offcanvas-end d-md-none w-50'
            tabIndex={-1}
            id='offcanvas'
            aria-labelledby='offcanvasLabel'
          >
            <div className='offcanvas-header'>
              <button
                type='button'
                className='btn-close btn-close-white'
                data-bs-dismiss='offcanvas'
                aria-label='Close'
                aria-controls='offcanvas'
              ></button>
            </div>
            <div className='offcanvas-body text-secondary'>
              <div className='d-flex flex-column m-2'>
                <NavLink to='/' end className='nav-link navlink mb-2 fs-5'>
                  Home
                </NavLink>
                <NavLink
                  to='/campgrounds'
                  end
                  className='nav-link navlink mb-2 fs-5'
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
        </div>
      </header>

      <main className='home-main text-center d-flex flex-column justify-content-center align-items-center'>
        <h1>JelpKemp</h1>
        <p className='lead'>
          Welcome to JelpKemp!
          <br />
          Jump right in and explore our many campgrounds.
          <br />
          Feel free to share some of your own and leave reviews on others!
        </p>
        <Link to='/campgrounds' className='btn btn-lg fw-bold border-white'>
          Take me to Campgrounds
        </Link>
      </main>

      <footer className='footer mt-auto py-3 home-footer'>
        <div className='container'>
          <span className='text-secondary fs-5 text-secondary'>
            &copy;Jelp-Kemp 2023
          </span>
        </div>
      </footer>
    </section>
  );
}
