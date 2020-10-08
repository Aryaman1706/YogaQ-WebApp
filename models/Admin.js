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
      match: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
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
      maxlength: 200,
      default: null,
    },
    role: {
      type: String,
      enum: ["admin", "doctor", "user"],
      default: "admin",
      immutable: true,
    },
  },
  { timestamps: true }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
