const express = require("express");

// * Middleware
const { login: loginDoctor } = require("../middleware/doctor");
const { login: loginAdmin } = require("../middleware/admin");

// * Controllers

// * API Endpoints -->
const router = express.Router();

// * Create a new enquiry
router.post("/enquire");

// * Create a doctor from enquiry
router.post("/register", loginAdmin);

// * Deny an enquiry
router.delete("/delete/:enquiryId", loginAdmin);

// * Get my profile
router.get("/profile", loginDoctor);

// * Edit my profile
router.put("/profile", loginDoctor);

// * Change Password
router.put("/changePassword", loginDoctor);

// * Forgot password 1 (Enter email to send reset token to)
router.post("/forgotPassword");

// * Forgot password 2 (Enter new password)
router.post("/forgotPassword/:token");

// * End of API Endpoints -->

module.exports = router;
