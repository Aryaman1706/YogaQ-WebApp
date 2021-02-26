// * Models
const Call = require("./models");
const {
  models: { Chatroom },
} = require("../chatroom");
const {
  models: { Doctor },
} = require("../doctor");

// * Utils
const validators = require("./validators");

// * Controllers -->

// * List all Calls
exports.list = async (req, res) => {
  try {
    // Validating request query
    const { error, value } = validators.page(req.query);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Paginating calls
    const total = await Call.countDocuments({ chatroomId: req.params.id });
    const limit = 5;
    if ((parseInt(value.page, 10) - 1) * limit < total) {
      const calls = await Call.find({ chatroomId: req.params.id })
        .sort("time")
        .skip((parseInt(value.page, 10) - 1) * limit)
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

// * Request a call for chatroom
exports.request = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.request(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Finding valid chatroom for active user
    const chatroom = await Chatroom.findById(value.chatroomId).exec();
    if (!chatroom || !chatroom.user.id.equals(req.user._id))
      return res.status(400).json({ error: "Invalid Request.", body: null });

    // Creating new call
    const call = await Call.create(value);
    return res.status(200).json({ error: null, body: call });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit call time
exports.edit = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.edit(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Finding valid call by req.params.id
    let call = await Call.findById(req.params.id)
      .populate("chatroomId", "user")
      .exec();

    // Validating call details
    if (!call || !call.chatroomId.user.id.equals(req.user._id))
      return res.status(400).json({ error: "Invalid Request.", body: null });
    if (call.accepted || call.completed)
      return res.status(400).json({
        error: "Call has already been accepted/completed.",
        body: null,
      });

    // Storing and saving new call time
    call.time = value.time;
    call = await call.save();
    return res.status(200).json({ error: null, body: call });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Cancel the requested call
exports.cancel = async (req, res) => {
  try {
    // Finding valid call
    const call = await Call.findById(req.params.id)
      .populate("chatroomId", "user")
      .exec();

    // Verifying call details
    if (
      !call ||
      !call.chatroomId.user.id.equals(req.user._id) ||
      call.completed
    )
      return res.status(400).json({
        error: "Invalid request. Call does not exist or it is completed",
        body: null,
      });

    // Deleting the call
    await call.delete();

    return res
      .status(200)
      .json({ error: null, body: "Call deleted successfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Accept the call request
exports.accept = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.accept(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Finding valid call
    let call = await Call.findById(req.params.id)
      .populate("chatroomId", "partner")
      .exec();

    // Validating call details
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

    // Storing and saving new call details
    call.accepted = value.accepted;
    call = await call.save();
    return res.status(200).json({ error: null, body: call });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Mark the call as completed
exports.complete = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.complete(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Finding valid call
    let call = await Call.findById(req.params.id)
      .populate("chatroomId", "partner")
      .exec();

    // Validating call details
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

    // Storing and saving new call details
    call.completed = value.completed;
    call = await call.save();
    return res.status(200).json({ error: null, body: call });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * List calls of any doctor
exports.listCalls = async (req, res) => {
  try {
    // Validating request query
    const { error, value } = validators.listCalls(req.query);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    // Finding valid doctor and associated chatrooms
    const [doctor, chatrooms] = await Promise.all([
      Doctor.findById(req.params.doctorId).exec(),
      Chatroom.find({
        "partner.id": req.params.doctorId,
        "partner.model": "Doctor",
      })
        .select("_id user")
        .populate("user.id", "username email")
        .exec(),
    ]);
    if (!doctor)
      return res.status(404).json({ error: "Invalid Doctor.", body: null });

    if (!chatrooms || chatrooms.length === 0)
      return res
        .status(404)
        .json({ error: "No associated chatrooms", body: null });

    // Formatting chatrooms
    const chatroomIdList = [];
    const chatroomMap = {};
    chatrooms.forEach((obj) => {
      chatroomIdList.push(obj._id);
      chatroomMap[obj._id] = {
        username: obj.user.id.username,
        email: obj.user.id.email,
      };
    });

    // Paginating calls
    const limit = 2;
    const [result] = await Call.aggregate([
      {
        $match: {
          chatroomId: { $in: chatroomIdList },
          time: { $gte: value.startDate, $lte: value.endDate },
        },
      },
      {
        $facet: {
          metadata: [{ $count: "total" }],
          chatrooms: [
            { $sort: { time: -1 } },
            { $skip: (parseInt(value.page, 10) - 1) * limit },
            { $limit: limit },
            { $group: { _id: "$chatroomId", calls: { $push: "$$ROOT" } } },
          ],
        },
      },
      {
        $project: {
          chatrooms: 1,
          total: { $arrayElemAt: ["$metadata.total", 0] },
        },
      },
    ]);

    // Formatting and calculating response
    let callCount = 0;
    const calls = result.chatrooms.map((obj) => {
      callCount += obj.calls.length;
      return {
        ...obj,
        partner: chatroomMap[obj._id],
      };
    });

    return res.status(200).json({
      error: null,
      body: { calls, end: callCount === 0 || callCount < limit },
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
