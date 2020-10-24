// * NPM Packages

// * Models
const ChatRoom = require("../models/ChatRoom");
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
      .populate({
        path: "messages",
        sort: "-time",
        limit: 50,
      })
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

// * Get more messages
// TODO
exports.messages = async (req, res) => {
  try {
    return res.status(200).json({ error: null, body: null });
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
    const chatroom = await ChatRoom.findById(req.params.id).exec();
    if (!chatroom)
      return res.status(404).json({ error: "ChatRoom Not Found.", body: null });

    if (req.user.role === "user") {
      chatroom.lastOpened.user = value.lastAccess;
    } else {
      chatroom.lastOpened.partner = value.lastAccess;
    }
    await chatroom.save();
    return res
      .status(200)
      .json({ error: null, body: "Last Opended Updated Successfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
