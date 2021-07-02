const mongoose = require("mongoose");

const linkSchema = new mongoose.Schema({
  links: [
    {
      url: String,
      thumbnail: String,
    },
  ],
  enabled: Boolean,
});

const Link = mongoose.model("Link", linkSchema);

module.exports = Link;
