import { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import { NavigateFunction, useNavigate, Link } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import { LoginSchema } from '../../shared/schemas';
import { CurrentUser_Type } from '../../shared/types';

type Props = {
  setCurrentUser: (currentUser: CurrentUser_Type | null) => void;
};

export default function LoginForm({ setCurrentUser }: Props) {
  const [allValid, setAllValid] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const onSubmit = async (values: any, actions: any) => {
    if (Object.keys(errors).length < 1) setAllValid(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    try {
      const { data } = await axios.post(`/login`, values);
      if (data.error) {
        setAllValid(false);
        toast.error(data.error);
        return;
      } else {
        const user = JSON.stringify(data);
        localStorage.removeItem('user');
        localStorage.setItem('user', user);
        setCurrentUser(data);
        toast.success(`Welcome back, ${data.username}🥳`);
        navigate(-1 as any);
        return;
      }
    } catch (err: any) {
      setAllValid(false);
      toast.error(err.message);
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
