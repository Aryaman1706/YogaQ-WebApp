const Admin = require("../models/Admin");

// * Admin is logged in
exports.login = async (req, res, next) => {
  try {
    if (req.user) {
      const admin = await Admin.findById(req.user._id).exec();
      if (!admin) {
        return res
          .status(404)
          .json({ error: "Invalid Admin account.", body: null });
      }
      if (admin.role === "admin") {
        next();
        return 0;
      }
      return res.status(550).json({ error: "Permission Denied.", body: null });
    }
    return res.status(401).json({ error: "Login to continue", body: null });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};
