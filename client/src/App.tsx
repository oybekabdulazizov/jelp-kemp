import { useState } from 'react';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Campgrounds from './components/campground';
import Details from './components/campground/Details';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';
import SignupForm from './components/user/SignupForm';
import LoginForm from './components/user/LoginForm';
import { CurrentUser_Type } from './shared/types';
import EditCampground from './components/campground/EditCampground';
import CreateCampground from './components/campground/CreateCampground';

axios.defaults.baseURL = 'http://localhost:3001';
axios.defaults.withCredentials = true;

const Layout = ({
  currentUser,
  setCurrentUser,
}: {
  currentUser: CurrentUser_Type | null;
  setCurrentUser: (user: CurrentUser_Type | null) => void;
}) => {
  return (
    <div className='d-flex flex-column w-100'>
      <NavBar currentUser={currentUser} setCurrentUser={setCurrentUser} />
      <Toaster
        containerStyle={{ marginTop: '3em' }}
        position='top-right'
        gutter={8}
        toastOptions={{ duration: 3000 }}
      />
      <div className='container my-3'>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default function App() {
  const [currentUser, setCurrentUser] = useState<CurrentUser_Type | null>(
    () => {
      const user = localStorage.getItem('user');
      return user ? JSON.parse(user) : null;
    }
  );

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <Home currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        />
        <Route
          element={
            <Layout currentUser={currentUser} setCurrentUser={setCurrentUser} />
          }
        >
          <Route path='/campgrounds' element={<Campgrounds />} />
          <Route
            path='/campgrounds/new'
            element={<CreateCampground currentUser={currentUser} />}
          />
          <Route
            path='/campgrounds/:_id/edit'
            element={<EditCampground currentUser={currentUser} />}
          />
          <Route
            path='/campgrounds/:_id'
            element={<Details currentUser={currentUser} />}
          />
          <Route
            path='/login'
            element={<LoginForm setCurrentUser={setCurrentUser} />}
          />
          <Route
            path='/signup'
            element={<SignupForm setCurrentUser={setCurrentUser} />}
          />
        </Route>
        <Route path='/404-notfound' element={<PageNotFound />} />
        <Route
          path='/*'
          element={<Navigate to='/404-notfound' replace={true} />}
        />
      </Routes>
    </>
  );
}
