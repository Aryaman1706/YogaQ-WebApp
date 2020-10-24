const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    sender: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "sender.model",
        required: true,
      },
      model: {
        type: String,
        enum: ["User", "Admin", "Doctor"],
        required: true,
      },
    },
    text: {
      type: String,
      default: null,
    },
    file: {
      type: String,
      default: null,
    },
    urlEmbeds: {
      title: {
        type: String,
        default: null,
      },
      description: {
        type: String,
        default: null,
      },
      image: {
        type: String,
        default: null,
      },
    },
    time: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
