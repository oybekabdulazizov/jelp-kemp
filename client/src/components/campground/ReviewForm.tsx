import { FormikProps } from 'formik';

import { Review_Validation_Type_Yup } from '../../shared/types';

type Props = FormikProps<Review_Validation_Type_Yup> & {
  isValidReview: boolean;
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
}: Props) {
  return (
    <div className={`w-auto`}>
      <h2 className='pt-3 pb-2 m-0'>Leave a review</h2>
      <form onSubmit={handleSubmit}>
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
            value={values.text}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.text && touched.text && (
            <div className='text-danger'>{errors.text}</div>
          )}
          {isValidReview && <div className='text-success'>Looks good!</div>}
        </div>
        <button type='submit' className='btn btn-success py-2 fw-medium'>
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
    </div>
  );
}
