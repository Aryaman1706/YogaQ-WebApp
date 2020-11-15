// * NPM Packages
const queryString = require("query-string");

// * Models
const User = require("../models/User");

// * Utils
const validation = require("../validationSchemas/user");
const { getAccessToken, getProfile } = require("../utils/oauth");
const ChatRoom = require("../models/ChatRoom");

// * Controllers -->

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
        .json({ error: "Complete Profile to continue.", body: query });
    }

    return res.status(200).json({ error: null, body: user });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Edit profile
exports.editProfile = async (req, res) => {
  try {
    const { error, value } = validation.edit(req.body);
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

    return res.status(200).json({ error: null, body: updatedUser });
  } catch (error) {
    console.log("Error occured here\n", error);
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
    console.log("Error occured here\n", error);
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
    if (user) {
      req.session.passport = null;
      req.session.user = { id: user._id, role: user.role };
      return res.redirect(`${process.env.CLIENT_URL}`);
    }
    const newUser = await User.create(profile);
    req.session.passport = null;
    req.session.user = { id: newUser._id, role: newUser.role };
    const query = newUser.phoneNumber ? "country" : "country-phoneNumber";
    return res.redirect(`${process.env.CLIENT_URL}/signup/?fields=${query}`);
  } catch (error) {
    console.log("Error occured here\n", error);
    return res
      .status(401)
      .json({ error: "Login/Signup failed. Try Again.", body: null });
  }
};

// * Put request for signup
exports.signup = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    if (!user)
      return res.status(404).json({ error: "User not found.", body: null });

    const { error, value } = user.phoneNumber
      ? validation.signup_country(req.body)
      : validation.signup_country_phone(req.body);
    if (error)
      return res.status(400).json({
        error: `Validation Failed:- ${error.details[0].message}`,
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
        id: "5fa1e53ecbfc17d447d1a520",
        model: "Admin",
      },
    };
    await Promise.all([user.save(), ChatRoom.create(chatroom)]);
    return res.status(200).json({ error: null, body: user });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * Get my ChatRooms
exports.getChatrooms = async (req, res) => {
  try {
    const chatrooms = await ChatRoom.find({ "user.id": req.user._id }).exec();
    const promiseArray = [];
    chatrooms.forEach((doc) => {
      const pro = doc
        .populate("partner.id", "username email")
        .populate({
          path: "unreadMessages",
          match: { time: { $gt: doc.lastOpened.user } },
        })
        .execPopulate();

      promiseArray.push(pro);
    });
    await Promise.all(promiseArray);

    return res.status(200).json({ error: null, body: chatrooms });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res.status(500).json({ error: "Server Error.", body: null });
  }
};

// * End of Controllers -->
