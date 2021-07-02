const express = require("express");
const path = require("path");

// * Environment Variables Init
require("dotenv").config();

// * Server Init
const app = express();

// * DB Connection Init
const mongooseConnection = require("./utils/connectDb")(process.env.MONGO_URI);

// * Middlewares
require("./utils/middlewares")(app, express, mongooseConnection);

// * Routes
require("./utils/routes")(app);

// * Start Server
const port = process.env.PORT || 5000;
const server = app.listen(port, () =>
  console.log(`Server Started on port ${port}`)
);

// * Auth Init
require("./config/passport");

// * Chat Init
require("./utils/chat")(server);

// * Deployment
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/*", function (req, res) {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}
