// * User/Partner is logined
// eslint-disable-next-line
exports.loggedIn = async (req, res, next) => {
  if (req.user) {
    next();
  } else {
    return res
      .status(401)
      .json({ error: "Permission Error. Login to continue.", body: null });
  }
};

// * Valid user/partner are accessing the chatroom
// eslint-disable-next-line
exports.auth = async (req, res, next) => {
  if (
    req.session.active_chatroom &&
    req.session.active_chatroom.chatroomId.toString() ===
      req.params.id.toString() &&
    (req.session.active_chatroom.userId.toString() ===
      req.user._id.toString() ||
      req.session.active_chatroom.partnerId.toString() ===
        req.user._id.toString())
  ) {
    next();
  } else {
    return res.status(400).json({ error: "Get chatroom first.", body: null });
  }
};
