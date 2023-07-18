import { FormikProps } from 'formik';

import {
  CurrentUser_Type,
  Review_Validation_Type_Yup,
} from '../../shared/types';

type Props = FormikProps<Review_Validation_Type_Yup> & {
  isValidReview: boolean;
  currentUser: CurrentUser_Type | null;
};

export default function ReviewForm({
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  isSubmitting,
  touched,
  values,
  isValidReview,
  currentUser,
}: Props) {
  return (
    <>
      <h3 className='pb-2 m-0'>Leave a review</h3>
      <form onSubmit={handleSubmit} className='mb-3'>
        <div className='mb-3'>
          <label htmlFor='rating' className='form-label fw-medium'>
            Rating
          </label>
          <input
            type='range'
            className='form-range'
            name='rating'
            min={1}
            value={values.rating}
            max={5}
            id='rating'
            onChange={handleChange}
            disabled={currentUser === null}
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='text' className='form-label fw-medium'>
            Review
          </label>
          <textarea
            className={`form-control ${
              errors.text && touched.text && 'border border-danger'
            }`}
            id='text'
            name='text'
            rows={4}
            disabled={currentUser === null}
            placeholder={
              currentUser === null ? 'Please log in to leave a review.' : ''
            }
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.text && touched.text && (
            <div className='text-danger'>{errors.text}</div>
          )}
          {isValidReview && <div className='text-success'>Looks good!</div>}
        </div>
        <button
          type='submit'
          className='btn btn-success py-2 fw-medium'
          disabled={currentUser === null}
        >
          {isSubmitting ? (
            <>
              <span
                className='spinner-border spinner-border-sm'
                role='status'
                aria-hidden='true'
              ></span>{' '}
              Submitting
            </>
          ) : (
            'Submit'
          )}
        </button>
      </form>
    </>
  );
}
