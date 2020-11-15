const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      minlength: 3,
      maxlength: 150,
      required: true,
    },
    phoneNumber: {
      type: String,
    },
    age: {
      type: Number,
      required: true,
    },
    gender: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      maxlength: 150,
    },
    email: {
      type: String,
      maxlength: 200,
      required: true,
      unique: true,
    },
    complete: {
      type: Boolean,
      default: false,
    },
    questionSet: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "QuestionSet",
      // unique: true,
    },
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    role: {
      type: String,
      enum: ["admin", "doctor", "user"],
      default: "user",
      immutable: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
