const express = require("express");

// * Middlewares
const {
  middlewares: { login: adminLogin },
} = require("../admin");
const {
  middlewares: { login: userLogin },
} = require("../user");
const { adminOrDoctorLogin } = require("./middlewares");

// * Controllers
const controllers = require("./controllers");

// * API Endpoints -->
const router = express.Router();

/**
 * Type:- POST
 * Desc:- Create a new questionSet for chatroom
 * Route:- {{server_url}}/questionSet/new
 * Middlewares:- Admin login
 * Request Body:- {
 *  "chatroomId": ""
 * }
 */
router.post("/new/:id", adminLogin, controllers.create);

/**
 * Type:- PUT
 * Desc:- Toggle Active status of Question Set
 * Route:- {{server_url}}/questionSet/active/:questionSetId
 * Middlewares:- Admin login
 * Request Body:- {
 *   "active": true
 * }
 */
router.put("/active/:id", adminLogin, controllers.toggleActive);

/**
 * Type:- PUT
 * Desc:- Add Question to question set
 * Route:- {{server_url}}/questionSet/addQuestion/:questionSetId
 * Middlewares:- Admin/Doctor Login
 * Request Body:- {
 *  "statement": "test question statement",
 *  "options": ["option1", "option2", "option3", "option4"]
 * }
 */
router.put("/addQuestion/:id", adminOrDoctorLogin, controllers.addQues);

/**
 * Type:- DELETE
 * Desc:- Remove and delete question from questionSet
 * Route:- {{server_url}}/questionSet/removeQuestion/:questionId
 * Middlewares:- Admin/Doctor login
 * Request Body:- None
 */
router.delete(
  "/removeQuestion/:id",
  adminOrDoctorLogin,
  controllers.deleteQues
);

/**
 * Type:- GET
 * Desc:- Get questionSet for user
 * Route:- {{server_url}}/questionSet/get
 * Middlewares:- User Login, Chatroom Auth
 * Request Body:- None
 */
router.get("/get", [userLogin], controllers.userGet);

/**
 * Type:- POST
 * Desc:- User fill questionSet
 * Route:- {{server_url}}/questionSet/fill
 * Middlewares:- User Login, Chatroom Auth
 * Request Body:- {
 *  "responses": {
 *      "[questionId]": "response"
 *  }
 * }
 */
router.post("/fill", [userLogin], controllers.userFill);

/**
 * Type:- GET
 * Desc:- Get questionSet for doctor
 * Route:- {{server_url}}/questionSet/doctor/get
 * Middlewares:- Admin/Doctor Login, Chatroom Auth
 * Request Body:- None
 */
router.get("/doctor/get", controllers.docGet);

/**
 * Type:- GET
 * Desc:- Get filled questionSet for doctor datewise
 * Route:- {{server_url}}/questionSet/doctor/filled/?date=(JS date)
 * Middlewares:- Admin/Doctor Login, Chatroom Auth
 * Request Body:- None
 */
router.get("/doctor/filled", controllers.docFilled);

// * End API Endpoints -->

module.exports = router;
