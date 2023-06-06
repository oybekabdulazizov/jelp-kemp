import { Navigate, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Campgrounds from './components/campground';
import Details from './components/campground/Details';
import Footer from './components/Footer';
import CampgroundForm from './components/campground/CampgroundForm';

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/campgrounds' element={<Campgrounds />} />
        <Route path='/campgrounds/new' element={<CampgroundForm />} />
        <Route path='/campgrounds/:_id/edit' element={<CampgroundForm />} />
        <Route path='/campgrounds/:_id' element={<Details />} />
        <Route path='/*' element={<Navigate to='/' replace={true} />} />
      </Routes>
      <Footer />
    </>
  );
}
