const mongoose = require("mongoose");

const questionSetSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      unique: true,
    },
    questions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question",
      },
    ],
    lastAnswered: {
      type: Date,
      default: null,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);
module.exports = QuestionSet;
