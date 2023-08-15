import Joi from 'joi';
import sanitize from 'sanitize-html';

const extension = (joi: typeof Joi) => ({
  type: 'string',
  base: joi.string(),
  messages: {
    'string.escapeHTML': '{{#label}} must not include HTML!',
  },
  rules: {
    escapeHTML: {
      validate(value: string, helpers: any) {
        const clean = sanitize(value, {
          allowedTags: [],
          allowedAttributes: {},
        });
        if (clean !== value)
          return helpers.error('string.escapeHTML', { value });
        return clean;
      },
    },
  },
});

const JoiWithExtension = Joi.extend(extension);

export const campgroundSchemaJoi = JoiWithExtension.object({
  title: JoiWithExtension.string().max(100).required().escapeHTML(),
  location: JoiWithExtension.string().max(100).required().escapeHTML(),
  price: Joi.number().min(0).max(1000).required(),
  description: JoiWithExtension.string().max(1000).required().escapeHTML(),
});

export const reviewSchemaJoi = JoiWithExtension.object({
  rating: Joi.number().required().min(1).max(5),
  text: JoiWithExtension.string().max(1000).required().escapeHTML(),
});

export const signupSchemaJoi = JoiWithExtension.object({
  email: JoiWithExtension.string().email().required().escapeHTML(),
  username: JoiWithExtension.string().max(100).required().escapeHTML(),
  password: JoiWithExtension.string().min(8).max(64).required().escapeHTML(),
});

export const loginSchemaJoi = JoiWithExtension.object({
  username: JoiWithExtension.string().max(100).required().escapeHTML(),
  password: JoiWithExtension.string().min(8).max(64).required().escapeHTML(),
});
