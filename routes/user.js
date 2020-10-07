const express = require("express");

// * Middleware
const { login: loginMiddleware } = require("../middleware/user");

// * Controllers
const controllers = require("../controllers/user");

// * API Endpoints -->
const router = express.Router();

// * Get my profile
router.get("/profile", loginMiddleware, controllers.getProfile);

// * Create new user
router.post("/register", controllers.registerUser);

// * Edit profile
router.put("/profile", loginMiddleware, controllers.editProfile);

// * End of API Endpoints -->

module.exports = router;
