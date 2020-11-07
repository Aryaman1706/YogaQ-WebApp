// * NPM Packages
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { compare } = require("bcryptjs");

// * Models
const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");

// * Utils
const { login: adminLogin } = require("../validationSchemas/admin");
const { login: doctorLogin } = require("../validationSchemas/doctor");

passport.use(
  "admin",
  new LocalStrategy(async (username, password, done) => {
    const { error, value } = adminLogin({ username, password });
    if (error) return done(null, false, { message: error.details[0].message });
    const admin = await Admin.findOne({ email: value.username })
      .select("-resetTokenValidity -resetToken")
      .exec();
    if (!admin) return done(null, false, { message: "Invalid Credentials." });

    if (!(await compare(value.password, admin.password))) {
      return done(null, false, { message: "Invalid Credentials." });
    }

    return done(null, admin, { message: "Login Successfull." });
  })
);

passport.use(
  "doctor",
  new LocalStrategy(async (username, password, done) => {
    const { error, value } = doctorLogin({ username, password });
    if (error) return done(null, false, { message: "Invalid Credentials." });
    const doctor = await Doctor.findOne({ email: value.username })
      .select("-resetTokenValidity -resetToken")
      .exec();
    if (!doctor) return done(null, false, { message: "Invalid Credentials." });

    if (!(await compare(value.password, doctor.password))) {
      return done(null, false, { message: "Invalid Credentials." });
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
      .select("-password -resetToken -resetTokenValidity")
      .exec((err, doc) => {
        done(err, doc);
      });
  }
});
