import { useEffect, useState } from 'react';
import axios from 'axios';

import Campground from './Campground';
import { Slide, SlideProps } from '@mui/material';

import { Campground_Type, Custom_Snackbar_Type } from '../../shared/types';
import { Location, useLocation } from 'react-router-dom';
import CustomSnackbar from '../CustomSnackbar';

const slideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='left' />;
};

export default function Campgrounds() {
  const [campgroundsData, setCampgroundsData] = useState<Campground_Type[]>([]);
  const [snackbarState, setSnackbarState] = useState<Custom_Snackbar_Type>({
    open: false,
    Transition: slideTransition,
  });
  const location: Location = useLocation();

  useEffect(() => {
    if (location.state) {
      setSnackbarState({ ...snackbarState, open: true });
    }
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

  const handleCloseSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
    window.history.replaceState({}, document.title);
  };

  return (
    <div className='container mt-4'>
      <CustomSnackbar
        snackbarState={snackbarState}
        handleCloseSnackbar={handleCloseSnackbar}
        location={location}
      />
      <h2 className='w-75 mx-auto mb-3'>All Campgrounds</h2>
      {campgroundsData.map((campground) => (
        <Campground {...campground} key={campground._id} />
      ))}
    </div>
  );
}
