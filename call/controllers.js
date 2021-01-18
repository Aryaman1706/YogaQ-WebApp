// * Models
const Call = require("./models");
const ChatRoom = require("../chatroom/models/chatroom");

// * Utils
const validators = require("./validators");

// * Controllers -->

// * List all Calls
exports.list = async (req, res) => {
  try {
    const total = await Call.countDocuments({ chatroomId: req.params.id });
    const limit = 5;
    if ((parseInt(req.query.page, 10) - 1) * limit < total) {
      const calls = await Call.find({ chatroomId: req.params.id })
        .sort("time")
        .skip((parseInt(req.query.page, 10) - 1) * limit)
        .limit(limit)
        .exec();

      return res.status(200).json({
        error: null,
        body: { calls, end: calls.length < limit },
      });
    }

    return res.status(200).json({
      error: null,
      body: { calls: [], end: true },
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Request a Call
exports.request = async (req, res) => {
  try {
    const { error, value } = validators.request(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    const chatroom = await ChatRoom.findById(value.chatroomId).exec();
    if (!chatroom || !chatroom.user.id.equals(req.user._id))
      return res.status(400).json({ error: "Invalid Request.", body: null });

    const call = await Call.create(value);
    return res.status(200).json({ error: null, body: call });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit Call (Change Time)
exports.edit = async (req, res) => {
  try {
    const { error, value } = validators.edit(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    let call = await Call.findById(req.params.id)
      .populate("chatroomId", "user")
      .exec();
    if (!call || !call.chatroomId.user.id.equals(req.user._id))
      return res.status(400).json({ error: "Invalid Request.", body: null });
    if (call.accepted || call.completed)
      return res.status(400).json({
        error: "Call has already been accepted/completed.",
        body: null,
      });
    call.time = value.time;
    call = await call.save();
    return res.status(200).json({ error: null, body: call });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Accept Call Request
exports.accept = async (req, res) => {
  try {
    const { error, value } = validators.accept(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    let call = await Call.findById(req.params.id)
      .populate("chatroomId", "partner")
      .exec();

    if (
      !call ||
      !call.chatroomId.partner.id.equals(req.user._id) ||
      call.completed ||
      new Date() > call.time
    )
      return res.status(400).json({
        error:
          "Invalid Request. Either call has already been completed or you are attemting to accept it after the scheduled time.",
        body: null,
      });
    call.accepted = value.accepted;
    call = await call.save();
    return res.status(200).json({ error: null, body: call });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Mark Call As Complete
exports.complete = async (req, res) => {
  try {
    const { error, value } = validators.complete(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    let call = await Call.findById(req.params.id)
      .populate("chatroomId", "partner")
      .exec();
    if (
      !call ||
      !call.chatroomId.partner.id.equals(req.user._id) ||
      !call.accepted ||
      new Date() < call.time
    )
      return res.status(400).json({
        error:
          "Invalid Request. Either you have not accepted the call or are attempting to mark it completed before the scheduled time.",
        body: null,
      });

    call.completed = value.completed;
    call = await call.save();
    return res.status(200).json({ error: null, body: call });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
