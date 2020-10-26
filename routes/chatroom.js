const express = require("express");

// * Middleware

// * Controllers
const controller = require("../controllers/chatroom");

// * API Endpoints -->
const router = express.Router();

// * Create a Chat Room
router.post("/create", controller.create);

// * Get Chat Room
router.get("/get/:id", controller.get);

// * Get Messages
// * /messages/:id/?page=1
router.get("/messages/:id", controller.messages);

// * Edit Chat Room
router.put("/edit/:id", controller.edit);

// * Modify Last Access
router.put("/lastAccess/:id", controller.lastAccess);

// * End of API Endpoints -->

module.exports = router;
