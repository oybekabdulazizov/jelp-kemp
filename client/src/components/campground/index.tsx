import { ComponentType, ReactElement, useEffect, useState } from 'react';
import axios from 'axios';

import Campground from './Campground';
import { Alert, IconButton, Slide, SlideProps, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Campground_Type } from '../../shared/types';
import { TransitionProps } from '@mui/material/transitions';
import { Location, useLocation } from 'react-router-dom';

const slideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='left' />;
};

export default function Campgrounds() {
  const [campgroundsData, setCampgroundsData] = useState<Campground_Type[]>([]);
  const [snackbarState, setSnackbarState] = useState<{
    open: boolean;
    Transition: ComponentType<
      TransitionProps & { children: ReactElement<any, any> }
    >;
  }>({
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
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        open={snackbarState.open}
        autoHideDuration={5000}
        key={snackbarState.Transition.name}
        TransitionComponent={snackbarState.Transition}
        onClose={handleCloseSnackbar}
      >
        <Alert
          severity={location.state?.status}
          className='d-flex align-items-center'
        >
          {location.state?.message}{' '}
          <IconButton
            aria-label='close'
            color='inherit'
            size='small'
            onClick={handleCloseSnackbar}
          >
            <CloseIcon />
          </IconButton>
        </Alert>
      </Snackbar>
      <h2 className='w-75 mx-auto mb-3'>All Campgrounds</h2>
      {campgroundsData.map((campground) => (
        <Campground {...campground} key={campground._id} />
      ))}
    </div>
  );
}
