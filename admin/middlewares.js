// * Middleware to check if admin is logged in
// eslint-disable-next-line
exports.login = async (req, res, next) => {
  // Session is present and is valid
  if (req.user && req.user.role.trim() === "admin") {
    next();
  } else {
    // Session is absent
    return res.status(401).json({ error: "Permission Denied.", body: null });
  }
};
