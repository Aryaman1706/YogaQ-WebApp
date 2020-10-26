const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const { compare } = require("bcryptjs");

// * Models
const Admin = require("../models/Admin");
const Doctor = require("../models/Doctor");

passport.use(
  "admin",
  new LocalStrategy(async (username, password, done) => {
    const admin = await Admin.findOne({ email: username.trim() })
      .select("password")
      .exec();
    if (!admin) return done(null, false, { message: "Invalid Credentials." });

    if (!(await compare(password.trim(), admin.password))) {
      return done(null, false, { message: "Invalid Credentials." });
    }

    return done(null, admin, { message: "Login Successfull." });
  })
);

passport.use(
  "user",
  new LocalStrategy(async (username, password, done) => {
    const doctor = await Doctor.findOne({ email: username.trim() })
      .select("password")
      .exec();
    if (!doctor) return done(null, false, { message: "Invalid Credentials." });

    if (!(await compare(password.trim(), doctor.password))) {
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
    Admin.findById(id).exec((err, doc) => {
      done(err, doc);
    });
  } else if (role.trim() === "doctor") {
    Doctor.findById(id).exec((err, doc) => {
      done(err, doc);
    });
  }
});
