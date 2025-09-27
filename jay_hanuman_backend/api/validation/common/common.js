const Joi = require("joi");

const accountDetailsSchema = Joi.object({
  accountHolderName: Joi.string().required(),
  accountNumber: Joi.string().required(),
  ifscCode: Joi.string().optional(),
});

const basePaymentValidation = Joi.object({
  amount: Joi.number().positive().required(),
  date: Joi.date().required(),
  paymentType: Joi.string()
    .valid("Cash", "Cheque", "BankTransfer", "PhonePe")
    .required(),

  // chequeNumber only if paymentType is Cheque
  chequeNumber: Joi.when("paymentType", {
    is: Joi.valid("Cheque", "BankTransfer"),
    then: Joi.string().required(),
    otherwise: Joi.forbidden(),
  }),

  // fromAccount is required for all except Cash
  fromAccount: Joi.when("paymentType", {
    is: "Cash",
    then: Joi.forbidden(),
    otherwise: accountDetailsSchema.required(),
  }),

  // toAccount is required for all except Cash
  toAccount: Joi.when("paymentType", {
    is: "Cash",
    then: Joi.forbidden(),
    otherwise: accountDetailsSchema.required(),
  }),
});

module.exports = {
  basePaymentValidation,
  accountDetailsSchema,
};
