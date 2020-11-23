// * NPM Packages

// * Models
const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
const User = require("../models/User");
const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");

// * Utils
const validation = require("../validationSchemas/chatroom");
const { idIsPresent } = require("../utils/functions");

// * Controllers -->

// * Create a Chat Room
exports.create = async (req, res) => {
  try {
    const { error, value } = validation.create(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    const userPromise = User.findOne({ email: value.user }).exec();
    const partnerPromise =
      value.partnerModel === "Admin"
        ? Admin.findOne({ email: value.partner }).exec()
        : Doctor.findOne({ email: value.partner }).exec();

    const [user, partner] = await Promise.all([userPromise, partnerPromise]);
    if (!user || !partner)
      return res.status(400).json({
        error: "Validation Error. Invalid User or Partner. Check email ids",
        body: null,
      });

    const existingChatroom = await ChatRoom.findOne({
      "user.id": user._id,
      "partner.id": partner._id,
      "partner.model": value.partnerModel,
    }).exec();
    if (existingChatroom || idIsPresent(user.doctors, partner._id))
      return res.status(400).json({
        error: "Validation Error. Chatroom between these two already exists.",
        body: null,
      });
    user.doctors.push(partner._id);
    await Promise.all([
      ChatRoom.create({
        user: {
          id: user._id,
        },
        partner: {
          id: partner._id,
          model: value.partnerModel,
        },
        blocked: value.blocked,
      }),
      user.save(),
    ]);
    return res
      .status(200)
      .json({ error: null, body: "ChatRoom created succesfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get a Chat Room
exports.get = async (req, res) => {
  try {
    const chatroom = await ChatRoom.findById(req.params.id).exec();
    console.log(
      chatroom.user.id.equals(req.user._id),
      chatroom.partner.id.equals(req.user._id)
    );
    if (!chatroom) {
      req.session.active_chatroom = null;
      return res.status(404).json({ error: "Invalid Request", body: null });
    }
    if (
      !chatroom.user.id.equals(req.user._id) &&
      !chatroom.partner.id.equals(req.user._id)
    ) {
      req.session.active_chatroom = null;
      return res.status(404).json({ error: "Invalid Request", body: null });
    }

    // * Set Cookies for subsequent requests
    req.session.active_chatroom = {
      chatroomId: chatroom._id,
      userId: chatroom.user.id,
      partnerId: chatroom.partner.id,
    };

    const lastAccess =
      req.user.role === "user"
        ? chatroom.lastOpened.user
        : chatroom.lastOpened.partner;

    await chatroom
      .populate("user.id", "username email")
      .populate("partner.id", "username email")
      .populate({
        path: "unreadMessages",
        match: { time: { $gt: lastAccess } },
      })
      .execPopulate();

    return res.status(200).json({
      error: null,
      body: chatroom,
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get Messages
exports.messages = async (req, res) => {
  try {
    const limit = 5;
    const totalMessages = await Message.countDocuments({
      chatroomId: req.params.id,
    });
    if ((parseInt(req.query.page, 10) - 1) * limit < totalMessages) {
      let messages = await Message.find({ chatroomId: req.params.id })
        .sort("time")
        .skip((parseInt(req.query.page, 10) - 1) * limit)
        .limit(limit)
        .exec();
      messages = messages.reverse();
      return res.status(200).json({
        error: null,
        body: {
          messages,
          end: messages.length < limit,
        },
      });
    }
    return res.status(400).json({
      error: null,
      body: { messages: [], end: true },
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit Chat Room
exports.edit = async (req, res) => {
  try {
    const { error, value } = validation.edit(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    const chatroom = await ChatRoom.findByIdAndUpdate(
      req.params.id,
      { ...value },
      {
        new: true,
      }
    ).exec();
    if (!chatroom)
      return res.status(404).json({ error: "ChatRoom Not Found.", body: null });

    return res.status(200).json({ error: null, body: "Updated Successfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Modify Last Access
exports.lastAccess = async (req, res) => {
  try {
    const { error, value } = validation.lastAccess(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    const obj =
      req.user.role === "user"
        ? { "lastOpened.user": value.lastAccess }
        : { "lastOpened.partner": value.lastAccess };

    const chatroom = await ChatRoom.findByIdAndUpdate(
      req.params.id,
      { ...obj },
      { new: true }
    ).exec();
    if (!chatroom)
      return res.status(404).json({ error: "ChatRoom Not Found.", body: null });

    req.session.active_chatroom = null;
    return res
      .status(200)
      .json({ error: null, body: "Last Opended Updated Successfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
