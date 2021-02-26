const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

/**
 * {
 *  "chatroomId": "60204cc5b08d2aa154576945",
 *  "time": new Date('...')
 * }
 */
exports.request = (body) => {
  // 24 hours delay from now
  const date = new Date();
  date.setDate(date.getDate() + 1);

  const schema = Joi.object({
    chatroomId: Joi.objectId().trim().required(),
    time: Joi.date().greater(date).required(),
  });

  return schema.validate(body);
};

/**
 * {
 *  page: 1
 * }
 */
exports.page = (body) => {
  const schema = Joi.object({
    page: Joi.number().integer().positive().required(),
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

/**
 * {
 *  page: 1,
 *  startDate= new Date(),
 *  endDate= new Date(),
 * }
 */
exports.listCalls = (body) => {
  const schema = Joi.object({
    page: Joi.number().integer().positive().required(),
    startDate: Joi.date().max("now").required(),
    endDate: Joi.date().min(Joi.ref("startDate")).default("now"),
  });

  return schema.validate(body);
};
