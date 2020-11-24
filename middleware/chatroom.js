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
    return next();
  }

  // return res.redirect(
  //   `${process.env.SERVER_URL}/api/chatroom/get/${req.params.id}`
  // );
  return res.status(400).send("hello bitch");
};

exports.canGet = async (req, res, next) => {
  try {
    console.log(req.user);
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
