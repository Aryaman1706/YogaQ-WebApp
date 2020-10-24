const express = require("express");

// * Middleware

// * Controllers

// * API Endpoints -->
const router = express.Router();

// * Create a Chat Room
router.post("/create");

// * Get Chat Room
router.get("/get/:id");

// * Get More Messages
// * /messages/:id/?page=1
router.get("/messages/:id");

// * Edit Chat Room
router.put("/edit/:id");

// * Modify Last Access
router.put("/lastAccess/:id");

// * End of API Endpoints -->

module.exports = router;
