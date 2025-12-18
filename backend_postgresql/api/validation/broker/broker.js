const joi = require("joi");

const brokerSchema = joi.object({
//   userId: joi.number().required(),

  name: joi.string().required(),

  email: joi.string().email().optional(),

//   phones: joi.array()
//     .items(
//       joi.string().pattern(/^[0-9]{10}$/).required()
//     )
//     .min(1)
//     .max(2)
//     .required()
//     .messages({
//       "array.min": "At least one phone number is required",
//       "array.max": "Maximum two phone numbers allowed",
//     }),

  phone: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required(),

  paymentCalculation: joi
    .string()
    .valid("percentage", "fixed")
    .required(),

  paymentValue: joi.number().min(0).required(),
});

module.exports = { brokerSchema };
