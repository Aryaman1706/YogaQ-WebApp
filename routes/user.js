// * NPM Packages
const express = require("express");

// * Middleware
const { login: loginMiddleware } = require("../middleware/user");

// * Controllers
const controllers = require("../controllers/user");

// * API Endpoints -->
const router = express.Router();

// * Get my profile
router.get("/profile", loginMiddleware, controllers.getProfile);

// * Edit profile
router.put("/profile", loginMiddleware, controllers.editProfile);

// * Google OAuth
router.get("/auth", controllers.auth);

// * Google OAuth Redirect
router.get("/auth/callback", controllers.authCallback);

// * End of API Endpoints -->

module.exports = router;
