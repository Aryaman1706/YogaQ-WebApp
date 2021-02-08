const express = require("express");

// * Middleware
const {
  middlewares: { complete: userComplete },
} = require("../user");
const {
  middlewares: { login: doctorLogin },
} = require("../doctor");
const {
  middlewares: { loggedIn, auth },
} = require("../chatroom");

// * Controllers
const controller = require("./controllers");

// * API Endpoints -->
const router = express.Router();

/**
 * Type:- GET
 * Desc:- List all calls for a chatroom
 * Route:- {{server_url}}/call/list/:chatroomId?page=1
 * Middlewares:- User/Partner Login, Active Chatroom
 * Request Body:- None
 */
router.get("/list/:id", [loggedIn, auth], controller.list);

/**
 * Type:- POST
 * Desc:- Request a call for chatroom
 * Route:- {{server_url}}/call/request
 * Middlewares:- User Profile Complete
 * Request Body:- {
 *  "chatroomId": "60204cc5b08d2aa154576945",
 *  "time": new Date()
 * }
 */
router.post("/request", userComplete, controller.request);

/**
 * Type:- PUT
 * Desc:- Edit call time
 * Route:- {{server_url}}/call/edit/:callId
 * Middlewares:- User Profile Complete
 * Request Body:- {
 *  "time": new Date()
 * }
 */
router.put("/edit/:id", userComplete, controller.edit);

/**
 * Type:- DELETE
 * Desc:- Cancel the requested call
 * Route:- {{server_url}}/call/cancel/:callId
 * Middlewares:- User Profile Complete
 * Request Body:- None
 */
router.put("/cancel/:id", userComplete, controller.cancel);

/**
 * Type:- PUT
 * Desc:- Accept the call request
 * Route:- {{server_url}}/call/edit/:callId
 * Middlewares:- Doctor login
 * Request Body:- {
 *  "accepted": true
 * }
 */
router.put("/accept/:id", doctorLogin, controller.accept);

/**
 * Type:- PUT
 * Desc:- Mark the call as completed
 * Route:- {{server_url}}/call/edit/:callId
 * Middlewares:- Doctor login
 * Request Body:- {
 *  "completed": false
 * }
 */
router.put("/complete/:id", doctorLogin, controller.complete);

// * End of API Endpoints -->

module.exports = router;
