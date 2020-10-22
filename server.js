const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
require("./config/userPassport");
const session = require("express-session");
const cors = require("cors");

const app = express();

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: process.env.COOKIESECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", `${process.env.CLIENT_URL}`);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(passport.initialize());
app.use(passport.session());

// * Routes import
const user = require("./routes/user");
const admin = require("./routes/admin");

// * Server Setup
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server Started on port ${port}`));

mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) return console.log("Connection to MongoDB failed.\n", err);
    return console.log("Connected to MongoDB");
  }
);

// * Routes Setup
app.use("/api/user", user);
app.use("/api/admin", admin);
