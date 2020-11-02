const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("dotenv").config();
require("./config/passport");
const session = require("express-session");
const cors = require("cors");
// TODO See Documentation Once for Optimization of connect-mongo
const MongoStore = require("connect-mongo")(session);

const app = express();

// * DB Connection
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

// * Middleware
app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.COOKIESECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use(passport.initialize());
app.use(passport.session());

// * Server Setup
const port = process.env.PORT || 5000;
app.listen(port, console.log(`Server Started on port ${port}`));

// * Routes Import
const user = require("./routes/user");
const admin = require("./routes/admin");
const doctor = require("./routes/doctor");
const chatroom = require("./routes/chatroom");
const call = require("./routes/call");

// * Routes Setup
app.use("/api/user", user);
app.use("/api/admin", admin);
app.use("/api/doctor", doctor);
app.use("/api/chatroom", chatroom);
app.use("/api/call", call);
