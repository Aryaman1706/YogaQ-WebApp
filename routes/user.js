// * NPM Packages
const express = require("express");
const passport = require("passport");

// * Middleware
const { login: loginMiddleware } = require("../middleware/user");

// * Controllers
const controllers = require("../controllers/user");

// * API Endpoints -->
const router = express.Router();

// * Get my profile
router.get("/profile", loginMiddleware, controllers.getProfile);

// * Auth
router.get(
  "/auth",
  passport.authenticate("user", {
    scope: [
      "https://www.googleapis.com/auth/user.phonenumbers.read",
      "https://www.googleapis.com/auth/user.gender.read",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
  })
);

// * Auth Redirect
router.get("/auth/callback", passport.authenticate("user"), (req, res) => {
  res.redirect("http://localhost:5000/done");
});

// * Edit profile
router.put("/profile", loginMiddleware, controllers.editProfile);

// * End of API Endpoints -->

module.exports = router;
