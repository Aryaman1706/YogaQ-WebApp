const express = require("express");

// * Middleware
const { login: loginAdmin } = require("../middleware/admin");

// * Controllers
const controller = require("../controllers/admin");

// * API Endpoints -->
const router = express.Router();

// * Create a new admin
router.post("/register", loginAdmin, controller.create);

// * Get my profile
router.get("/profile", loginAdmin, controller.myProfile);

// * Edit profile of admin
router.put("/profile", loginAdmin, controller.edit);

// * Change Password
router.put("/changePassword", loginAdmin, controller.changePassword);

// * Forgot password 1 (Enter email to send reset link on)
router.post("/forgotPassword", controller.forgotPassword1);

// * Forgot password 2 (Enter a new password)
router.post("/forgotPassword/:resetToken", controller.forgotPassword2);

// * End of API Endpoints -->

module.exports = router;
