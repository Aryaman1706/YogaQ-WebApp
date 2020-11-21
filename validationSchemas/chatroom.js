const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.create = (body) => {
  const schema = Joi.object({
    user: Joi.string().email().trim().required(),
    partner: Joi.string().email().trim().required(),
    partnerModel: Joi.string().valid("Admin", "Doctor").trim().required(),
    blocked: Joi.boolean().required(),
  });

  return schema.validate(body);
};

exports.edit = (body) => {
  const schema = Joi.object({
    blocked: Joi.boolean().required(),
  });
  return schema.validate(body);
};

exports.lastAccess = (body) => {
  const schema = Joi.object({
    lastAccess: Joi.date().required(),
  });
  return schema.validate(body);
};
