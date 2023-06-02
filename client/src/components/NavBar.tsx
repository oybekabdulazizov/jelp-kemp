export default function NavBar() {
  return (
    <nav className='navbar navbar-expand-lg navbar-dark bg-dark sticky-top'>
      <div className='container'>
        <a href='/' className='navbar-brand text-light'>
          Jelp-Kemp
        </a>
        <div className='collapse navbar-collapse' data-bs-theme='dark'>
          <div className='navbar-nav'>
            <a className='nav-link mx-2' href='/'>
              Home
            </a>
            <a className='nav-link mx-2' href='/campgrounds'>
              Campgrounds
            </a>
            <a className='nav-link mx-2' href='/campgrounds/new'>
              New Campground
            </a>
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
            <a className='dropdown-item' href='/'>
              Home
            </a>
            <a className='dropdown-item' href='/campgrounds'>
              Campgrounds
            </a>
            <a className='dropdown-item' href='/campgrounds/new'>
              New Campground
            </a>
            <hr className='dropdown-divider' />
            <a className='dropdown-item' href='/campgrounds/new'>
              Something
            </a>
            <a className='dropdown-item' href='/campgrounds/new'>
              Another thing
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
