const user = require("../user/routes");
const admin = require("../admin/routes");
const doctor = require("../routes/doctor");
const chatroom = require("../chatroom/routes");
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
