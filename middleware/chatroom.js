// * Model
const User = require("../models/User");

exports.auth = async (req, res, next) => {
  if (
    req.session.active_chatroom &&
    req.session.active_chatroom.chatroomId.equals(req.params.id) &&
    (req.session.active_chatroom.userId.equals(req.user._id) ||
      req.session.active_chatroom.partnerId.equals(req.user._id))
  ) {
    return next();
  }

  return res.redirect(
    `${process.env.SERVER_URL}/api/chatroom/get/${req.params.id}`
  );
};

exports.canGet = async (req, res, next) => {
  try {
    // Admin/Doctor/User is logged in
    if (req.user) {
      return next();
    }
    // No one is logged in
    if (!req.session.user || req.session.user.role !== "user") {
      return res.status(403).json({ error: "Login To Continue.", body: null });
    }
    const user = await User.findById(req.session.user.id).exec();
    if (!user || user.role !== "user") {
      return res.status(401).json({ error: "Invalid Profile.", body: null });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};
