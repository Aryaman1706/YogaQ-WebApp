const User = require("../models/User");

// * User is logged in
exports.login = async (req, res, next) => {
  try {
    if (!req.session.user || req.session.user.role !== "user") {
      return res.status(403).json({ error: "Login To Continue.", body: null });
    }
    const user = await User.findById(req.session.user).exec();
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

// * User is logged is and profile is complete
exports.complete = async (req, res, next) => {
  try {
    if (!req.session.user || req.session.user.role !== "user") {
      return res.status(403).json({ error: "Login To Continue.", body: null });
    }
    const user = await User.findById(req.session.user).exec();
    if (!user || user.role !== "user" || !user.complete) {
      return res.status(401).json({
        error: "Invalid/Incomplete Profile. Complete the profile to continue.",
        body: null,
      });
    }
    req.user = user;
    return next();
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};
