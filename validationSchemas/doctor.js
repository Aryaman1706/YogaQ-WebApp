const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

const enquiryObj = Joi.object({
  username: Joi.string().min(3).max(150).trim().required(),
  phoneNumber: Joi.string()
    .pattern(/[1-9]{1}[0-9]{9}/)
    .required(),
  age: Joi.number().integer().required(),
  gender: Joi.string()
    .lowercase()
    .trim()
    .valid("male", "female", "other")
    .required(),
  country: Joi.string().max(150).trim().uppercase().required(),
  languages: Joi.array().items(
    Joi.string().max(20).trim().lowercase().required()
  ),
  description: Joi.string().max(200).trim().required(),
  email: Joi.string().email().required(),
  qualificational: Joi.object({
    educationalQualification: Joi.array()
      .items(
        Joi.string()
          .trim()
          .lowercase()
          .valid(
            "certificate",
            "diploma",
            "degree",
            "graduation",
            "postGraduation",
            "phd"
          )
      )
      .required(),
    docs: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim().required(),
          institute: Joi.string().trim().required(),
          doc: Joi.string(), // File
        })
      )
      .required(),
  }),
  professional: Joi.array()
    .items(
      Joi.object({
        place: Joi.string().trim().required(),
        clients: Joi.number().integer().required(),
        noOfYears: Joi.number().integer().min(0).required(),
        doc: Joi.string(), // File
      })
    )
    .required(),
  expertise: Joi.string().max(200).trim().required(),
});

exports.enquiry = (body) => {
  const schema = enquiryObj;

  return schema.validate(body);
};

exports.edit = (body) => {
  const schema = enquiryObj.append({
    welcomeMessage: Joi.string().max(200).trim().required(),
  });

  return schema.validate(body);
};

exports.register = (body) => {
  const schema = Joi.object({
    enquiry: Joi.objectId().trim().required(),
    password: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};

exports.login = (body) => {
  const schema = Joi.object({
    username: Joi.string().email().trim().required(),
    password: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};

exports.changePassword = (body) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(8).max(20).trim().required(),
    newPassword: Joi.string().min(8).max(20).trim().required(),
    confirmPassword: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};

exports.forgotPassword1 = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().max(150).trim().required(),
  });

  return schema.validate(body);
};

exports.forgotPassword2 = (body) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(8).max(20).trim().required(),
    confirmPassword: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};
