import Joi from 'joi';

export const campgroundSchemaJoi = Joi.object({
  title: Joi.string().max(100).required(),
  location: Joi.string().max(100).required(),
  price: Joi.number().min(0).max(1000).required(),
  image: Joi.string().max(250).required(),
  description: Joi.string().max(1000).required(),
});
