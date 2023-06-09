import { InferType } from 'yup';
import { CampgroundSchema } from './schemas';

export type Campground_Validation_Type_Yup = InferType<typeof CampgroundSchema>;

export type Campground_Type = Campground_Validation_Type_Yup & {
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
