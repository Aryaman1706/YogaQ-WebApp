const User = require("../models/User");

// * User is logged in
exports.login = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.status(403).json({ error: "Login To Continue.", body: null });
    }
    const user = await User.findById(req.session.user).exec();
    if (!user) {
      return res.status(401).json({ error: "Login To Continue.", body: null });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};
