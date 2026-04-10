import Joi from "joi";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/;

export const registerSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(passwordRegex)
    .message(
      "Password must contain uppercase, lowercase, number and special character",
    )
    .required(),
  description: Joi.string().optional(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string()
    .min(8)
    .pattern(passwordRegex)
    .message(
      "Password must contain uppercase, lowercase, number and special character",
    )
    .required(),
});
