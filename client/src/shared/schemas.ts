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
  image: string()
    .trim()
    .url('Please provide a valid Url.')
    .max(250, 'Url is too long.')
    .required('Please add an image.'),
  location: string()
    .trim()
    .max(100, 'Location length cannot exceed 100 characters.')
    .required('Please provide a location.'),
});
