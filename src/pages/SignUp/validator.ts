import joi from 'joi';

const signupValidatorSchema = joi.object({
  firstName: joi.string().min(3).max(255).required().label('First Name'),
  lastName: joi.string().min(3).max(255).required().label('Last Name'),
  phone: joi.string().min(9).max(15).required().label('Phone'),
  email: joi
    .string()
    .email({ tlds: false })
    .min(3)
    .max(255)
    .required()
    .label('Email'),
  password: joi.string().min(8).max(255).required().label('Password'),
  confirmPassword: joi.string().min(8).max(255).required().label('Password'),
});

export default signupValidatorSchema;
