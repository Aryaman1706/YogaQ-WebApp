const mongoose = require("mongoose");
const Message = require("./Message");

const chatroomSchema = new mongoose.Schema(
  {
    user: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
    partner: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: "partner.model",
        required: true,
      },
      model: {
        type: String,
        enum: ["Doctor", "Admin"],
        required: true,
      },
    },
    blocked: {
      type: Boolean,
      default: false,
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
    "partner.id": 1,
    "user.id": 1,
  },
  { unique: true }
);

chatroomSchema.virtual("unreadMessages", {
  ref: "Message",
  localField: "_id",
  foreignField: "chatroomId",
  count: true,
});

chatroomSchema.virtual("call", {
  ref: "Call",
  localField: "_id",
  foreignField: "chatroomId",
});

chatroomSchema.post("remove", async (doc, next) => {
  await Message.remove({ chatroomId: doc._id });
  next();
});

const ChatRoom = mongoose.model("ChatRoom", chatroomSchema);
module.exports = ChatRoom;
