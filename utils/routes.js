const { routes: admin } = require("../admin");
const { routes: call } = require("../call");
const { routes: chatroom } = require("../chatroom");
const { routes: doctor } = require("../doctor");
const { routes: questionSet } = require("../questionSet");
const { routes: user } = require("../user");

module.exports = (app) => {
  app.use("/api/user", user);
  app.use("/api/admin", admin);
  app.use("/api/chatroom", chatroom);
  app.use("/api/doctor", doctor);
  app.use("/api/call", call);
  app.use("/api/questionSet", questionSet);
};
