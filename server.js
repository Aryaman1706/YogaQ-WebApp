const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// * Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// * Routes import
const user = require("./routes/user");
const admin = require("./routes/admin");

// * Server Setup
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, console.log(`Server Started on port ${PORT}`));

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
