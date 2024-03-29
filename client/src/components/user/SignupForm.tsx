import { useState } from 'react';
import {
  Link,
  NavigateFunction,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { useFormik } from 'formik';
import axios from 'axios';
import { toast } from 'react-hot-toast';

import { SignupSchema } from '../../shared/schemas';
import { CurrentUser_Type } from '../../shared/types';
import login_image from '../../assets/login_image.jpg';

type Props = {
  setCurrentUser: (currentUser: CurrentUser_Type | null) => void;
};

export default function SignupForm({ setCurrentUser }: Props) {
  const [allValid, setAllValid] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();
  const location = useLocation();

  const onSubmit = async (values: any, actions: any) => {
    if (Object.keys(errors).length < 1) setAllValid(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const { data } = await axios.post(`/register`, values);
      if (data.error) {
        setAllValid(false);
        toast.error(data.error);
        return;
      } else {
        const user = JSON.stringify(data);
        localStorage.removeItem('user');
        localStorage.setItem('user', user);
        setCurrentUser(data);
        toast.success('Welcome to Jelp-Kemp🙌');
        navigate('/');
        return;
      }
    } catch (err: any) {
      setAllValid(false);
      if (err.response) {
        if (err.response.data) toast.error(err.response.data);
      }
      if (err.message) {
        toast.error(err.message);
      }
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
      email: '',
      username: '',
      password: '',
    },
    validationSchema: SignupSchema,
    onSubmit,
  });

  return (
    <div className='h-100 d-flex align-items-center'>
      <div className='col-10 offset-1 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4'>
        <div className='card shadow'>
          <div className='card-body'>
            <img
              src={login_image}
              alt='camping-image-login-page'
              className='card-image-top w-100'
            />
            <h2 className='text-center my-2'>Sign up</h2>
            <form onSubmit={handleSubmit}>
              <div className='mb-3'>
                <label htmlFor='email' className='form-label fw-medium'>
                  Email address
                </label>
                <input
                  type='email'
                  className={`form-control ${
                    errors.email && touched.email && 'border border-danger'
                  }`}
                  id='email'
                  name='email'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.email && touched.email && (
                  <div className='text-danger'>{errors.email}</div>
                )}
                {allValid && <div className='text-success'>Looks good!</div>}
              </div>

              <div className='mb-3'>
                <label htmlFor='username' className='form-label fw-medium'>
                  Username
                </label>
                <input
                  type='text'
                  className={`form-control ${
                    errors.username &&
                    touched.username &&
                    'border border-danger'
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
                    errors.password &&
                    touched.password &&
                    'border border-danger'
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
                    Signing you up...
                  </>
                ) : (
                  'Sign up'
                )}
              </button>
            </form>
            <div className='mt-3 text-center'>
              Already have an account?{' '}
              <Link
                to='/login'
                state={{ from: location.pathname }}
                className='link-offset-2 fw-medium'
              >
                Log in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
