import { useEffect, useState } from 'react';
import axios from 'axios';
import { Navigate, Route, Routes } from 'react-router-dom';

import { Campground_Type } from './shared/types';
import NavBar from './components/NavBar';
import Campgrounds from './components/campground';
import Details from './components/campground/Details';
import NewCampgroundForm from './components/campground/NewCampgroundForm';
import EditCampgroundForm from './components/campground/EditCampgroundForm';
import Footer from './components/Footer';

export default function App() {
  const [campgroundsData, setCampgroundsData] = useState<Campground_Type[]>([]);

  useEffect(() => {
    const fetchCampgrounds = async () => {
      try {
        const response = await axios.get('http://localhost:3001/campgrounds');
        const data = await response.data;
        setCampgroundsData(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCampgrounds();
  }, []);

  return (
    <>
      <NavBar />
      <Routes>
        <Route
          path='/campgrounds'
          element={<Campgrounds campgroundsData={campgroundsData} />}
        />
        <Route path='/campgrounds/new' element={<NewCampgroundForm />} />
        <Route path='/campgrounds/:_id/edit' element={<EditCampgroundForm />} />
        <Route
          path='/campgrounds/:_id'
          element={<Details campgrounds={campgroundsData} />}
        />
        <Route path='/*' element={<Navigate to='/' replace={true} />} />
      </Routes>
      <Footer />
    </>
  );
}
