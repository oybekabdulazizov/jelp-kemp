import { Navigate, Route, Routes } from 'react-router-dom';

import NavBar from './components/NavBar';
import Campgrounds from './components/campground';
import Details from './components/campground/Details';
import NewCampgroundForm from './components/campground/NewCampgroundForm';
import EditCampgroundForm from './components/campground/EditCampgroundForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path='/campgrounds' element={<Campgrounds />} />
        <Route path='/campgrounds/new' element={<NewCampgroundForm />} />
        <Route path='/campgrounds/:_id/edit' element={<EditCampgroundForm />} />
        <Route path='/campgrounds/:_id' element={<Details />} />
        <Route path='/*' element={<Navigate to='/' replace={true} />} />
      </Routes>
      <Footer />
    </>
  );
}
