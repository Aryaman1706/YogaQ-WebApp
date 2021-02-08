const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

/**
 * {
 *  "chatroomId": "60204cc5b08d2aa154576945",
 *  "time": new Date()
 * }
 */
exports.request = (body) => {
  const schema = Joi.object({
    chatroomId: Joi.objectId().trim().required(),
    time: Joi.date().greater("now").required(),
  });

  return schema.validate(body);
};

/**
 * {
 *  "time": new Date()
 * }
 */
exports.edit = (body) => {
  const schema = Joi.object({
    time: Joi.date().greater("now").required(),
  });

  return schema.validate(body);
};

/**
 * {
 *  "accepted": true
 * }
 */
exports.accept = (body) => {
  const schema = Joi.object({
    accepted: Joi.boolean().required(),
  });

  return schema.validate(body);
};

/**
 * {
 *  "completed": true
 * }
 */
exports.complete = (body) => {
  const schema = Joi.object({
    completed: Joi.boolean().required(),
  });

  return schema.validate(body);
};
