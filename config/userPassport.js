// * NPM Packages
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;

// * Utils

// * Models
const User = require("../models/User");

// * Set up
passport.use(
  "user",
  new GoogleStrategy(
    {
      clientID: process.env.OAUTH_CLIENT_ID,
      clientSecret: process.env.OAUTH_CLIENT_SECRET,
      callbackURL: `${process.env.SERVER_URL}/api/user/auth/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log(profile);
      // const user = await User.findOne({ email: profile.email }).exec();
      // if (user) return done(null, user, { message: "Login Successfull." });
      // const newUser = await User.create({
      //   username: profile.displayName,
      //   email: profile.email,

      // })
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user._id);
  return 0;
});

passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id).exec();
  done(null, user);
});
