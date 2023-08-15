import { InferType } from 'yup';

import { CampgroundSchema, ReviewSchema } from './schemas';

export type Author_Type = {
  email?: string;
  username?: string;
  _id?: string;
};

export type Campground_Validation_Type_Yup = InferType<typeof CampgroundSchema>;

export type Campground_Type = Campground_Validation_Type_Yup & {
  _id?: string;
  author: Author_Type;
  reviews: Array<Review_Type>;
  geometry: {
    type: string;
    coordinates: Array<number>;
  };
  images: Array<{
    _id: string;
    url: string;
    filename: string;
    thumbnail?: string;
  }>;
};

export type Review_Validation_Type_Yup = InferType<typeof ReviewSchema> & {
  author: string | undefined;
};

export type Review_Type = Review_Validation_Type_Yup & {
  _id?: string;
  author: Author_Type;
};

export type CurrentUser_Type = {
  user_id: string;
  username: string;
  user_email: string;
  iat?: number;
};

export type Dimentions_Type = {
  width: number;
  height: number;
};

export type NotFound_Type = {
  status: number;
  message: string;
};
