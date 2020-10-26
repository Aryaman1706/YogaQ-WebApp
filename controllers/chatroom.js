// * NPM Packages

// * Models
const ChatRoom = require("../models/ChatRoom");
const Message = require("../models/Message");
const User = require("../models/User");
const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");

// * Utils
const validation = require("../validationSchemas/chatroom");

// * Controllers -->

// * Create a Chat Room
exports.create = async (req, res) => {
  try {
    const { error, value } = validation.create(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    const user = await User.findById(value.user.id).exec();
    const partner =
      value.partner.model === "Admin"
        ? await Admin.findById(value.partner.id).exec()
        : await Doctor.findById(value.partner.id).exec();

    if (!user || !partner)
      return res
        .status(400)
        .json({ error: "Invalid User or Partner", body: null });

    await ChatRoom.create(value);
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
    const chatroom = await ChatRoom.findById(req.params.id)
      .populate("user.id", "username email")
      .populate("partner.id", "username email")
      .exec();
    if (!chatroom)
      return res.status(404).json({ error: "ChatRoom Not Found.", body: null });

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
    const chatroom = await ChatRoom.findById(req.params.id)
      .select("messages")
      .exec();
    if (!chatroom || parseInt(req.query.page, 10) >= 1)
      return res.status(404).json({ error: "Invalid Request.", body: null });

    if (parseInt(req.query.page, 10) * 50 < chatroom.messages.length) {
      const messages = await Message.find({ chatroomId: chatroom._id })
        .sort("-time")
        .skip((parseInt(req.query.page, 10) - 1) * 50)
        .limit(50)
        .exec();

      return res.status(200).json({ error: null, body: messages });
    }
    return res
      .status(400)
      .json({ error: null, body: "No More Messages Found." });
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
    const { error, value } = validation.edit(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

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

    return res
      .status(200)
      .json({ error: null, body: "Last Opended Updated Successfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
