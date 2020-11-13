const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.toggleActive = (body) => {
  const schema = Joi.object({
    active: Joi.boolean().required(),
  });

  return schema.validate(body);
};

exports.addQuestion = (body) => {
  const schema = Joi.object({
    questionSetId: Joi.objectId().trim().required(),
    statement: Joi.string().max(250).trim().required(),
    options: Joi.array().items(Joi.string().trim()).length(4).required(),
  });

  return schema.validate(body);
};

exports.fillSet = (body) => {
  const schema = Joi.object({
    responses: Joi.object()
      .pattern(Joi.objectId(), Joi.string().trim())
      .required(),
  });

  return schema.validate(body);
};
