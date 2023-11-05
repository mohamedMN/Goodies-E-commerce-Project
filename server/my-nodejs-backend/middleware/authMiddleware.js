const express = require("express");
const middleware = express();
const passport = require("passport");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");

const cors = require("cors");
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:3125",
  ],
  // methods: ["*"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
// Define and use middleware
middleware
  .use(cors(corsOptions))
  .use(
    session({
      secret: "abcdefg",
      resave: true,
      saveUninitialized: false,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(express.json()) // This middleware parses JSON request bodies
  .use(bodyParser.json())
  .use(bodyParser.urlencoded({ extended: true }))
  .use(cookieParser("secret3"));

module.exports = { middleware };
