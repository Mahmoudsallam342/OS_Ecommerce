import Joi from "joi";

export const changePasswordSchema = Joi.object({
  oldPassword: Joi.string().required(),
  password: Joi.string().not(Joi.ref("oldPassword")).required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")),
}).required();
