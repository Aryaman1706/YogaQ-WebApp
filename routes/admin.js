const express = require("express");
const multer = require("multer");
const passport = require("passport");
const cloudinary = require("../config/cloudinaryConfig");

// * Config
const customStorage = require("../config/multerStorage");

const checkFileType = (file, cb) => {
  if (!file.mimetype.startsWith("image")) return cb("Invalid File Type.");
  if (file.size > 4000000) return cb("File limit exceded");
  return cb(null, true);
};

const uploadProfilePicture = multer({
  storage: customStorage(),
  fileFilter: function (req, file, cb) {
    checkFileType(file, cb);
  },
});

// * Middleware
const { login: loginAdmin } = require("../middleware/admin");

// * Controllers
const controller = require("../controllers/admin");

// * API Endpoints -->
const router = express.Router();

// * Login Admin
router.post("/login", (req, res, next) => {
  passport.authenticate("admin", (err, user, info) => {
    if (err) return next(err);
    if (!user) return res.status(404).json({ error: info.message, body: null });

    req.logIn(user, (error) => {
      if (error) return next(error);
      const body = user;
      body.password = undefined;
      return res.status(200).json({
        error: null,
        body: body,
      });
    });
    // return next();
  })(req, res, next);
});

// * Create a new admin
router.post("/register", controller.create);

// * Get my profile
router.get("/profile", loginAdmin, controller.myProfile);

// * Edit profile of admin
router.put(
  "/profile",
  [loginAdmin, uploadProfilePicture.single("profilePicture")],
  controller.edit
);

// * Change Password
router.put("/changePassword", loginAdmin, controller.changePassword);

// * Forgot password 1 (Enter email to send reset link on)
router.post("/forgotPassword", controller.forgotPassword1);

// * Forgot password 2 (Enter a new password)
router.post("/forgotPassword/:resetToken", controller.forgotPassword2);

// * Get My Chatrooms
router.get("/chatrooms", loginAdmin, controller.myChatrooms);

// * Test
router.get("/del", async (req, res) => {
  const result = await cloudinary.uploader.destroy("690259_vw4hbg");
  res.send(result);
});

// * End of API Endpoints -->

module.exports = router;
