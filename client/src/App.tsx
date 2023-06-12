import { Navigate, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Home from './components/Home';
import Campgrounds from './components/campground';
import Details from './components/campground/Details';
import CampgroundForm from './components/campground/CampgroundForm';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';

export default function App() {
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
