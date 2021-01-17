// * User is logged in
exports.login = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "user") {
      return next();
    }
    return res
      .status(401)
      .json({ error: "Permission Error. Login to continue", body: null });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * User is logged is and profile is complete
exports.complete = async (req, res, next) => {
  try {
    if (req.user && req.user.role === "user") {
      if (req.user.complete) {
        return next();
      }
      return res.status(401).json({
        error: "Permission Error. Complete the profile to continue.",
        body: null,
      });
    }
    return res
      .status(401)
      .json({ error: "Permission Error. Login to continue", body: null });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};
