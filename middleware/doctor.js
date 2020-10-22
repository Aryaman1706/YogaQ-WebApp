const Doctor = require("../models/Doctor");

// * Doctor is logged in
exports.login = async (req, res, next) => {
  try {
    if (req.user) {
      const doctor = await Doctor.findById(req.user._id).exec();
      if (!doctor) {
        return res.status(404).json({ error: "Invalid account.", body: null });
      }
      if (doctor.role === "doctor" && doctor.restricted) {
        next();
        return 0;
      }
      return res.status(550).json({ error: "Permission Denied.", body: null });
    }
    return res.status(401).json({ ersror: "Login to continue", body: null });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};
