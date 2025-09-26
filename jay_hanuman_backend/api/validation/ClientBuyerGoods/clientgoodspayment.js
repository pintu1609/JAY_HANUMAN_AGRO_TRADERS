const Joi = require("joi");

const clientGoodsPaymentSchema = Joi.object({
clientId: Joi.string().required().messages({
    "any.required": "Client ID is required",
  }),
  amount: Joi.number().positive().required().messages({
    "number.base": "Amount must be a number",
    "number.positive": "Amount must be greater than zero",
    "any.required": "Amount is required",
  }),
  date: Joi.date().required(),

  paymentType: Joi.string()
    .valid("Cash", "Cheque", "BankTransfer", "PhonePe")
    .required()
    .messages({
      "any.only": "Payment type must be Cash, Cheque, BankTransfer, or PhonePe",
      "any.required": "Payment type is required",
    }),

  chequeNumber: Joi.when("paymentType", {
    is: "Cheque",
    then: Joi.string().required().messages({
      "any.required": "Cheque number is required when payment type is Cheque",
    }),
    otherwise: Joi.string().optional(),
  }),

  accountNumber: Joi.when("paymentType", {
    is: Joi.valid("Cheque", "BankTransfer", "PhonePe"),
    then: Joi.string().required().messages({
      "any.required": "Account number is required for Cheque, BankTransfer, or PhonePe",
    }),
    otherwise: Joi.string().optional(),
  }),
});

module.exports = {clientGoodsPaymentSchema};
