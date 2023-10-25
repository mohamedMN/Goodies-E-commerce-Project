const express = require("express");
const middleware = express();
const passport = require("passport");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const session = require("express-session");

// Define and use middleware
middleware
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitialized: true,
      // cookie: { secure: true, maxAge: 3600000 },
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json()) // This middleware parses JSON request bodies
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser("secret3"));

// only ADMIN account can use this route
const checkUserRoleAdmin = (req, res, next) => {
  console.log(
    // "req.session.user " +
    //   req.session.user +
    " req.session.user.role " + req.session.user.role
  );
  if (req.session.user.role === "Admin") {
    next();
  } else {
    res.status(403).json({
      message: "you don't have enough privilege .",
    });
  }
};
const checkUserRole = (req, res, next) => {
  const userRole = req.session.user.role;

  if (userRole === "Admin" || userRole === "Manager") {
    next();
  } else {
    res.status(403).json({
      message: "Role privilege limitation",
    });
  }
};

module.exports = { middleware, checkUserRole, checkUserRoleAdmin };
