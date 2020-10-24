const mongoose = require("mongoose");

const chatroomSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
    partner: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "partner.model",
      },
      model: {
        type: String,
        enum: ["Doctor", "Admin"],
      },
    },
    blocked: {
      type: Boolean,
      default: true,
    },
    lastOpened: {
      partner: {
        type: Date,
        default: null,
      },
      user: {
        type: Date,
        default: null,
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

chatroomSchema.index(
  {
    doctorId: 1,
    userId: 1,
  },
  { unique: true }
);

const ChatRoom = mongoose.model("ChatRoom", chatroomSchema);
module.exports = ChatRoom;
