const joi = require("joi");

const registerSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  password: joi.string().min(8).required(),
  role: joi.string().valid("Admin", "User").default("User"),
});

const loginSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().min(8).required(),
});

const updateUserSchema = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi
    .string()
    .pattern(/^[0-9]{10}$/)
    .required(),
  password: joi.string().min(8),
  role: joi.string().valid("Admin", "User").required(),
});

module.exports = {
  registerSchema,
  loginSchema,
  updateUserSchema,
};
