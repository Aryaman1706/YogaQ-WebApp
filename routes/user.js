// * NPM Packages
const express = require("express");

// * Middleware
const middleware = require("../middleware/user");

// * Controllers
const controllers = require("../controllers/user");

// * API Endpoints -->
const router = express.Router();

// * Get all users

// * View a user

// * Get my profile
router.get("/profile", middleware.login, controllers.getProfile);

// * Edit profile
router.put("/profile", middleware.login, controllers.editProfile);

// * Google OAuth
router.get("/auth", controllers.auth);

// * Google OAuth Redirect
router.get("/auth/callback", controllers.authCallback);

// * Post Request for signup
router.put("/signup", middleware.login, controllers.signup);

// * Get my chatrooms
router.get("/chatrooms", middleware.complete, controllers.getChatrooms);

// * End of API Endpoints -->

module.exports = router;
