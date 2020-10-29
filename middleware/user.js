const User = require("../models/User");

// * User is logged in
exports.login = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id).exec();
      if (!user) {
        return res.status(404).json({ error: "Invalid User.", body: null });
      }
      if (user.role === "user") {
        return next();
      }
      return res.status(550).json({ error: "Permission Denied.", body: null });
    }
    return res.status(401).json({ error: "Login to continue", body: null });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};
