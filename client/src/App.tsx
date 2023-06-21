import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Campgrounds from './components/campground';
import Details from './components/campground/Details';
import CampgroundForm from './components/campground/CampgroundForm';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';
import SignupForm from './components/user/SignupForm';
import LoginForm from './components/user/LoginForm';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  console.log(isLoggedIn);
  return (
    <>
      <NavBar />
      <div className='container my-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/campgrounds' element={<Campgrounds />} />
          <Route path='/campgrounds/new' element={<CampgroundForm />} />
          <Route path='/campgrounds/:_id/edit' element={<CampgroundForm />} />
          <Route path='/campgrounds/:_id' element={<Details />} />
          <Route
            path='/login'
            element={<LoginForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route
            path='/signup'
            element={<SignupForm setIsLoggedIn={setIsLoggedIn} />}
          />
          <Route path='/404-notfound' element={<PageNotFound />} />
          <Route
            path='/*'
            element={<Navigate to='/404-notfound' replace={true} />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
}
