// * Models
const { Chatroom, Message } = require("./models");
const { models: User } = require("../user");
const { models: Admin } = require("../admin");
const {
  models: { Doctor },
} = require("../doctor");

// * Utils
const validators = require("./validators");
const { objectIdToStringArray } = require("../utils/functions");

// * Controllers -->

// * Create a new chatroom
exports.create = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.create(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    // Verifying user and partner accounts
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

    // Checking for existing chatroom if any
    const existingChatroom = await Chatroom.findOne({
      "user.id": user._id,
      "partner.id": partner._id,
      "partner.model": value.partnerModel,
    }).exec();
    if (
      existingChatroom ||
      objectIdToStringArray(user.doctors).includes(partner._id)
    )
      return res.status(400).json({
        error: "Validation Error. Chatroom between these two already exists.",
        body: null,
      });

    // Adding partner (if doctor) to user.doctors array
    if (value.partnerModel === "Doctor") {
      user.doctors.push(partner._id);
      user.markModified("doctors");
    }

    // Creating new chatroom and saving user
    const [newChatroom] = await Promise.all([
      Chatroom.create({
        user: {
          id: user._id,
        },
        partner: {
          id: partner._id,
          model: value.partnerModel,
        },
        blocked: value.blocked,
        lastOpened: {
          partner: new Date(),
          user: new Date(),
        },
      }),
      user.save(),
    ]);

    // Creating a welcome message
    await Message.create({
      chatroomId: newChatroom._id,
      sender: {
        id: partner._id,
        model: value.partnerModel,
      },
      text: partner.welcomeMessage,
      time: new Date(),
    });

    return res
      .status(200)
      .json({ error: null, body: "Chatroom created succesfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get a Chat Room
exports.get = async (req, res) => {
  try {
    // Validating request query
    const { error, value } = validators.populate(req.query);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    // Finding valid chatroom
    const chatroom = await Chatroom.findById(req.params.id).exec();
    if (!chatroom) {
      // Clearing session
      req.session.active_chatroom = null;
      return res.status(404).json({ error: "Invalid Request", body: null });
    }

    // Checking for autherized user/partner
    if (
      !chatroom.user.id.equals(req.user._id) &&
      !chatroom.partner.id.equals(req.user._id)
    ) {
      // Clearing session
      req.session.active_chatroom = null;
      return res.status(404).json({ error: "Invalid Request", body: null });
    }

    // Set Cookies for subsequent requests
    req.session.active_chatroom = {
      chatroomId: chatroom._id,
      userId: chatroom.user.id,
      partnerId: chatroom.partner.id,
    };

    // Populating if required
    if (value.populate) {
      const lastAccess =
        req.user.role === "user"
          ? chatroom.lastOpened.user
          : chatroom.lastOpened.partner;

      // Populating required data in existing chatroom
      await chatroom
        .populate("user.id", "username email")
        .populate(
          "partner.id",
          "username email profilePicture role description"
        )
        .populate({
          path: "unreadMessages",
          match: { time: { $gt: lastAccess } },
        })
        .execPopulate();
    }

    return res.status(200).json({
      error: null,
      body: chatroom,
    });
  } catch (error) {
    // Clearing session
    req.session.active_chatroom = null;
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Clear active_chatroom session
exports.clear = async (req, res) => {
  try {
    // Clearing session
    req.session.active_chatroom = null;

    return res
      .status(200)
      .json({ error: null, body: "Active Chatroom session cleared." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get messages of active chatroom
exports.messages = async (req, res) => {
  try {
    // Validating query parameters
    const { error, value } = validators.getMessages(req.query);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Paginating messages
    const limit = 5;
    const totalMessages = await Message.countDocuments({
      chatroomId: req.params.id,
    });
    if ((parseInt(value.page, 10) - 1) * limit < totalMessages) {
      const messages = await Message.find({ chatroomId: req.params.id })
        .sort("-time")
        .skip((parseInt(value.page, 10) - 1) * limit)
        .limit(limit)
        .exec();
      return res.status(200).json({
        error: null,
        body: {
          messages,
          end: messages.length < limit,
        },
      });
    }
    return res.status(200).json({
      error: null,
      body: { messages: [], end: true },
    });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit existing chatroom
exports.edit = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.edit(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    // Finding and updating chatroom
    const chatroom = await Chatroom.findByIdAndUpdate(
      req.params.id,
      { ...value },
      {
        new: true,
      }
    ).exec();

    // Checking for valid chatroom
    if (!chatroom)
      return res.status(404).json({ error: "Chatroom Not Found.", body: null });

    return res.status(200).json({ error: null, body: "Updated Successfully." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Change the last access of chatroom
exports.lastAccess = async (req, res) => {
  try {
    // Validating request body
    const { error, value } = validators.lastAccess(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    const obj =
      req.user.role === "user"
        ? { "lastOpened.user": value.lastAccess }
        : { "lastOpened.partner": value.lastAccess };

    // Finding and updating chatroom
    const chatroom = await Chatroom.findByIdAndUpdate(
      req.params.id,
      { ...obj },
      { new: true }
    ).exec();
    if (!chatroom)
      return res.status(404).json({ error: "Chatroom Not Found.", body: null });

    // Clearing session
    req.session.active_chatroom = null;
    return res
      .status(200)
      .json({ error: null, body: "Last Opended Updated Successfully." });
  } catch (error) {
    // Clearing session
    req.session.active_chatroom = null;
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
