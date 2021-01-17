const mongoose = require("mongoose");

const questionSetSchema = new mongoose.Schema({
  chatroomId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chatroom",
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
});

questionSetSchema.virtual("responses", {
  ref: "Response",
  localField: "_id",
  foreignField: "questionSet",
  justOne: true,
});

const QuestionSet = mongoose.model("QuestionSet", questionSetSchema);
module.exports = QuestionSet;
