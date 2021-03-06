const express = require("express");

// * Middlewares
const { loggedIn, auth } = require("./middlewares");
const {
  middlewares: { login: loginAdmin },
} = require("../admin");

// * Controllers
const controllers = require("./controllers");

// * API Endpoints -->
const router = express.Router();

/**
 * Type:- POST
 * Desc:- Create a new chatroom
 * Route:- {{server_url}}/chatroom/create
 * Middlewares:- Admin Login
 * Request Body:- {
 *  "user": "testUser@mail.com",
 *  "partner": "testDoctor@mail.com",
 *  "partnerModel": "Doctor"
 * }
 */
router.post("/create", loginAdmin, controllers.create);

/**
 * Type:- PUT
 * Desc:- Edit existing chatroom
 * Route:- {{server_url}}/chatroom/edit/:id
 * Middlewares:- Admin Login
 * Request Body:- {
 *  "blocked": true
 * }
 */
router.put("/edit/:id", loginAdmin, controllers.edit);

/**
 * Type:- GET
 * Desc:- Get a chatroom
 * Route:- {{server_url}}/chatroom/get/:id/?populate=false
 * Middlewares:- User/Admin/Doctor Login
 * Request Body:- None
 */
router.get("/get/:id", loggedIn, controllers.get);

/**
 * Type:- GET
 * Desc:- Clear active_chatroom session
 * Route:- {{server_url}}/chatroom/clear
 * Middlewares:- User/Admin/Doctor login
 * Request Body:- None
 */
router.get("/clear", loggedIn, controllers.clear);

/**
 * Type:- GET
 * Desc:- Get messages of active chatroom
 * Route:- {{server_url}}/chatroom/messages/:id/?page=1
 * Middlewares:- User/Admin/Doctor Login, Active Chatroom
 * Request Body:- None
 */
router.get("/messages/:id", [loggedIn, auth], controllers.messages);

/**
 * Type:- PUT
 * Desc:- Change the last access of active chatroom
 * Route:- {{server_url}}/chatroom/lastAccess/:id
 * Middlewares:- User/Admin/Doctor Login, Active Chatroom
 * Request Body: {
 *  "lastAccess": new Date()
 * }
 */
router.put("/lastAccess/:id", [loggedIn, auth], controllers.lastAccess);

/**
 * Type:- GET
 * Desc:- List chatrooms of any doctor
 * Route:- {{server_url}}/chatroom/list/:doctorId/?page=1&startDate=new Date()&endDate=new Date()&onlyNew=true
 * Middlewares:- Admin Login
 * Request Body: None
 */
router.get("/list/:doctorId", loginAdmin, controllers.listChatrooms);

// * End of API Endpoints -->

module.exports = router;
