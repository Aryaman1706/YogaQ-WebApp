const mongoose = require("mongoose");

const callSchema = new mongoose.Schema(
  {
    chatroomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ChatRoom",
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    accepted: {
      type: Boolean,
      default: false,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

callSchema.index({ chatroomId: 1 });

const Call = mongoose.model("Call", callSchema);
module.exports = Call;
