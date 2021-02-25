const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);

// * Create an Admin
/**
 * {
 *  "username": "testUsername",
 *  "email": "testEmail@mail.com",
 *  "password": "testPassword"
 * }
 */
exports.create = (body) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(40).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};

// * Login as Admin
/**
 * {
 *  "username": "testUsername",
 *  "password": "testPassword"
 * }
 */
exports.login = (body) => {
  const schema = Joi.object({
    username: Joi.string().email().trim().required(),
    password: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};

// * Edit profile of currently logined in Admin
/**
 * {
 *  "username": "testUsername",
 *  "email": "testEmail@mail.com",
 *  "welcomeMessage": "Hello!"
 * }
 */
exports.edit = (body) => {
  const schema = Joi.object({
    username: Joi.string().min(5).max(150).trim().required(),
    email: Joi.string().email().max(150).trim().required(),
    welcomeMessage: Joi.string().max(500).trim().required(),
  });

  return schema.validate(body);
};

// * Change Password of currently logined Admin
/**
 * {
 *  "oldPassword": "testOldPassword",
 *  "newPassword": "testNewPassword",
 *  "confirmPassword": "testNewPassword"
 * }
 */
exports.changePassword = (body) => {
  const schema = Joi.object({
    oldPassword: Joi.string().min(8).max(20).trim().required(),
    newPassword: Joi.string().min(8).max(20).trim().required(),
    confirmPassword: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};

// * Enter email to get reset token
/**
 * {
 *  "email": "testEmail@mail.com"
 * }
 */
exports.forgotPassword1 = (body) => {
  const schema = Joi.object({
    email: Joi.string().email().max(150).trim().required(),
  });

  return schema.validate(body);
};

// * Enter new password to reset
/**
 * {
 *  "newPassword": "testNewPassword",
 *  "confirmPassword": "testNewPassword"
 * }
 */
exports.forgotPassword2 = (body) => {
  const schema = Joi.object({
    newPassword: Joi.string().min(8).max(20).trim().required(),
    confirmPassword: Joi.string().min(8).max(20).trim().required(),
  });

  return schema.validate(body);
};
