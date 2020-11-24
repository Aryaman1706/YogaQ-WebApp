const express = require("express");

// * Middleware
const chatroom = require("../middleware/chatroom");
const { login: loginAdmin } = require("../middleware/admin");

// * Controllers
const controller = require("../controllers/chatroom");

// * API Endpoints -->
const router = express.Router();

// * Create a Chat Room
router.post("/create", loginAdmin, controller.create);

// * Edit Chat Room
router.put("/edit/:id", loginAdmin, controller.edit);

// * Get Chat Room
router.get("/get/:id", chatroom.canGet, controller.get);

// * Get Messages
// * /messages/:id/?page=1
router.get("/messages/:id", chatroom.auth, controller.messages);

// * Modify Last Access
router.put("/lastAccess/:id", chatroom.auth, controller.lastAccess);

// * Delete a chatroom
// Will delete chatroom and its messages and also remove doctor from user.doctors
// TODO
// * End of API Endpoints -->

module.exports = router;
