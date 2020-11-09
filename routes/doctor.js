const express = require("express");
const multer = require("multer");
const passport = require("passport");

// * Config
const customStorage = require("../config/multerStorage");

const upload = multer({
  storage: customStorage(),
});

// * Middleware
const { login: loginDoctor } = require("../middleware/doctor");
const { login: loginAdmin } = require("../middleware/admin");

// * Controllers
const controller = require("../controllers/doctor");

// * API Endpoints -->
const router = express.Router();

// * Create a new enquiry
router.post("/enquire", [upload.any()], controller.newEnquiry);

// * Create a doctor from enquiry
router.post("/register", loginAdmin, controller.register);

// * Deny an enquiry
router.delete("/delete/:enquiryId", loginAdmin, controller.denyEnquiry);

// * Login as Doctor
router.post("/login", (req, res, next) => {
  passport.authenticate("doctor", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.json({ error: info.message, body: null });

    req.logIn(user, (error) => {
      if (error) return next(error);
      const body = user;
      body.password = undefined;
      return res.status(200).json({
        error: null,
        body: body,
      });
    });
    return next();
  })(req, res, next);
});

// * Get my profile
// /doctor/profile?complete=(true/false)
router.get("/profile", loginDoctor, controller.myProfile);

// * Edit my profile
router.put("/profile", [loginDoctor, upload.any()], controller.editProfile);

// * Change Password
router.put("/changePassword", loginDoctor, controller.changePassword);

// * Forgot password 1 (Enter email to send reset token to)
router.post("/forgotPassword", controller.forgotPassword1);

// * Forgot password 2 (Enter new password)
router.post("/forgotPassword/:token", controller.forgotPassword2);

// * End of API Endpoints -->

module.exports = router;
