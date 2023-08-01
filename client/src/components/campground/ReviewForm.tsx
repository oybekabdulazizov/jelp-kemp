import { FormikProps } from 'formik';
import { Rating } from 'react-simple-star-rating';

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
  setFieldValue,
}: Props) {
  const onRatingClick = (e: any) => {
    setFieldValue('rating', e);
  };

  return (
    <>
      <h3 className='pb-2 m-0'>Leave a review</h3>
      <form onSubmit={handleSubmit} className='mb-3'>
        <div>
          <Rating
            style={{ marginBottom: '1em' }}
            tooltipStyle={{
              marginBottom: '1em',
              backgroundColor: 'white',
              color: 'black',
              border: '1px solid black',
            }}
            SVGstorkeWidth={0}
            transition
            showTooltip
            initialValue={values.rating}
            onClick={onRatingClick}
            tooltipDefaultText={'Please leave a rating'}
            tooltipArray={['Terrible', 'Bad', 'Average', 'Great', 'Amazing']}
            fillColor='#F5BD23'
          />
        </div>

        <div className='mb-3'>
          <label htmlFor='text' className='form-label fw-medium'>
            Feedback
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
          disabled={currentUser === null || values.rating === 0}
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
