const Joi = require("joi");

// * Create new Link document
/**
 * {
 *  "links": [{ url: "https://google.com" }],
 * }
 */
exports.createOrEdit = (body) => {
  const schema = Joi.object({
    links: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().required(),
          thumbnail: Joi.string().required(),
        }).required()
      )
      .required(),
  });

  return schema.validate(body);
};

// * Enable link document
/**
 * {
 *  "enabled": true,
 * }
 */
exports.enable = (body) => {
  const schema = Joi.object({
    enable: Joi.boolean().required(),
  });

  return schema.validate(body);
};
