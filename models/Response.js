const mongoose = require("mongoose");

const responseSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: new Date(),
  },
  responses: {
    type: Map,
    of: Array,
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
