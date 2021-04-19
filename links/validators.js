const Joi = require("joi");

// * Create new Link document
/**
 * {
 *  "links": [{ url: "https://google.com" }],
 *  "enabled": true
 * }
 */
exports.createOrEdit = (body) => {
  const schema = Joi.object({
    links: Joi.array()
      .items(
        Joi.object({
          url: Joi.string().required(),
        }).required()
      )
      .required(),
  });

  return schema.validate(body);
};
