import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import {
  NavigateFunction,
  Location,
  useLocation,
  useNavigate,
  Link,
} from 'react-router-dom';

import CustomSnackbar from '../CustomSnackbar';
import { LoginSchema } from '../../shared/schemas';

// type Props = {
//   setUser: (user: {} | null) => void;
// };

export default function LoginForm() {
  const [allValid, setAllValid] = useState<boolean>(false);
  const [error, setError] = useState<boolean>();
  const navigate: NavigateFunction = useNavigate();
  const location: Location = useLocation();

  const onSubmit = async (values: any, actions: any) => {
    if (Object.keys(errors).length < 1) setAllValid(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setError(false);

    try {
      const response = await axios.post(`http://localhost:3001/login`, values, {
        withCredentials: true,
      });
      // const userToken = JSON.stringify(response.data);
      // localStorage.clear();
      // localStorage.setItem('user-token', userToken);
      // setUser(userToken);
      // const pathTo: string = (location.state?.path as string) || '/';
      console.log(response);
      navigate('/', {
        state: {
          status: 'success',
          message: 'Welcome back🥳',
        },
      });
    } catch (err: any) {
      setAllValid(false);
      setError(true);
      navigate('/login', {
        state: {
          status: 'error',
          message: err.message,
        },
      });
    }
    actions.resetForm();
  };

  const {
    values,
    errors,
    isSubmitting,
    handleSubmit,
    handleChange,
    handleBlur,
    touched,
  } = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

  return (
    <div>
      <div className='col-4 offset-4 pb-4 pt-3'>
        {error && <CustomSnackbar location={location} />}
        <h2 className='text-center pt-3 pb-2 m-0'>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor='username' className='form-label fw-medium'>
              Username
            </label>
            <input
              type='text'
              className={`form-control ${
                errors.username && touched.username && 'border border-danger'
              }`}
              id='username'
              name='username'
              value={values.username}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.username && touched.username && (
              <div className='text-danger'>{errors.username}</div>
            )}
            {allValid && <div className='text-success'>Looks good!</div>}
          </div>

          <div className='mb-3'>
            <label htmlFor='password' className='form-label fw-medium'>
              Password
            </label>
            <input
              type='password'
              className={`form-control ${
                errors.password && touched.password && 'border border-danger'
              }`}
              id='password'
              name='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.password && touched.password && (
              <div className='text-danger'>{errors.password}</div>
            )}
            {allValid && <div className='text-success'>Looks good!</div>}
          </div>

          <button
            type='submit'
            className='btn btn-success w-100 py-2 fw-medium'
          >
            {isSubmitting ? (
              <>
                <span
                  className='spinner-border spinner-border-sm'
                  role='status'
                  aria-hidden='true'
                ></span>{' '}
                {''}
                Logging in...
              </>
            ) : (
              'Log in'
            )}
          </button>
        </form>
        <div className='mt-3 text-center'>
          Don't have an account yet?{' '}
          <Link to='/signup' className='link-offset-2 fw-medium'>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
