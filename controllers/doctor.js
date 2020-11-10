// * NPM Packages
const { genSalt, hash, compare } = require("bcryptjs");
const { randomBytes } = require("crypto");
const { validate: uuidValidate } = require("uuid");

// * Models
const Doctor = require("../models/Doctor");
const Enquiry = require("../models/Enquiry");
const ChatRoom = require("../models/ChatRoom");

// * Utils
const validation = require("../validationSchemas/doctor");

// * Controllers -->

// * Create a new enquiry
exports.newEnquiryCheck = async (req, res, next) => {
  try {
    console.log(req.body);
    const body = {
      ...req.body,
      languages: JSON.parse(req.body.languages),
      qualificational: JSON.parse(req.body.qualificational),
      professional: JSON.parse(req.body.qualificational),
    };
    console.log(body);
    const { error, value } = validation.enquiry(body);
    if (error) return res.json({ error: error.details[0].message, body: null });

    if (await Enquiry.findOne({ email: value.email }))
      return res.json({
        error: "An application with same email address already exist.",
        body: null,
      });

    req.cleanData = value;
    return next();
  } catch (error) {
    console.log(error);
    return res.json({
      error: "Invalid Data. Try Again.",
      body: null,
    });
  }
};

exports.newEnquiry = async (req, res) => {
  try {
    const body = {
      ...req.body,
      languages: JSON.parse(req.body.languages),
      qualificational: JSON.parse(req.body.qualificational),
      professional: JSON.parse(req.body.professional),
    };
    const { error, value } = validation.enquiry(body);
    if (error) return res.json({ error: error.details[0].message, body: null });

    if (await Enquiry.findOne({ email: value.email }))
      return res.json({
        error: "An application with same email address already exist.",
        body: null,
      });

    // Hash Table for file
    const fileObj = {};
    req.files.forEach((file) => {
      fileObj[file.fieldname] = file;
    });

    // const value = req.cleanData;

    // Replacing uuid with url in qualificational
    value.qualificational.docs = value.qualificational.docs.map((obj) => {
      if (uuidValidate(obj.doc)) {
        if (fileObj[obj.doc]) {
          return { ...obj, doc: fileObj[obj.doc].url };
        }
        return { ...obj, doc: null };
      }
      return obj;
    });

    // Replacing uuid with url in professional
    value.professional = value.professional.map((obj) => {
      if (uuidValidate(obj.doc)) {
        if (fileObj[obj.doc]) {
          return { ...obj, doc: fileObj[obj.doc].url };
        }
        return { ...obj, doc: null };
      }
      return obj;
    });

    await Enquiry.create({ ...value });

    return res.status(200).json({
      error: null,
      body: "Thank you. Your application was submitted successfully",
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: error });
  }
};

// * Create a doctor from enquiry
exports.register = async (req, res) => {
  try {
    const { error, value } = validation.register(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    const enquiry = await Enquiry.findById(value.enquiry).exec();
    if (!enquiry)
      return res.status(404).json({ error: "Invalid Enquiry.", body: null });

    const salt = await genSalt(10);
    const password = await hash(value.password, salt);
    const doctor = await Doctor.create({ ...enquiry, password });

    res.status(200).json({ error: null, body: doctor });

    await enquiry.remove();
    return 0;
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Deny an enquiry
exports.denyEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findByIdAndDelete(
      req.params.enquiryId
    ).exec();
    if (!enquiry)
      return res.status(404).json({ error: "Invalid enquiry.", body: null });

    return res
      .status(200)
      .json({ error: null, body: "Enquiry deleted successfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get my profile
exports.myProfile = async (req, res) => {
  try {
    let doctor = null;
    if (req.query.complete) {
      doctor = await Doctor.findById(req.user._id)
        .select("-password -resetToken -resetTokenValidity")
        .exec();
    } else {
      doctor = await Doctor.findById(req.user._id)
        .select("username email restricted role")
        .exec();
    }
    if (!doctor) return res.json({ error: "Invalid account.", body: null });

    return res.status(200).json({ error: null, body: doctor });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit my profile
exports.editProfile = async (req, res) => {
  try {
    const { error, value } = validation.edit(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Hash Table for file
    const fileObj = {};
    req.files.forEach((file) => {
      fileObj[file.fieldname] = file;
    });

    // Replacing uuid with url in qualificational
    value.qualificational.docs = value.qualificational.docs.map((obj) => {
      if (uuidValidate(obj.doc)) {
        // remove previous file
        if (fileObj[obj.doc]) {
          return { ...obj, doc: fileObj[obj.doc].url };
        }
        return { ...obj, doc: null };
      }
      return obj;
    });

    // Replacing uuid with url in professional
    value.professional = value.professional.map((obj) => {
      if (uuidValidate(obj.doc)) {
        // remove previous file
        if (fileObj[obj.doc]) {
          return { ...obj, doc: fileObj[obj.doc].url };
        }
        return { ...obj, doc: null };
      }
      return obj;
    });

    const doctor = await Doctor.findByIdAndUpdate(
      req.user._id,
      { ...value },
      { new: true }
    );
    if (!doctor)
      return res.status(400).json({ error: "Invalid Account.", body: null });

    return res.status(200).json({ error: null, body: "Profile Updated" });
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

    let doctor = await Doctor.findById(req.user._id).exec();
    if (!doctor)
      return res.status(404).json({ error: "Account not found.", body: null });

    const { oldPassword, newPassword, confirmPassword } = value;
    if (newPassword !== confirmPassword)
      return res
        .status(400)
        .json({ error: "Passwords do not match.", body: null });

    const result = await compare(oldPassword, doctor.password);
    if (!result)
      return res.status(400).json({ error: "Incorrect Password.", body: null });

    const salt = await genSalt(10);
    const password = hash(newPassword, salt);
    doctor.password = password;
    doctor = await doctor.save();

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

    let doctor = await Doctor.findOne({ email: value.email }).exec();
    if (!doctor)
      return res
        .status(404)
        .json({ error: "Account not found. Check entered email.", body: null });

    doctor.resetToken = randomBytes(25);
    doctor.resetTokenValidity = new Date(Date.now() + 15 * 60 * 1000);
    // TODO Send email to doctor.email
    doctor = await doctor.save();

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

    let doctor = await Doctor.findOne({
      resetToken: token,
      resetTokenValidity: { $gte: new Date() },
    }).exec();
    if (!doctor)
      return res
        .status(404)
        .json({ error: "Invalid reset token. Try again.", body: null });

    if (value.newPassword !== value.confirmPassword)
      return res
        .status(400)
        .json({ error: "Passwords do not match.", body: null });

    const salt = await genSalt(10);
    const password = await hash(value.newPassword, salt);

    doctor.password = password;
    doctor.resetToken = null;
    doctor.resetTokenValidity = null;
    doctor = await doctor.save();

    return res
      .status(200)
      .json({ error: null, body: "Password reset successfull." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * List all enquiries
exports.listEnquiries = async (req, res) => {
  try {
    const total = await Enquiry.countDocuments();
    if ((parseInt(req.page, 10) - 1) * 20 < total) {
      const enquiries = await Enquiry.find()
        .sort("-postedOn")
        .skip((parseInt(req.page, 10) - 1) * 20)
        .limit(20)
        .exec();

      return res.status(200).json({
        error: null,
        body: { enquiries, end: true },
      });
    }

    return res.status(200).json({
      error: null,
      body: { enquiries: "No more enquiries found.", end: true },
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * View an Enquiry
exports.viewEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id).exec();
    if (!enquiry)
      return res.status(400).json({ error: "Enquiry not found.", body: null });

    return res.status(200).json({ error: null, body: enquiry });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * List all Doctors
exports.listDoctors = async (req, res) => {
  try {
    const total = await Doctor.countDocuments();
    if ((parseInt(req.page, 10) - 1) * 20 < total) {
      const doctors = await Doctor.find()
        .sort("-joinedOn")
        .skip((parseInt(req.page, 10) - 1) * 20)
        .limit(20)
        .exec();

      return res.status(200).json({
        error: null,
        body: { doctors, end: true },
      });
    }

    return res.status(200).json({
      error: null,
      body: { doctors: "No more doctors found.", end: true },
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * View a Doctor
exports.viewDoctor = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id).exec();
    if (!doctor)
      return res.status(400).json({ error: "Doctor not found.", body: null });

    const chatrooms = await ChatRoom.find({
      "partner.id": doctor._id,
      "partner.model": "Doctor",
    })
      .select("user partner blocked")
      .populate("user.id", "username email")
      .populate("partner.id", "username email")
      .exec();

    doctor.chatrooms = chatrooms;
    return res.status(200).json({ error: null, body: doctor });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
