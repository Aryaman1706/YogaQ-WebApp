const mongoose = require("mongoose");
const QuestionSet = require("./QuestionSet");

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
});

questionSchema.post("remove", async (doc, next) => {
  await QuestionSet.update(
    { questions: doc._id },
    { $pull: { questions: doc._id } },
    { multi: true }
  );

  next();
});

const Question = mongoose.model("Question", questionSchema);
module.exports = Question;
