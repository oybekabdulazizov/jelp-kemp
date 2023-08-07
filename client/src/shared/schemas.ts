import { number, object, string } from 'yup';

export const CampgroundSchema = object({
  title: string()
    .trim()
    .max(100, 'Title length cannot exceed 200 characters.')
    .required('Please choose a title.'),
  description: string()
    .trim()
    .max(1000, 'Description length cannot exceed 1000 characters.')
    .required('Please add a description.'),
  price: number()
    .min(0, 'Please enter a valid price.')
    .max(1000, 'Price cannot exceed $1000.')
    .required('Please add a price.'),
  // image: string()
  //   .trim()
  //   .url('Please provide a valid Url.')
  //   .max(250, 'Url is too long.')
  //   .required('Please add an image.'),
  location: string()
    .trim()
    .max(100, 'Location length cannot exceed 100 characters.')
    .required('Please provide a location.'),
});

export const ReviewSchema = object({
  rating: number()
    .min(0, 'Rating cannot be below 1.')
    .max(5, 'Rating cannot be higher than 5.')
    .required('Please add a rating.'),
  text: string()
    .trim()
    .max(1000, 'Review cannot exceed 1000 characters.')
    .required('Please provide a review.'),
});

export const SignupSchema = object({
  email: string()
    .trim()
    .email('Please enter a valid email address.')
    .required('Please provide an email address.'),
  username: string()
    .trim()
    .max(100, 'Username length cannot exceed 100 characters.')
    .required('Please provide a username.'),
  password: string()
    .trim()
    .min(8, 'Password must be at least 8 characters long.')
    .max(64, 'Password length cannot exceed 64 characters.')
    .required('Please add a secure password.'),
});

export const LoginSchema = object({
  username: string()
    .trim()
    .max(100, 'Username length cannot exceed 100 characters.')
    .required('Please provide a username.'),
  password: string()
    .trim()
    .min(8, 'Password must be at least 8 characters long.')
    .max(64, 'Password length cannot exceed 64 characters.')
    .required('Please add a secure password.'),
});
