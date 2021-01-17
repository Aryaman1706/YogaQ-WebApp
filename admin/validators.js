const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.create = (body) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(40).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};

exports.login = (body) => {
  const schema = Joi.object({
    username: Joi.string().email().trim().required(),
    password: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};

exports.edit = (body) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(150).trim().required(),
    email: Joi.string().email().max(150).trim().required(),
    welcomeMessage: Joi.string().max(500).trim(),
  });

  return schema.validate(body);
};

exports.changePassword = (body) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(8).max(20).trim().required(),
    newPassword: Joi.string().min(8).max(20).trim().required(),
    confirmPassword: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};

exports.forgotPassword1 = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().max(150).trim().required(),
  });

  return schema.validate(body);
};

exports.forgotPassword2 = (body) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(8).max(20).trim().required(),
    confirmPassword: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};
