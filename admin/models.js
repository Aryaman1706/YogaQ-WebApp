const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 150,
      required: true,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      maxlength: 150,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    resetToken: {
      type: String,
      max: 50,
      default: null,
    },
    resetTokenValidity: {
      type: Date,
      default: null,
    },
    welcomeMessage: {
      type: String,
      maxlength: 500,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "user"],
      default: "admin",
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
