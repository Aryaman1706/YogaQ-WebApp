const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionSetId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionId",
  },
  statement: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
    default: [],
    min: 4,
  },
  active: {
    type: Boolean,
    default: true,
  },
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
