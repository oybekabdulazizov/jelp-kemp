import { useEffect, useState } from 'react';
import { Location } from 'react-router-dom';
import { Alert, IconButton, Slide, SlideProps, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { Custom_Snackbar_Type } from '../shared/types';

type Props = {
  location: Location;
};

const slideTransition = (props: SlideProps) => {
  return <Slide {...props} direction='left' />;
};

export default function CustomSnackbar({ location }: Props) {
  const [snackbarState, setSnackbarState] = useState<Custom_Snackbar_Type>({
    open: false,
    Transition: slideTransition,
  });

  useEffect(() => {
    if (location.state) {
      setSnackbarState({ ...snackbarState, open: true });
    }
  }, []);

  const handleCloseSnackbar = () => {
    setSnackbarState({ ...snackbarState, open: false });
    window.history.replaceState({}, document.title);
  };

  return (
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
  );
}
