// * NPM Packages
const express = require("express");

// * Middleware
const middleware = require("../middleware/user");
const { login: loginAdmin } = require("../middleware/admin");

// * Controllers
const controllers = require("../controllers/user");

// * API Endpoints -->
const router = express.Router();

// * Get all users
// "/user/list/?page=1"
router.get("/list", loginAdmin, controllers.listUser);

// * View a user
// Chatroom and details
router.get("/view/:id", loginAdmin, controllers.viewUser);

// * Get my profile
router.get("/profile", middleware.login, controllers.getProfile);

// * Edit profile
router.put("/profile", middleware.login, controllers.editProfile);

// * Block/Unblock User (Admin)
// id -> user._id
router.put("/block/:id", loginAdmin, controllers.blockUser);

// * Google OAuth
router.get("/auth", controllers.auth);

// * Google OAuth Redirect
router.get("/auth/callback", controllers.authCallback);

// * Post Request for signup
router.put("/signup", middleware.login, controllers.signup);

// * Get my chatrooms
router.get("/chatrooms", middleware.login, controllers.getChatrooms);

// * End of API Endpoints -->

module.exports = router;
