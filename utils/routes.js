const user = require("../routes/user");
const admin = require("../routes/admin");
const doctor = require("../routes/doctor");
const chatroom = require("../routes/chatroom");
const call = require("../routes/call");

/**
 * @param {Object} app - Express App
 * @return {Object}
 */
module.exports = (app) => {
  app.use("/api/user", user);
  app.use("/api/admin", admin);
  app.use("/api/doctor", doctor);
  app.use("/api/chatroom", chatroom);
  app.use("/api/call", call);
};
