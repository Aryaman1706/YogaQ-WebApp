// * User is logged in
exports.login = (req, res, next) => {
  if (req.user) {
    next();
    return;
  } else {
    return res.status(401).json({ error: "Login to continue", body: null });
  }
};
