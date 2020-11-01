// * NPM Packages
const queryString = require("query-string");

// * Models
const User = require("../models/User");

// * Utils
const validation = require("../validationSchemas/user");
const { getAccessToken, getProfile } = require("../utils/oauth");

// * Controllers -->

// * Get my profile
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).exec();
    if (!user)
      return res.status(404).json({ error: "User not found.", body: null });

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
      req.session.user = user._id;
      return res.status(200).json({ error: null, body: "Login Successfull." });
    }
    const newUser = await User.create(profile);
    req.session.user = newUser._id;
    return res
      .status(200)
      .json({ error: null, body: "SignUp and Login Successfull." });
  } catch (error) {
    console.log("Error occured here\n", error);
    return res
      .status(401)
      .json({ error: "Login/Signup failed. Try Again.", body: null });
  }
};

// * End of Controllers -->
