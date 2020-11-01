const express = require("express");

// * Middleware
const { complete: userComplete } = require("../middleware/user");
const { login: doctorLogin } = require("../middleware/doctor");

// * Controllers
const controller = require("../controllers/call");

// * API Endpoints -->
const router = express.Router();

// * Request a Call
router.post("/request", userComplete, controller.request);

// * Edit Call (Change Time)
router.put("/edit/:id", userComplete, controller.edit);

// * Accept Call Request
router.put("/accept/:id", doctorLogin, controller.accept);

// * Mark Call As Complete
router.put("/complete/:id", doctorLogin, controller.complete);

// * End of API Endpoints -->

module.exports = router;
