const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.edit = (body) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(150).trim().required(),
    phoneNumber: Joi.string()
      .pattern(/[1-9]{1}[0-9]{9}/)
      .required(),
    age: Joi.number().integer().required(),
    gender: Joi.string()
      .lowercase()
      .trim()
      .valid(["male", "female", "other"])
      .required(),
    country: Joi.string().max(150).trim().required(),
  });

  return schema.validate(body);
};
