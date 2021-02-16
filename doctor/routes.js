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
 * Request Body:-
 * {
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
