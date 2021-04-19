const express = require("express");

// * Middlewares
const {
  middlewares: { login: adminLogin },
} = require("../admin");
const {
  middlewares: { login: userLogin },
} = require("../user");

// * Controllers

// * API Endpoints -->
const router = express.Router();

/**
 * Type:- Post
 * Desc:- Create new Link document
 * Route:- {{server_url}}/link
 * Middlewares:- Admin Login
 * Request Body:- {
 *  "links": [{ url: "test_url" }]
 * }
 */
router.post("/", adminLogin);

/**
 * Type:- Put
 * Desc:- Edit Link document
 * Route:- {{server_url}}/link/:linkId
 * Middlewares:- Admin Login
 * Request Body:- {
 *  "links": [{ url: "test_url" }],
 *  "enabled": true
 * }
 */
router.put("/:linkId", adminLogin);

/**
 * Type:- Delete
 * Desc:- Delete Link documents
 * Route:- {{server_url}}/link/:linkId
 * Middlewares:- Admin Login
 */
router.delete("/:linkId", adminLogin);

/**
 * Type:- Get
 * Desc:- Get all Link document
 * Route:- {{server_url}}/link/admin-list
 * Middlewares:- Admin Login
 */
router.get("/admin-list", adminLogin);

/**
 * Type:- Get
 * Desc:- Get enabled link document
 * Route:- {{server_url}}/link
 * Middlewares:- User Login
 */
router.get("/", userLogin);

// * End of API Endpoints -->

module.exports = router;
