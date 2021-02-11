const express = require("express");

// * Controllers
const controller = require("./controllers");

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
router.post("/new/:id", controller.create);

/**
 * Type:- PUT
 * Desc:- Toggle Active status of Question Set
 * Route:- {{server_url}}/questionSet/active/:questionSetId
 * Middlewares:- Admin login
 * Request Body:- {
 *   "active": true
 * }
 */
router.put("/active/:id", controller.toggleActive);

/**
 * Type:- PUT
 * Desc:- Add Question to question set
 * Route:- {{server_url}}/questionSet/addQuestion/:questionSetId
 * Middlewares:- Admin/Doctor login
 * Request Body:- {
 *  "statement": "test question statement",
 *  "options": ["option1", "option2", "option3", "option4"]
 * }
 */
router.put("/addQuestion/:id", controller.addQues);

/**
 * Type:- DELETE
 * Desc:- Remove and delete question from questionSet
 * Route:- {{server_url}}/questionSet/removeQuestion/:questionId
 * Middlewares:- Admin/Doctor login
 * Request Body:- None
 */
// id -> Question._id
router.delete("/removeQuestion/:id", controller.deleteQues);

/**
 * Type:- GET
 * Desc:- Get questionSet for user
 * Route:- {{server_url}}/questionSet/get
 * Middlewares:- User Login, Chatroom Auth
 * Request Body:- None
 */
router.get("/get", controller.userGet);

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
router.post("/fill", controller.userFill);

/**
 * Type:- GET
 * Desc:- Get questionSet for doctor
 * Route:- {{server_url}}/questionSet/doctor/get
 * Middlewares:- Doctor/Admin Login, Chatroom Auth
 * Request Body:- None
 */
router.get("/doctor/get", controller.docGet);

/**
 * Type:- GET
 * Desc:- Get filled questionSet for doctor datewise
 * Route:- {{server_url}}/questionSet/doctor/filled/?date=(JS date)
 * Middlewares:- Doctor/Admin Login, Chatroom Auth
 * Request Body:- None
 */
router.get("/doctor/filled", controller.docFilled);

// * End API Endpoints -->

module.exports = router;
