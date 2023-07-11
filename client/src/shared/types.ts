import { InferType } from 'yup';
import { ComponentType, ReactElement } from 'react';
import { TransitionProps } from '@mui/material/transitions';

import { CampgroundSchema, ReviewSchema } from './schemas';

export type Campground_Validation_Type_Yup = InferType<typeof CampgroundSchema>;

export type Campground_Type = Campground_Validation_Type_Yup & {
  _id?: string;
  reviews: Array<Review_Type>;
};

export type Review_Validation_Type_Yup = InferType<typeof ReviewSchema>;

export type Review_Type = Review_Validation_Type_Yup & {
  _id?: string;
};

export type Custom_Snackbar_Type = {
  open: boolean;
  Transition: ComponentType<
    TransitionProps & { children: ReactElement<any, any> }
  >;
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
