import { useState } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import axios from 'axios';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Campgrounds from './components/campground';
import Details from './components/campground/Details';
import CampgroundForm from './components/campground/CampgroundForm';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';
import SignupForm from './components/user/SignupForm';
import LoginForm from './components/user/LoginForm';
import { CurrentUser_Type } from './shared/types';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;

export default function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser_Type | null>(
    () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
  );

  return (
    <>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <div className='container my-4'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/campgrounds' element={<Campgrounds />} />
          <Route
            path='/campgrounds/new'
            element={<CampgroundForm currentUser={currentUser} />}
          />
          <Route
            path='/campgrounds/:_id/edit'
            element={<CampgroundForm currentUser={currentUser} />}
          />
          <Route path='/campgrounds/:_id' element={<Details />} />
          <Route
            path='/login'
            element={<LoginForm setCurrentUser={setCurrentUser} />}
          />
          <Route
            path='/signup'
            element={<SignupForm setCurrentUser={setCurrentUser} />}
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
