const { genSalt, hash, compare } = require("bcryptjs");
const { randomBytes } = require("crypto");
const { validate: uuidValidate } = require("uuid");

// * Models
const { Doctor, Enquiry } = require("./models");
const {
  models: { Chatroom },
} = require("../chatroom");

// * Utils
const validators = require("./validators");

// * Controllers -->

// * Create a new enquiry
exports.newEnquiry = async (req, res) => {
  try {
    // Validating request body
    const body = {
      ...req.body,
      languages: JSON.parse(req.body.languages),
      qualificational: JSON.parse(req.body.qualificational),
      professional: JSON.parse(req.body.professional),
    };
    const { error, value } = validators.enquiry(body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    // Finding valid enquiry
    if (await Enquiry.findOne({ email: value.email }).exec())
      return res.status(400).json({
        error:
          "Validation Error. An application with same email address already exist.",
        body: null,
      });

    // Hash Table for file
    const fileObj = {};
    req.files.forEach((file) => {
      fileObj[file.fieldname] = file;
    });

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

    // Creating new enquiry
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
    // Validating request body
    const { error, value } = validators.register(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    // Finding valid enquiry
    const enquiry = await Enquiry.findById(value.enquiry).exec();
    if (!enquiry)
      return res.status(404).json({ error: "Invalid Enquiry.", body: null });

    // Hashing the password
    const salt = await genSalt(10);
    const password = await hash(value.password, salt);

    // Creting new Doctor and deleting enquiry
    const body = { ...enquiry.toObject(), postedOn: undefined };
    await Promise.all([Doctor.create({ ...body, password }), enquiry.remove()]);

    return res
      .status(200)
      .json({ error: null, body: "New Doctor registered successfully." });
  } catch (error) {
    console.log("Error occured here\n");
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// ! TODO:- Delete the documents
// * Deny an enquiry
exports.denyEnquiry = async (req, res) => {
  try {
    // Finding and deleting valid enquiry
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

// * Get profile of currently logged in doctor
exports.myProfile = async (req, res) => {
  try {
    // Validating request query
    const { error, value } = validators.completeQuery(req.query);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    // Finding valid doctor
    let doctor = null;
    if (value.complete) {
      doctor = await Doctor.findById(req.user._id)
        .select("-password -resetToken -resetTokenValidity")
        .exec();
    } else {
      doctor = await Doctor.findById(req.user._id)
        .select("username email restricted role joinedOn")
        .exec();
    }
    if (!doctor)
      return res.status(404).json({ error: "Invalid account.", body: null });

    return res.status(200).json({ error: null, body: doctor });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit profile of currently logged in doctor
exports.editProfile = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.edit(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    // Hash Table for file
    const fileObj = {};
    req.files.forEach((file) => {
      fileObj[file.fieldname] = file;
    });

    // Replacing uuid with url in qualificational
    value.qualificational.docs = value.qualificational.docs.map((obj) => {
      if (uuidValidate(obj.doc)) {
        // Remove previous file
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
        // Remove previous file
        if (fileObj[obj.doc]) {
          return { ...obj, doc: fileObj[obj.doc].url };
        }
        return { ...obj, doc: null };
      }
      return obj;
    });

    // Finding and updating doctor
    const doctor = await Doctor.findByIdAndUpdate(
      req.user._id,
      { ...value },
      { new: true }
    )
      .select("username email restricted role")
      .exec();
    if (!doctor)
      return res.status(400).json({ error: "Invalid Account.", body: null });

    return res.status(200).json({
      error: null,
      body: { doctor, message: "Profile Updated Successfully." },
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Change password of currently logged in doctor
exports.changePassword = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.changePassword(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    // Finding valid doctor
    const doctor = await Doctor.findById(req.user._id).exec();
    if (!doctor)
      return res.status(404).json({ error: "Account not found.", body: null });

    const { oldPassword, newPassword, confirmPassword } = value;

    // Validating newPassword and confirmPassword
    if (newPassword !== confirmPassword)
      return res.status(400).json({
        error: "Validation Error. Passwords do not match.",
        body: null,
      });

    // Comparing user-supplied password with hashed password in DB
    const result = await compare(oldPassword, doctor.password);
    if (!result)
      return res
        .status(400)
        .json({ error: "Validation Error. Incorrect Password.", body: null });

    // Hashing and storing newPassword
    const salt = await genSalt(10);
    const password = hash(newPassword, salt);
    doctor.password = password;
    await doctor.save();

    return res
      .status(200)
      .json({ error: null, body: "Password changed successfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get chatrooms of logged in doctor
exports.myChatrooms = async (req, res) => {
  try {
    // Finding all chatrooms loggend in doctor is part of
    const chatrooms = await Chatroom.find({
      "partner.id": req.user._id,
      "partner.model": "Doctor",
    }).exec();
    const promiseArray = [];

    // Populating chatroom with required data
    chatrooms.forEach((doc) => {
      const pro = doc
        .populate("user.id", "username email")
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

// * Enter email to get password reset token
exports.forgotPassword1 = async (req, res) => {
  try {
    const { error, value } = validators.forgotPassword1(req.body);
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

// * Enter new password
exports.forgotPassword2 = async (req, res) => {
  try {
    const { error, value } = validators.forgotPassword2(req.body);
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
    // Validating request query
    const { error, value } = validators.pageQuery(req.query);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Paginating enquiries
    const limit = 5;
    const total = await Enquiry.estimatedDocumentCount();
    if ((parseInt(value.page, 10) - 1) * limit < total) {
      const enquiries = await Enquiry.find()
        .select("postedOn username email")
        .sort("-postedOn")
        .skip((parseInt(value.page, 10) - 1) * limit)
        .limit(limit)
        .exec();

      return res.status(200).json({
        error: null,
        body: { enquiries, end: enquiries.length < limit },
      });
    }

    return res.status(200).json({
      error: null,
      body: { enquiries: [], end: true },
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * View an Enquiry
exports.viewEnquiry = async (req, res) => {
  try {
    // Finding valid enquiry
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
    // Validating request query
    const { error, value } = validators.pageQuery(req.query);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Paginating doctors
    const total = await Doctor.estimatedDocumentCount();
    const limit = 5;
    if ((parseInt(value.page, 10) - 1) * limit < total) {
      const doctors = await Doctor.find()
        .select("username email joinedOn")
        .sort("-joinedOn")
        .skip((parseInt(value.page, 10) - 1) * limit)
        .limit(limit)
        .exec();

      return res.status(200).json({
        error: null,
        body: { doctors, end: doctors.length < limit },
      });
    }

    return res.status(200).json({
      error: null,
      body: { doctors: [], end: true },
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * View a Doctor
// TODO :- It might be better to paginate/limit chatrooms and calls
exports.viewDoctor = async (req, res) => {
  try {
    // Finding valid doctor and associated chatrooms
    const [doctor, chatrooms] = await Promise.all([
      Doctor.findById(req.params.id)
        .select("-password -resetToken -resetTokenValidity")
        .exec(),
      Chatroom.find({
        "partner.id": req.params.id,
        "partner.model": "Doctor",
      })
        .select("user partner blocked createdAt")
        .sort("-createdAt")
        .populate("user.id", "username email")
        .populate({
          path: "call",
          select: "time accepted completed",
          sort: "-time",
        })
        .exec(),
    ]);
    if (!doctor)
      return res.status(400).json({ error: "Doctor not found.", body: null });

    return res.status(200).json({ error: null, body: { doctor, chatrooms } });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
