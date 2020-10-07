const { string } = require("joi");
const Joi = require("joi");

exports.enquiry = (body) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(150).trim().required(),
    phoneNumber: Joi.string()
      .pattern(/[1-9]{1}[0-9]{9}/)
      .required(),
    age: Joi.number().integer().required(),
    gender: Joi.string()
      .lowercase()
      .trim()
      .valid(["male", "female", "other"])
      .required(),
    country: Joi.string().max(150).trim().required(),
    languages: Joi.array().items(
      Joi.string().max(20).trim().lowercase().required()
    ),
    description: Joi.string().max(200).trim().required(),
    email: Joi.string().email().required(),
    qualification: Joi.object({
      educationalQualification: Joi.array()
        .items(
          Joi.string()
            .trim()
            .lowercase()
            .valid("certificate", "diploma", "degree", "graduation", "phd")
        )
        .required(),
      docs: Joi.array()
        .items(
          Joi.object({
            name: Joi.string().trim().required(),
            institute: Joi.string().trim().required(),
            doc: Joi.string(),
          })
        )
        .required(),
    }),
    professional: Joi.array()
      .items(
        Joi.object({
          place: Joi.string().trim().required(),
          clients: Joi.number().integer().required(),
          noOfYears: Joi.object({
            years: Joi.number().integer().min(0).required(),
            months: Joi.number().integer().min(0).max(11).required(),
          }),
          doc: Joi.string(),
        })
      )
      .required(),
    expertise: Joi.string().max(200).trim().required(),
  });

  return schema.validate(body);
};

exports.test = (body) => {
  const schema = Joi.object({});

  return schema.validate(body);
};
