const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
    },
    blocked: {
      type: Boolean,
      default: true,
    },
    lastOpened: {
      doctor: {
        type: Date,
      },
      user: {
        type: Date,
      },
    },
    messages: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);

const ChatRoom = mongoose.model("ChatRoom", chatroomSchema);
module.exports = ChatRoom;
