const express = require("express");
const multer = require("multer");
const passport = require("passport");

// * Config
const customStorage = require("../config/multerStorage");

const upload = multer({
  storage: customStorage(),
});

// * Middleware
const { login: loginDoctor } = require("./middlewares");
const { login: loginAdmin } = require("../admin/middlewares");

// * Controllers
const controllers = require("./controllers");

// * API Endpoints -->
const router = express.Router();

// * Create a new enquiry
router.post("/enquire", [upload.any()], controllers.newEnquiry);

// * Create a doctor from enquiry
router.post("/register", loginAdmin, controllers.register);

// * Deny an enquiry
router.delete("/delete/:enquiryId", loginAdmin, controllers.denyEnquiry);

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
router.get("/profile", loginDoctor, controllers.myProfile);

// * Edit my profile
router.put("/profile", [loginDoctor, upload.any()], controllers.editProfile);

// * Change Password
router.put("/changePassword", loginDoctor, controllers.changePassword);

// * Forgot password 1 (Enter email to send reset token to)
router.post("/forgotPassword", controllers.forgotPassword1);

// * Forgot password 2 (Enter new password)
router.post("/forgotPassword/:token", controllers.forgotPassword2);

// * List all enquiries
// "/doctor/enquiry/list/?page=1"
router.get("/enquiry/list", loginAdmin, controllers.listEnquiries);

// * View an enquiry
router.get("/enquiry/view/:id", loginAdmin, controllers.viewEnquiry);

// * List all Doctors
// "/doctor/list/?page=1"
router.get("/list", loginAdmin, controllers.listDoctors);

// * View a Doctor
// Chatrooms and details
router.get("/view/:id", loginAdmin, controllers.viewDoctor);

// * End of API Endpoints -->

module.exports = router;
