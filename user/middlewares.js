// * User is logged in
// eslint-disable-next-line
exports.login = async (req, res, next) => {
  if (req.user && req.user.role === "user") {
    next();
  } else {
    return res
      .status(401)
      .json({ error: "Permission Error. Login to continue", body: null });
  }
};

// * User is logged is and profile is complete
// eslint-disable-next-line
exports.complete = async (req, res, next) => {
  if (req.user && req.user.role === "user") {
    if (req.user.complete) {
      next();
    } else {
      return res.status(401).json({
        error: "Permission Error. Complete the profile to continue.",
        body: null,
      });
    }
  } else {
    return res
      .status(401)
      .json({ error: "Permission Error. Login to continue", body: null });
  }
};
