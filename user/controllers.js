const queryString = require("query-string");

// * Models
const User = require("./models");
const {
  models: { Chatroom, Message },
} = require("../chatroom");
const { models: Admin } = require("../admin");

// * Utils
const validators = require("./validators");
const { getAccessToken, getProfile } = require("../utils/oauth");

// * Controllers -->

// * List all users
exports.listUser = async (req, res) => {
  try {
    const total = await User.estimatedDocumentCount();
    const limit = 5;
    if ((parseInt(req.query.page, 10) - 1) * limit < total) {
      const users = await User.find()
        .select("username email createdAt")
        .sort("createdAt")
        .skip((parseInt(req.query.page, 10) - 1) * limit)
        .limit(limit)
        .exec();

      return res.status(200).json({
        error: null,
        body: { users, end: users.length < limit },
      });
    }

    return res.status(200).json({
      error: null,
      body: { users: [], end: true },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * View a user
exports.viewUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate("doctors", "email username")
      .exec();
    if (!user)
      return res.status(400).json({ error: "User not found.", body: null });

    const chatrooms = await Chatroom.find({
      "user.id": user._id,
    })
      .select("user partner blocked createdAt")
      .populate("partner.id", "username email")
      .populate({
        path: "call",
        select: "time",
        sort: "-time",
      })
      .exec();

    return res.status(200).json({ error: null, body: { user, chatrooms } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get my profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    if (!user)
      return res.status(404).json({ error: "User not found.", body: null });
    if (!user.complete) {
      const query = user.phoneNumber ? "country" : "country-phoneNumber";
      return res
        .status(401)
        .json({ error: "Incomplete Profile.", body: query });
    }

    return res.status(200).json({ error: null, body: user });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit profile
exports.editProfile = async (req, res) => {
  try {
    const { error, value } = validators.edit(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: error.details[0].message, body: null });

    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      { ...value },
      { new: true }
    ).exec();
    if (!updatedUser)
      return res.status(404).json({ error: "User not found.", body: null });

    return res.status(200).json({
      error: null,
      body: { user: updatedUser, message: "Profile Updated Successfully." },
    });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Block/Unblock user
exports.blockUser = async (req, res) => {
  try {
    const { error, value } = validators.blockUser(req.body);
    if (error)
      return res
        .status(400)
        .json({ error: `Validation Error. ${error.details[0].message}` });

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { ...value },
      { new: true }
    );
    if (!user)
      return res.status(400).json({ error: "User not found.", body: null });

    return res.status(200).json({
      error: null,
      body: `User ${value.blocked ? "Blocked" : "Unblocked"} Successfully.`,
    });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Google OAuth
exports.auth = async (req, res) => {
  try {
    const params = queryString.stringify({
      client_id: process.env.OAUTH_CLIENT_ID,
      redirect_uri: `${process.env.SERVER_URL}/api/user/auth/callback`,
      scope: [
        "https://www.googleapis.com/auth/user.birthday.read",
        "https://www.googleapis.com/auth/user.gender.read",
        "https://www.googleapis.com/auth/user.phonenumbers.read",
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ].join(" "),
      response_type: "code",
      access_type: "offline",
      prompt: "consent",
    });

    const googleLoginUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params}`;
    return res.redirect(googleLoginUrl);
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Google OAuth Callback
exports.authCallback = async (req, res) => {
  try {
    if (req.query.error) {
      return res
        .status(401)
        .json({ error: "Login/Signup failed. Try Again.", body: null });
    }
    const accessToken = await getAccessToken(req.query.code);
    const data = await getProfile(accessToken);

    // ! Handle if permissions are not given
    const profile = {
      username: data.names[0].displayName,
      phoneNumber: data.phoneNumbers ? data.phoneNumbers[0].value : null,
      age: new Date().getFullYear() - data.birthdays[0].date.year,
      gender: data.genders[0].value,
      email: data.emailAddresses[0].value,
      country: null,
      completed: false,
    };
    const user = await User.findOne({ email: profile.email }).exec();
    // ! Handle Blocked account
    if (user) {
      req.session.passport = null;
      req.session.passport = { user: { id: user._id, role: user.role } };
      return res.redirect(`${process.env.CLIENT_URL}`);
    }
    const newUser = await User.create(profile);
    req.session.passport = null;
    req.session.passport = { user: { id: newUser._id, role: newUser.role } };
    const query = newUser.phoneNumber ? "country" : "country-phoneNumber";
    return res.redirect(`${process.env.CLIENT_URL}/signup/?fields=${query}`);
  } catch (error) {
    console.error("Error occured here\n", error);
    return res
      .status(401)
      .json({ error: "Login/Signup failed. Try Again.", body: null });
  }
};

// * Put request for signup
exports.signup = async (req, res) => {
  try {
    const [user, admin] = await Promise.all([
      User.findById(req.user._id).exec(),
      Admin.findById("5fb6b2accbecb72838aece98").exec(),
    ]);
    if (!user)
      return res.status(404).json({ error: "User not found.", body: null });

    const { error, value } = user.phoneNumber
      ? validators.signup_country(req.body)
      : validators.signup_country_phone(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Error. ${error.details[0].message}`,
        body: null,
      });

    user.country = value.country;
    if (!user.phoneNumber) {
      user.phoneNumber = value.phoneNumber;
    }
    user.complete = true;

    const chatroom = {
      user: {
        id: user._id,
      },
      partner: {
        id: admin._id,
        model: "Admin",
      },
    };
    const [newChatroom] = await Promise.all([
      Chatroom.create(chatroom),
      user.save(),
    ]);
    await Message.create({
      chatroomId: newChatroom._id,
      sender: {
        id: newChatroom.partner.id,
        model: newChatroom.partner.model,
      },
      text: admin.welcomeMessage || "Hello!",
      time: new Date(),
    });

    return res.status(200).json({
      error: null,
      body: { user, message: "Congratulations! SignUp process is complete." },
    });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Logout User
exports.logoutUser = async (req, res) => {
  try {
    req.logout();
    return res.status(200).json({ error: null, body: "User Logged Out" });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get my Chatrooms
exports.getChatrooms = async (req, res) => {
  try {
    const chatrooms = await Chatroom.find({ "user.id": req.user._id }).exec();
    const promiseArray = [];
    chatrooms.forEach((doc) => {
      const pro = doc
        .populate("partner.id", "username email role")
        .populate({
          path: "unreadMessages",
          match: {
            time: { $gt: doc.lastOpened.user },
            "sender.id": { $ne: req.user._id },
          },
        })
        .execPopulate();

      promiseArray.push(pro);
    });
    await Promise.all(promiseArray);

    return res.status(200).json({ error: null, body: chatrooms });
  } catch (error) {
    console.error("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
