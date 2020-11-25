require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
require("./config/passport");
const session = require("express-session");
const cors = require("cors");
// TODO See Documentation Once for Optimization of connect-mongo
const MongoStore = require("connect-mongo")(session);
const path = require("path");

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
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://yogaq.herokuapp.com");
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
app.use(cors({ origin: `${process.env.CLIENT_URL}`, credentials: true }));
app.use(passport.initialize());
app.use(passport.session());

// * Server Setup
const port = process.env.PORT || 5000;
const server = app.listen(port, console.log(`Server Started on port ${port}`));

// * Socket Setup
require("./utils/chat")(server);

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

// * Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
