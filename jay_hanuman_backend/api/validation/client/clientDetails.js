const Joi = require("joi");

const clientSchema = Joi.object({
  name: Joi.string().required().min(2).max(100).messages({
    "string.empty": "Name is required",
    "string.min": "Name must be at least 2 characters",
    "string.max": "Name must be less than 100 characters",
  }),

  email: Joi.string()
    .email({ tlds: { allow: false } })
    .optional()
    .messages({
      "string.email": "Email must be valid",
    }),

  phone: Joi.array()
    .items(
      Joi.string()
        .pattern(/^[0-9]{10}$/)
        .required()
        .messages({
          "string.empty": "Phone number is required",
          "string.pattern.base": "Phone number must be 10 digits",
        })
    )
    .min(1)
    .required()
    .messages({
      "array.base": "Phone must be an array",
      "array.min": "At least one phone number is required",
    }),

  address: Joi.string().required().min(5).max(200).messages({
    "string.empty": "Address is required",
    "string.min": "Address must be at least 5 characters",
    "string.max": "Address must be less than 200 characters",
  }),
  companyName: Joi.string().required(),
});

module.exports = { clientSchema };
