const express = require("express");

// * Middlewares
const {
  login: loginUser,
  complete: completeUserProfile,
} = require("./middlewares");
const { login: loginAdmin } = require("../admin/middlewares");

// * Controllers
const controllers = require("./controllers");

// * API Endpoints -->
const router = express.Router();

// * Get all users
// "/user/list/?page=1"
router.get("/list", loginAdmin, controllers.listUser);

// * View a user
// Chatroom and details
router.get("/view/:id", loginAdmin, controllers.viewUser);

// * Get my profile
router.get("/profile", loginUser, controllers.getProfile);

// * Edit profile
router.put("/profile", completeUserProfile, controllers.editProfile);

// * Block/Unblock User (Admin)
// id -> user._id
router.put("/block/:id", loginAdmin, controllers.blockUser);

// * Google OAuth
router.get("/auth", controllers.auth);

// * Google OAuth Redirect
router.get("/auth/callback", controllers.authCallback);

// * Post Request for signup
router.put("/signup", loginUser, controllers.signup);

// * Logout User
router.get("/auth/logout", loginUser, controllers.logoutUser);

// * Get my chatrooms
router.get("/chatrooms", completeUserProfile, controllers.getChatrooms);

// * End of API Endpoints -->

module.exports = router;
