const Joi = require("joi");

const PackageJoiSchema = Joi.object({
  package: Joi.string().required(),        // matches "type" in Mongoose
  weight: Joi.number().required(),
  rate: Joi.number().required(),
  calculation: Joi.string().required()  // matches "calculation" in Mongoose
});

const ClientBuyerGoodsSchema = Joi.object({
  clientId: Joi.string().required(),    // ObjectId of client
  companyId: Joi.string().required(),   // ObjectId of company
  vehicleNumber: Joi.string().required(),
  packages: Joi.array().items(PackageJoiSchema).min(1).required(),
  misleniousCharge: Joi.number().required(),
  misleniousChargeDescription: Joi.string().optional(),
  date: Joi.date().optional(),
  billNumber: Joi.string().required()
});

module.exports = {
  ClientBuyerGoodsSchema
};
