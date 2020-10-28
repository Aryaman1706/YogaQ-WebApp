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
