// * NPM Packages
const { genSalt, hash, compare } = require("bcryptjs");
const { randomBytes } = require("crypto");

// * Models
const Admin = require("../models/Admin");

// * Utils
const validation = require("../validationSchemas/admin");

// * Controllers -->

// * Create a new admin
exports.create = async (req, res) => {
  try {
    const { error, value } = validation.create(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    const salt = await genSalt(10);
    const password = hash(value.password, salt);

    const newAdmin = await Admin.create({
      username: value.username,
      email: value.email,
      password,
    });

    return res.status(500).json({ error: null, body: newAdmin });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get my profile
exports.myProfile = async (req, res) => {
  try {
    const admin = await Admin.findById(req.user._id).exec();
    if (!admin)
      return res.status(404).json({ error: "Admin not found", body: null });

    return res.status(200).json({ error: null, body: admin });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit profile of admin
exports.edit = async (req, res) => {
  try {
    const { error, value } = validation.edit(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    const updatedAdmin = await Admin.findByIdAndUpdate(
      req.user._id,
      { ...value },
      { new: true }
    ).exec();
    if (!updatedAdmin)
      return res.status(404).json({ error: "Admin not found.", body: null });

    return res.status(200).json({ error: null, body: updatedAdmin });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Change Password
exports.changePassword = async (req, res) => {
  try {
    const { error, value } = validation.changePassword(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    let admin = await Admin.findById(req.user._id).exec();
    if (!admin)
      return res.status(404).json({ error: "Admin not found.", body: null });

    const { oldPassword, newPassword, confirmPassword } = value;
    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .json({ error: "Passwords do not match.", body: null });

    const result = await compare(oldPassword, admin.password);
    if (!result)
      return res.status(400).json({ error: "Incorrect Password.", body: null });

    const salt = await genSalt(10);
    const password = hash(newPassword, salt);
    admin.password = password;
    admin = await admin.save();

    return res
      .status(200)
      .json({ error: null, body: "Password changed successfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Forgot password 1 (Enter email to send reset link on)
exports.forgotPassword1 = async (req, res) => {
  try {
    const { error, value } = validation.forgotPassword1(req.body);
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
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Forgot password 2 (Enter a new password)
exports.forgotPassword2 = async (req, res) => {
  try {
    const { error, value } = validation.forgotPassword2(req.body);
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
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
