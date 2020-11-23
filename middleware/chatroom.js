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
    if (req.user) {
      return next();
    }
    return res
      .status(401)
      .json({ error: "Permission Error. Login to continue.", body: null });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};
