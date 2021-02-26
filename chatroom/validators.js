const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
/**
 * {
 *  "user": "testUser@mail.com",
 *  "partner": "testDoctor@mail.com",
 *  "partnerModel": "Doctor"
 * }
 */
exports.create = (body) => {
  const schema = Joi.object({
    user: Joi.string().email().trim().required(),
    partner: Joi.string().email().trim().required(),
    partnerModel: Joi.string().valid("Admin", "Doctor").trim().required(),
  });

  return schema.validate(body);
};

/**
 * {
 *  populate: false
 * }
 */
exports.populate = (body) => {
  const schema = Joi.object({
    populate: Joi.bool().default(true),
  });

  return schema.validate(body);
};

/**
 * {
 *  "page": 1
 * }
 */
exports.getMessages = (body) => {
  const schema = Joi.object({
    page: Joi.number().integer().positive().required(),
  });
  return schema.validate(body);
};
/**
 * {
 *  "blocked": true
 * }
 */
exports.edit = (body) => {
  const schema = Joi.object({
    blocked: Joi.boolean().required(),
  });
  return schema.validate(body);
};

/**
 * {
 *  "lastAccess": new Date()
 * }
 */
exports.lastAccess = (body) => {
  const schema = Joi.object({
    lastAccess: Joi.date().required(),
  });
  return schema.validate(body);
};

/**
 * {
 *  page: 1,
 *  startDate= new Date(),
 *  endDate= new Date(),
 *  onlyNew=false
 * }
 */
exports.listChatrooms = (body) => {
  const schema = Joi.object({
    page: Joi.number().integer().positive().required(),
    startDate: Joi.date().max("now").required(),
    endDate: Joi.date().max(Joi.ref("startDate")).default("now"),
    onlyNew: Joi.boolean().default(false),
  });
  return schema.validate(body);
};
