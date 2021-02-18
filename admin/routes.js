/**
 * ! TODOS
 * ! File upload for admin profile picture
 * ! Setup email for password reset
 * ! Test forgot password routes
 */

const express = require("express");
const passport = require("passport");

// * Middlewares
const { login: loginAdmin } = require("./middlewares");

// * Controllers
const controllers = require("./controllers");

// * API Endpoints -->
const router = express.Router();

/**
 * Type:- POST
 * Desc:- Login as Admin
 * Route:- {{server_url}}/admin/login
 * Middlewares:- None
 * Request Body:- {
 *   "username": "testUsername",
 *   "password": "testPassword"
 * }
 */
router.post("/login", (req, res, next) => {
  // eslint-disable-next-line
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
  })(req, res, next);
});

/**
 * Type:- POST
 * Desc:- Create a new admin
 * Route:- {{server_url}}/admin/register
 * Middlewares:- Admin login
 * Request Body:- {
 *  "username": "testUsername",
 *  "email": "testEmail@mail.com",
 *  "password": "testPassword"
 * }
 */
router.post("/register", loginAdmin, controllers.create);

/**
 * Type:- GET
 * Desc:- Get profile of logged in admin
 * Route:- {{server_url}}/admin/profile
 * Middlewares:- Admin login
 * Request Body:- None
 */
router.get("/profile", loginAdmin, controllers.myProfile);

/**
 * Type:- GET
 * Desc:- Log out admin
 * Route:- {{server_url}}/admin/logout
 * Middlewares:- Admin login
 * Request Body:- None
 */
router.get("/logout", loginAdmin, controllers.logoutAdmin);

/**
 * Type:- PUT
 * Desc:- Edit profile of logged in admin
 * Route:- {{server_url}}/admin/profile
 * Middlewares:- Admin login, multer file upload
 * Request Body:- {
 *  "username": "testUsername",
 *  "email": "testEmail@mail.com",
 *  "welcomeMessage": "Hello!"
 * }
 */
router.put("/profile", [loginAdmin], controllers.edit);

/**
 * Type:- PUT
 * Desc:- Change Password of logged in admin
 * Route:- {{server_url}}/admin/changePassword
 * Middlewares:- Admin login
 * Request Body:- {
 *  "oldPassword": "testOldPassword",
 *  "newPassword": "testNewPassword",
 *  "confirmPassword": "testNewPassword"
 * }
 */
router.put("/changePassword", loginAdmin, controllers.changePassword);

/**
 * Type:- POST
 * Desc:- Enter email to get password reset token
 * Route:- {{server_url}}/admin/forgotPassword
 * Middlewares:- None
 * Request Body:- {
 *  "email": "testEmail@mail.com"
 * }
 */
router.post("/forgotPassword", controllers.forgotPassword1);

/**
 * Type:- POST
 * Desc:- Enter new password
 * Route:- {{server_url}}/admin/forgotPassword/:resetToken
 * Middlewares:- None
 * Request Body:- {
 *  "newPassword": "testNewPassword",
 *  "confirmPassword": "testNewPassword"
 * }
 */
router.post("/forgotPassword/:resetToken", controllers.forgotPassword2);

/**
 * Type:- GET
 * Desc:- Get chatrooms of logged in admin
 * Route:- {{server_url}}/admin/chatrooms
 * Middlewares:- Admin Login
 * Request Body:- None
 */
router.get("/chatrooms", loginAdmin, controllers.myChatrooms);

// * End of API Endpoints -->

module.exports = router;
