const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const cors = require("cors");
const passport = require("passport");

module.exports = (app, express, mongooseConnection) => {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    session({
      store: new MongoStore({ mongooseConnection: mongooseConnection }),
      secret: process.env.COOKIESECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 24 * 60 * 60 * 1000 },
    })
  );
  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", process.env.CLIENT_URL);
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
  });
  app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
  app.use(passport.initialize());
  app.use(passport.session());
};
