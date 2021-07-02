const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

/**
 * {
 *  "chatroomId": ""
 * }
 */
exports.create = (body) => {
  const schema = Joi.object({
    chatroomId: Joi.objectId().required(),
  });

  return schema.validate(body);
};

/**
 * {
 *  "active": true
 * }
 */
exports.toggleActive = (body) => {
  const schema = Joi.object({
    active: Joi.boolean().required(),
  });

  return schema.validate(body);
};

/**
 * {
 *  "statement": "test question statement",
 *  "options": ["option1", "option2", "option3", "option4"]
 * }
 */
exports.addQuestion = (body) => {
  const schema = Joi.object({
    statement: Joi.string().max(250).trim().required(),
    options: Joi.array().items(Joi.string().trim().min(1)).length(4).required(),
  });

  return schema.validate(body);
};

/**
 * {
 *  "questionId": "ObjectId('..')"
 * }
 */
exports.removeQuestion = (body) => {
  const schema = Joi.object({
    questionId: Joi.objectId().trim().required(),
  });

  return schema.validate(body);
};

/**
 * {
 *  "responses": {
 *    [questionId]: "response"
 *  }
 * }
 */
exports.fillSet = (body) => {
  const schema = Joi.object({
    responses: Joi.object()
      .pattern(Joi.objectId(), Joi.string().trim())
      .required(),
  });

  return schema.validate(body);
};

/**
 * {
 *  "date": new Date()
 * }
 */
exports.date = (body) => {
  const schema = Joi.object({
    date: Joi.date().default("now").required(),
  });

  return schema.validate(body);
};
