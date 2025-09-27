const joi = require("joi");

const brokerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().optional(),
  phone: joi
    .string()
    .required()
    .pattern(/^[0-9]{10}$/)
    .required()
    .message({
      "string.pattern.base": "Phone number must be a valid 10-digit number.",
    }),
  paymentCalculation: joi.string().valid("percentage", "fixed").required(),
  paymentValue: joi.number().required().min(0),
});

module.exports = {
  brokerSchema,
};
