const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  questionSet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "QuestionSet",
  },
  date: {
    type: Date,
    default: new Date(),
  },
  responses: {
    type: Map,
    of: String,
  },
});

responseSchema.index(
  {
    date: 1,
  },
  { expires: "120d" }
);

const Response = mongoose.model("Response", responseSchema);
module.exports = Response;
