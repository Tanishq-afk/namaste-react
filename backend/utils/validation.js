const Joi = require("joi");
const validator = require("validator");

const strongPasswordValidator = (value, helpers) => {
  if (!validator.isStrongPassword(value)) {
    return helpers.message("Please enter strong password!");
  }
  return value;
};

const buildErrorMessage = (error) => {
  return error.details.map((detail) => detail.message).join(", ");
};

const validateData = (schema, input, options = {}) => {
  const { error, value } = schema.validate(input, {
    abortEarly: false,
    stripUnknown: false,
    ...options,
  });

  if (error) {
    throw new Error(buildErrorMessage(error));
  }

  return value;
};

const signUpSchema = Joi.object({
  firstName: Joi.string().trim().min(4).max(50).required(),
  lastName: Joi.string().trim().min(1).max(50).required(),
  emailId: Joi.string().trim().lowercase().email().required(),
  password: Joi.string()
    .required()
    .custom(strongPasswordValidator, "Strong password validation"),
});

const loginSchema = Joi.object({
  emailId: Joi.string().trim().lowercase().email().required(),
  password: Joi.string().required(),
});

const googleAuthSchema = Joi.object({
  idToken: Joi.string().trim().required(),
});

const validateSignUpData = (req) => {
  req.body = validateData(signUpSchema, req.body);
};

const validateLogin = (req) => {
  req.body = validateData(loginSchema, req.body);
};

const validateGoogleAuthBody = (req) => {
  req.body = validateData(googleAuthSchema, req.body);
};

module.exports = {
  validateSignUpData,
  validateLogin,
  validateGoogleAuthBody,
};
