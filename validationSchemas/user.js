const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.edit = (body) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(150).trim().required(),
    phoneNumber: Joi.string().trim().required(),
    age: Joi.number().integer().required(),
    gender: Joi.string()
      .lowercase()
      .trim()
      .valid("male", "female", "other")
      .required(),
    country: Joi.string().max(150).trim().required(),
  });

  return schema.validate(body);
};

exports.signup_country = (body) => {
  const schema = Joi.object({
    country: Joi.string().trim().required(),
  });

  return schema.validate(body);
};

exports.signup_country_phone = (body) => {
  const schema = Joi.object({
    country: Joi.string().trim().required(),
    phoneNumber: Joi.string().trim().required(),
  });

  return schema.validate(body);
};
