import Joi from 'joi';

export const campgroundSchemaJoi = Joi.object({
  title: Joi.string().max(100).required(),
  location: Joi.string().max(100).required(),
  price: Joi.number().min(0).max(1000).required(),
  // image: Joi.string().max(250).required(),
  description: Joi.string().max(1000).required(),
});

export const reviewSchemaJoi = Joi.object({
  rating: Joi.number().required().min(1).max(5),
  text: Joi.string().max(1000).required(),
});

export const signupSchemaJoi = Joi.object({
  email: Joi.string().email().required(),
  username: Joi.string().max(100).required(),
  password: Joi.string().min(8).max(64).required(),
});

export const loginSchemaJoi = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().min(8).max(64).required(),
});
