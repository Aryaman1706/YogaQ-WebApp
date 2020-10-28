const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.create = (body) => {
  const schema = Joi.object({
    user: Joi.object({
      id: Joi.objectId().trim().required(),
    }).required(),
    partner: Joi.object({
      id: Joi.objectId().trim().required(),
      model: Joi.string().valid("Admin", "Doctor").trim().required(),
    }).required(),
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
