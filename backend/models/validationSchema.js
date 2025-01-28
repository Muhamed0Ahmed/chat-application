import Joi from "joi";

const userValidationRegisterSchema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export { userValidationRegisterSchema };
