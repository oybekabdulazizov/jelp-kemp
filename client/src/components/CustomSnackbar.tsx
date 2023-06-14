import { Alert, IconButton, Snackbar } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Custom_Snackbar_Type } from '../shared/types';
import { Location } from 'react-router-dom';

type Props = {
  snackbarState: Custom_Snackbar_Type;
  location: Location;
  handleCloseSnackbar: () => void;
};

export default function CustomSnackbar({
  handleCloseSnackbar,
  location,
  snackbarState,
}: Props) {
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
