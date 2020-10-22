// * NPM Packages

// * Models
const User = require("../models/User");

// * Utils
const validation = require("../validationSchemas/user");

// * Controllers -->

// * Get my profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    if (!user)
      return res.status(404).json({ error: "User not found.", body: null });

    return res.status(200).json({ error: null, body: user });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit profile
exports.editProfile = async (req, res) => {
  try {
    const { error, value } = validation.edit(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ...value },
      { new: true }
    ).exec();
    if (!updatedUser)
      return res.status(404).json({ error: "User not found.", body: null });

    return res.status(200).json({ error: null, body: updatedUser });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
