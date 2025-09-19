const joi = require("joi");

const brokerSchema = joi.object({
  // userId: joi.string()
  //   .required()
  //   .regex(/^[0-9a-fA-F]{24}$/) // must be valid ObjectId
  //   .messages({
  //     "string.pattern.base": "Invalid userId format (must be a valid ObjectId).",
  //   }),
    name: joi.string().required(),
    email: joi.string().email().optional(),
    phone: joi.string().required().pattern(/^[0-9]{10}$/).required().message({ "string.pattern.base": "Phone number must be a valid 10-digit number.",}),
    paymentCalculation: joi.string().valid("percentage", "fixed").required(),
    paymentValue:joi.number().required().min(0)
})

module.exports={
brokerSchema
}