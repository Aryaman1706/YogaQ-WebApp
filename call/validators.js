const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

exports.request = (body) => {
  const schema = Joi.object({
    chatroomId: Joi.objectId().trim().required(),
    time: Joi.date().greater("now").required(),
  });

  return schema.validate(body);
};

exports.edit = (body) => {
  const schema = Joi.object({
    time: Joi.date().greater("now").required(),
  });

  return schema.validate(body);
};

exports.accept = (body) => {
  const schema = Joi.object({
    accepted: Joi.boolean().required(),
  });

  return schema.validate(body);
};

exports.complete = (body) => {
  const schema = Joi.object({
    completed: Joi.boolean().required(),
  });

  return schema.validate(body);
};
