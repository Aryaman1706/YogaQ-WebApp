const express = require("express");

// * Middleware

// * Controllers
const controller = require("../controllers/admin");

// * API Endpoints -->
const router = express.Router();

// * Create a new admin
router.post("/register", controller.create);

// * Get my profile
router.get("/profile", controller.myProfile);

// * Edit profile of admin
router.put("/profile", controller.edit);

// * Change Password
router.put("/changePassword", controller.changePassword);

// * Forgot password 1 (Enter email to send reset link on)
router.post("/forgotPassword", controller.forgotPassword1);

// * Forgot password 2 (Enter a new password)
router.post("/forgotPassword/:resetToken", controller.forgotPassword2);

// * End of API Endpoints -->

module.exports = router;
