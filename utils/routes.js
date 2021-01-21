const { routes: user } = require("../user");
const { routes: admin } = require("../admin");
const { routes: doctor } = require("../doctor");
const { routes: chatroom } = require("../chatroom");
const { routes: call } = require("../call");

module.exports = (app) => {
  app.use("/api/user", user);
  app.use("/api/admin", admin);
  app.use("/api/chatroom", chatroom);
  app.use("/api/doctor", doctor);
  app.use("/api/call", call);
};
