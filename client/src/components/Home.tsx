import { Location, useLocation } from 'react-router-dom';

import CustomSnackbar from './CustomSnackbar';

export default function Home() {
  const location: Location = useLocation();

  return (
    <div className='h-100 d-flex align-items-center justify-content-center'>
      <CustomSnackbar location={location} />
      <h1 className='m-0'>Home</h1>
    </div>
  );
}
