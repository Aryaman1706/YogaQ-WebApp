const express = require("express");

// * Middleware
const chatroom = require("../middleware/chatroom");

// * Controllers
const controller = require("../controllers/chatroom");

// * API Endpoints -->
const router = express.Router();

// * Create a Chat Room
router.post("/create", controller.create);

// * Edit Chat Room
router.put("/edit/:id", controller.edit);

// * Get Chat Room
router.get("/get/:id", controller.get);

// * Get Messages
// * /messages/:id/?page=1
router.get("/messages/:id", [chatroom.auth], controller.messages);

// * Modify Last Access
router.put("/lastAccess/:id", [chatroom.auth], controller.lastAccess);

// * End of API Endpoints -->

module.exports = router;
