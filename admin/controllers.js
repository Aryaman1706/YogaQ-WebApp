const { genSalt, hash, compare } = require("bcryptjs");
const { randomBytes } = require("crypto");

// * Models
const Admin = require("./models");
const {
  models: { Chatroom },
} = require("../chatroom");

// * Utils
const validators = require("./validators");

// * Controllers -->

// * Create a new admin
exports.create = async (req, res) => {
  try {
    const { error, value } = validators.create(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    if (await Admin.findOne({ email: value.email }).exec())
      return res.status(400).json({
        error:
          "Validation Error. Admin with same email address already exists.",
        body: null,
      });

    const salt = await genSalt(10);
    const password = await hash(value.password, salt);

    Admin.create({
      username: value.username,
      email: value.email,
      password,
    });

    return res.status(200).json({
      error: null,
      body: "New admin registered successfully.",
    });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get my profile
exports.myProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id)
      .select("-password -resetToken -resetTokenValidity")
      .exec();
    if (!admin)
      return res.status(404).json({ error: "Admin not found", body: null });

    return res.status(200).json({ error: null, body: admin });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Logout admin
exports.logoutAdmin = async (req, res) => {
  try {
    req.logout();
    return res.status(200).json({ error: null, body: "Admin Logged Out" });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit profile of admin
exports.edit = async (req, res) => {
  try {
    const { error, value } = validators.edit(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error ${error.details[0].message}`,
        body: null,
      });

    const body = req.file ? { ...value, profilePicture: req.file.url } : value;

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user._id,
      { ...body },
      { new: true }
    )
      .select("-password -resetToken -resetTokenValidity")
      .exec();
    if (!updatedAdmin)
      return res.status(404).json({ error: "Admin not found.", body: null });

    return res.status(200).json({
      error: null,
      body: {
        admin: updatedAdmin,
        message: "Changes to profile changed successfully.",
      },
    });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Change Password
exports.changePassword = async (req, res) => {
  try {
    const { error, value } = validators.changePassword(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error ${error.details[0].message}`,
        body: null,
      });

    let admin = await Admin.findById(req.user._id).select("password").exec();
    if (!admin)
      return res.status(404).json({ error: "Admin not found.", body: null });

    const { oldPassword, newPassword, confirmPassword } = value;
    if (newPassword !== confirmPassword)
      return res.status(400).json({
        error: "Validation Error Passwords do not match.",
        body: null,
      });

    const result = await compare(oldPassword, admin.password);
    if (!result)
      return res
        .status(400)
        .json({ error: "Validation Error Incorrect Password.", body: null });

    const salt = await genSalt(10);
    const password = await hash(newPassword, salt);
    admin.password = password;
    admin = await admin.save();

    return res
      .status(200)
      .json({ error: null, body: "Password changed successfully." });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Forgot password 1 (Enter email to send reset link on)
exports.forgotPassword1 = async (req, res) => {
  try {
    const { error, value } = validators.forgotPassword1(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    let admin = await Admin.findOne({ email: value.email }).exec();
    if (!admin)
      return res
        .status(404)
        .json({ error: "Admin not found. Check entered email.", body: null });

    admin.resetToken = randomBytes(25);
    admin.resetTokenValidity = new Date(Date.now() + 15 * 60 * 1000);
    // TODO Send email to admin.email
    admin = await admin.save();

    return res.status(200).json({
      error: null,
      body: `Email has been send to ${value.email} with further instructions.`,
    });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Forgot password 2 (Enter a new password)
exports.forgotPassword2 = async (req, res) => {
  try {
    const { error, value } = validators.forgotPassword2(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    const token = req.params.resetToken.trim();

    let admin = await Admin.findOne({
      resetToken: token,
      resetTokenValidity: { $gte: new Date() },
    }).exec();
    if (!admin)
      return res
        .status(404)
        .json({ error: "Invalid reset token. Try again.", body: null });

    if (value.newPassword !== value.confirmPassword)
      return res
        .status(400)
        .json({ error: "Passwords do not match.", body: null });

    const salt = await genSalt(10);
    const password = await hash(value.newPassword, salt);

    admin.password = password;
    admin.resetToken = null;
    admin.resetTokenValidity = null;
    admin = await admin.save();

    return res
      .status(200)
      .json({ error: null, body: "Password reset successfull." });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get My chatrooms
exports.myChatrooms = async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({
      "partner.id": req.user._id,
      "partner.model": "Admin",
    });
    const promiseArray = [];
    chatrooms.forEach((doc) => {
      const pro = doc
        .populate("user.id", "username email")
        .populate("partner.id", "username email")
        .populate({
          path: "unreadMessages",
          match: { time: { $gt: doc.lastOpened.partner } },
        })
        .execPopulate();

      promiseArray.push(pro);
    });

    await Promise.all(promiseArray);
    return res.status(200).json({ error: null, body: chatrooms });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
