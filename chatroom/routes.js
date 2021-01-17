const express = require("express");

// * Middlewares
const { loggedIn, auth } = require("./middlewares");
const { login: loginAdmin } = require("../admin/middlewares");

// * Controllers
const controllers = require("./controllers");

// * API Endpoints -->
const router = express.Router();

// * Create a Chat Room
router.post("/create", loginAdmin, controllers.create);

// * Edit Chat Room
router.put("/edit/:id", loginAdmin, controllers.edit);

// * Get Chat Room
router.get("/get/:id", loggedIn, controllers.get);

// * Get Messages
// * /messages/:id/?page=1
router.get("/messages/:id", [loggedIn, auth], controllers.messages);

// * Modify Last Access
router.put("/lastAccess/:id", [loggedIn, auth], controllers.lastAccess);

// * Delete a chatroom
// Will delete chatroom and its messages and also remove doctor from user.doctors
// TODO
// * End of API Endpoints -->

module.exports = router;
