// * Middleware to verify that admin or doctor is logged in
// eslint-disable-next-line
exports.adminOrDoctorLogin = async (req, res, next) => {
  // Session is present and is valid
  if (
    req.user &&
    (req.user.role.trim() === "admin" || req.user.role.trim() === "doctor")
  ) {
    next();
  } else {
    // Session is absent
    return res.status(401).json({ error: "Permission Denied.", body: null });
  }
};
