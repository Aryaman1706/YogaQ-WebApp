const mongoose = require("mongoose");
const Message = require("./message");

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

// Indexes
chatroomSchema.index(
  {
    "partner.id": 1,
    "user.id": 1,
  },
  { unique: true }
);

// Unread Messages count virtual
chatroomSchema.virtual("unreadMessages", {
  ref: "Message",
  localField: "_id",
  foreignField: "chatroomId",
  count: true,
});

// Calls associated with chatroom virtual
chatroomSchema.virtual("call", {
  ref: "Call",
  localField: "_id",
  foreignField: "chatroomId",
});

// QuestionSet associated with chatroom virtual
chatroomSchema.virtual("questionSet", {
  ref: "QuestionSet",
  localField: "_id",
  foreignField: "chatroomId",
});

// Deleting messages if chatroom is deleted
chatroomSchema.post("remove", async (doc, next) => {
  await Message.remove({ chatroomId: doc._id });
  next();
});

const ChatRoom = mongoose.model("ChatRoom", chatroomSchema);
module.exports = ChatRoom;
