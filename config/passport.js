const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { compare } = require("bcryptjs");

// * Models
const Admin = require("../admin/models");
const Doctor = require("../doctor/models/doctor");

// * Utils
const { login: adminLogin } = require("../admin/validators");
const { login: doctorLogin } = require("../doctor/validators");
const User = require("../user/models");

passport.use(
  "admin",
  new LocalStrategy(async (username, password, done) => {
    const { error, value } = adminLogin({ username, password });
    if (error)
      return done(null, false, {
        message: `Validation Error ${error.details[0].message}`,
      });
    const admin = await Admin.findOne({ email: value.username })
      .select("-resetTokenValidity -resetToken")
      .exec();
    if (!admin)
      return done(null, false, {
        message: "Validation Error Invalid Credentials.",
      });

    if (!(await compare(value.password, admin.password))) {
      return done(null, false, {
        message: "Validation Error Invalid Credentials.",
      });
    }

    return done(null, admin, { message: "Login Successfull." });
  })
);

passport.use(
  "doctor",
  new LocalStrategy(async (username, password, done) => {
    const { error, value } = doctorLogin({ username, password });
    if (error)
      return done(null, false, {
        message: `Validation Error. ${error.details[0].message}`,
      });
    const doctor = await Doctor.findOne({ email: value.username })
      .select("password username email restricted role")
      .exec();
    if (!doctor)
      return done(null, false, {
        message: "Validation Error. Invalid Credentials.",
      });

    if (!(await compare(value.password, doctor.password))) {
      return done(null, false, {
        message: "Validation Error. Invalid Credentials.",
      });
    }

    return done(null, doctor, { message: "Login Successfull." });
  })
);

passport.serializeUser((user, done) => {
  done(null, { id: user._id, role: user.role });
});

passport.deserializeUser(({ id, role }, done) => {
  if (role.trim() === "admin") {
    Admin.findById(id)
      .select("-password -resetToken -resetTokenValidity")
      .exec((err, doc) => {
        done(err, doc);
      });
  } else if (role.trim() === "doctor") {
    Doctor.findById(id)
      .select("username email restricted role")
      .exec((err, doc) => {
        done(err, doc);
      });
  } else if (role.trim() === "user") {
    User.findById(id).exec((err, doc) => {
      done(err, doc);
    });
  }
});
