const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  // Profile
  username: {
    type: String,
    minlength: 3,
    maxlength: 150,
    required: true,
  },
  phoneNumber: {
    type: String,
    match: /[1-9]{1}[0-9]{9}/,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
  },
  country: {
    type: String,
    maxlength: 150,
    required: true,
  },
  languages: [
    {
      type: String,
      maxlength: 20,
    },
  ],
  description: {
    type: String,
    maxlength: 200,
    required: true,
  },
  // Auth
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
  // Details
  qualificational: {
    educationalQualification: [
      {
        type: String,
        enum: ["certificate", "diploma", "degree", "graduation", "phd"],
      },
    ],
    docs: [
      {
        name: {
          type: String,
          required: true,
        },
        institute: {
          type: String,
          required: true,
        },
        doc: {
          // File
          type: String,
          default: null,
        },
      },
    ],
  },
  professional: [
    {
      place: {
        type: String,
        required: true,
      },
      clients: {
        type: Number,
        required: true,
      },
      noOfYears: {
        type: Number,
        min: 0,
        required: true,
      },
      doc: {
        // File
        type: String,
        default: null,
      },
    },
  ],
  expertise: {
    type: String,
    maxlength: 200,
    required: true,
  },
  welcomeMessage: {
    type: String,
    maxlength: 200,
    default: "Hello! This is a welcome message.",
  },
  // Admin Access
  restricted: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ["admin", "doctor", "user"],
    default: "doctor",
  },
  joinedOn: {
    type: Date,
    default: new Date(),
  },
});

const Doctor = mongoose.model("Doctor", doctorSchema);

module.exports = Doctor;
