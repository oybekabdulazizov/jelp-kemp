import { InferType } from 'yup';
import { CampgroundSchema } from './schemas';

// type Campground_Type = {
//   _id?: string;
//   title: string;
//   description: string;
//   price: number;
//   location: string;
//   image: string;
// };

export type Campground_Type = InferType<typeof CampgroundSchema> & {
  _id?: string;
};

export type Validation_Type = {
  title: string | boolean;
  location: string | boolean;
  image: string | boolean;
  description: string | boolean;
  price: string | boolean;
};

export type Dimentions_Type = {
  width: number;
  height: number;
};

// export type { Campground_Type, Dimentions_Type };
