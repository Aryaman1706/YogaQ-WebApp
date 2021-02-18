const express = require("express");
const multer = require("multer");
const passport = require("passport");

// * Middleware
const { login: loginDoctor } = require("./middlewares");
const {
  middlewares: { login: loginAdmin },
} = require("../admin");

// * Controllers
const controllers = require("./controllers");

// * Config
const customStorage = require("../config/multerStorage");

const upload = multer({
  storage: customStorage(),
});

// * API Endpoints -->
const router = express.Router();

/**
 * Type:- POST
 * Desc:- Create a new enquiry
 * Route:- {{server_url}}/doctor/enquire
 * Middlewares:- Upload
 * Request Body:- {
 *  "username": "testUsername",
 *  "phoneNumber": "9999999999",
 *  "age": 18,
 *  "gender": "male",
 *  "country": "India",
 *  "languages": ["Hindi", "English"],
 *  "description": "Test Description".
 *  "email": "testEnquiry@mail.com",
 *  "qualificational": {
 *    "educationalQualification": ["certificate", "diploma"],
 *    "docs": [
 *      {"name": "test1", "description": "test1", "doc": "uuid"},
 *      {"name": "test1", "description": "test1", "doc": "uuid"}
 *     ]
 *  },
 *  "professional":[
 *    { "place": "test1", "clients": 100, "noOfYears": 2, "doc": "uuid" },
 *    { "place": "test1", "clients": 100, "noOfYears": 2, "doc": "uuid" }
 *  ],
 *  "expertise": "Test statement"
 * }
 */
router.post("/enquire", upload.any(), controllers.newEnquiry);

/**
 * Type:- POST
 * Desc:- Create a doctor from enquiry
 * Route:- {{server_url}}/doctor/register
 * Middlewares:- Admin Login
 * Request Body:- {
 *  "enquiry": "ObjectId('...')",
 *  "password": "testPassword"
 * }
 */
router.post("/register", loginAdmin, controllers.register);

// ! TODO:- Delete the documents
/**
 * Type:- DELETE
 * Desc:- Deny an enquiry
 * Route:- {{server_url}}/doctor/delete/:enquiryId
 * Middlewares:- Admin Login
 * Request Body:- None
 */
router.delete("/delete/:enquiryId", loginAdmin, controllers.denyEnquiry);

/**
 * Type:- POST
 * Desc:- Login as doctor
 * Route:- {{server_url}}/doctor/login
 * Middlewares:- None
 * Request Body:- {
 *  "username": "testUsername",
 *  "password": "testPassword"
 * }
 */
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

/**
 * Type:- GET
 * Desc:- Get profile of currently logged in doctor
 * Route:- {{server_url}}/doctor/profile?complete=false
 * Middlewares:- Doctor Login
 * Request Body:- None
 */
router.get("/profile", loginDoctor, controllers.myProfile);

/**
 * Type:- PUT
 * Desc:- Edit profile of currently logged in doctor
 * Route:- {{server_url}}/doctor/profile
 * Middlewares:- Doctor Login, Upload
 * Request Body:- {
 *  "username": "testUsername",
 *  "phoneNumber": "9999999999",
 *  "age": 18,
 *  "gender": "male",
 *  "country": "India",
 *  "languages": ["Hindi", "English"],
 *  "description": "Test Description".
 *  "email": "testEnquiry@mail.com",
 *  "qualificational": {
 *    "educationalQualification": ["certificate", "diploma"],
 *    "docs": [
 *      {"name": "test1", "description": "test1", "doc": "uuid"},
 *      {"name": "test1", "description": "test1", "doc": "uuid"}
 *     ]
 *  },
 *  "professional":[
 *    { "place": "test1", "clients": 100, "noOfYears": 2, "doc": "uuid" },
 *    { "place": "test1", "clients": 100, "noOfYears": 2, "doc": "uuid" }
 *  ],
 *  "expertise": "Test statement",
 *  "welcomeMessage": "Test statement"
 * }
 */
router.put("/profile", [loginDoctor, upload.any()], controllers.editProfile);

/**
 * Type:- PUT
 * Desc:- Change password of currently logged in doctor
 * Route:- {{server_url}}/doctor/changePassword
 * Middlewares:- Doctor Login
 * Request Body:- {
 *  "oldPassword": "testOldPassword",
 *  "newPassword": "testNewPassword",
 *  "confirmPassword": "testNewPassword"
 * }
 */
router.put("/changePassword", loginDoctor, controllers.changePassword);

/**
 * Type:- GET
 * Desc:- Get chatrooms of logged in doctor
 * Route:- {{server_url}}/doctor/chatrooms
 * Middlewares:- Doctor Login
 * Request Body:- None
 */
router.get("/chatrooms", loginDoctor, controllers.myChatrooms);

/**
 * Type:- POST
 * Desc:- Enter email to get password reset token
 * Route:- {{server_url}}/doctor/forgotPassword
 * Middlewares:- None
 * Request Body:- {
 *  "email": "testEmail@mail.com"
 * }
 */
router.post("/forgotPassword", controllers.forgotPassword1);

/**
 * Type:- POST
 * Desc:- Enter new password
 * Route:- {{server_url}}/doctor/forgotPassword/:resetToken
 * Middlewares:- None
 * Request Body:- {
 *  "newPassword": "testNewPassword",
 *  "confirmPassword": "testNewPassword"
 * }
 */
router.post("/forgotPassword/:resetToken", controllers.forgotPassword2);

/**
 * Type:- GET
 * Desc:- List all enquiries
 * Route:- {{server_url}}/doctor/enquiry/list/?page=1
 * Middlewares:- Admin Login
 * Request Body:- None
 */
router.get("/enquiry/list", loginAdmin, controllers.listEnquiries);

/**
 * Type:- GET
 * Desc:- View an enquiry
 * Route:- {{server_url}}/doctor/enquiry/view/:enquiryId
 * Middlewares:- Admin Login
 * Request Body:- None
 */
router.get("/enquiry/view/:id", loginAdmin, controllers.viewEnquiry);

/**
 * Type:- GET
 * Desc:- List all Doctors
 * Route:- {{server_url}}/doctor/list/?page=1
 * Middlewares:- Admin Login
 * Request Body:- None
 */
router.get("/list", loginAdmin, controllers.listDoctors);

/**
 * Type:- GET
 * Desc:- View a doctor
 * Route:- {{server_url}}/doctor/view/:doctorId
 * Middlewares:- Admin Login
 * Request Body:- None
 */
router.get("/view/:id", loginAdmin, controllers.viewDoctor);

// * End of API Endpoints -->

module.exports = router;
