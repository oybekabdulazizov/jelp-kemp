import { Navigate, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Campgrounds from './components/campground';
import Details from './components/campground/Details';
import CampgroundForm from './components/campground/CampgroundForm';
import PageNotFound from './components/PageNotFound';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/campgrounds' element={<Campgrounds />} />
        <Route path='/campgrounds/new' element={<CampgroundForm />} />
        <Route path='/campgrounds/:_id/edit' element={<CampgroundForm />} />
        <Route path='/campgrounds/:_id' element={<Details />} />
        <Route path='/404-notfound' element={<PageNotFound message='' />} />
        <Route
          path='/*'
          element={<Navigate to='/404-notfound' replace={true} />}
        />
      </Routes>
      <Footer />
    </>
  );
}
