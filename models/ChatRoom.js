const mongoose = require("mongoose");
const Message = require("./Message");

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
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

chatroomSchema.index(
  {
    doctorId: 1,
    userId: 1,
  },
  { unique: true }
);

chatroomSchema.virtual("unreadMessages", {
  ref: "Message",
  localField: "_id", // ! Might cause an error. Try switching
  foreignField: "chatroomId",
  count: true,
});

chatroomSchema.virtual("call", {
  ref: "Call",
  localField: "_id", // ! Might cause an error. Try switching
  foreignField: "chatroomId",
});

chatroomSchema.post("remove", async (doc, next) => {
  await Message.remove({ chatroomId: doc._id });
  next();
});

const ChatRoom = mongoose.model("ChatRoom", chatroomSchema);
module.exports = ChatRoom;
