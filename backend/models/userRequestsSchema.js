import Joi from "joi";

const userValidationRegisterSchema = Joi.object({
  username: Joi.string().min(5).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});
const userUpdateSchema = Joi.object({
  username: Joi.string().min(5).optional(),
  email: Joi.string().email().optional(),
  status: Joi.string().min(6).optional(),
  profilePicture:Joi.string().optional(),
})

export { userValidationRegisterSchema, userUpdateSchema };
