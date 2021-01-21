exports.models = require("./models");
exports.middlewares = require("./middlewares");
// ! This is a temporary fix. Try moving routes above middlwares
exports.routes = require("./routes");
exports.controllers = require("./controllers");
exports.validators = require("./validators");
