const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  register,
  authUser,
  generate_Public_Token,
  generate_Private_Token,
} = require("./userRoutes");
const User = require("../models/User");
// our API

router.post("/register", async (req, res) => {
  const { firstName, lastName, email, userName, password, role } = req.body;
  // console.log("Last Name:", lastName);
  // console.log("First Name:", firstName);
  // console.log("User Name:", userName);
  // console.log("Password:", password);
  // console.log("Email:", email);
  const newUser = await register(
    firstName,
    lastName,
    email,
    userName,
    password,
    role
  );
  if (newUser) {
    res.status(201).json({ message: "user created successfully" });
  } else {
    res.status(400).json({ message: "Registration failed" });
  }
});

passport.use(new LocalStrategy(authUser));
router.post("/authentication", async (req, res) => {
  try {
    const USER = await new Promise((resolve, reject) => {
      passport.authenticate("local", { session: true }, (err, user) => {
        if (err || !user) {
          return reject("Authentication failed!");
        }
        resolve(user);
      })(req, res);
    });
    console.log("user " + USER);
    if (USER.active) {
      req.session.user = USER;
      await req.session.save;
      const { _id } = USER;
      let options = {
        maxAge: 86400, // would expire after 1 day
        httpOnly: true,
        signed: true,
      };
      const accessToken = generate_Public_Token({ _id }, 3600); // Expire in 1H
      const refreshToken = generate_Private_Token({ _id }, 86400); // Expire in 1 day
      console.log("accessToken :" + accessToken);
      console.log("refreshToken :" + refreshToken);
      res.cookie("refreshToken", refreshToken, options);
      //   Update the user with the refreshToken
      await User.updateOne({ _id }, { $set: { refreshToken } });
      const now = new Date();
      const lastLogin = now.toISOString();
      const lastUpdate = now.toISOString();
      res.status(200).json({
        // accessToken,
        message: "login success",
        user: {
          _id: _id,
          firstName: USER.first_name,
          lastName: USER.last_name,
          email: USER.email,
          userName: USER.user_name,
          role: USER.role,
          creationDate: now,
          lastLogin: lastLogin,
          lastUpdate: lastUpdate,
          active: true,
        },
        token: {
          access_token: accessToken,
          token_type: " JWT, algorithm : HMAC SHA-256",
          expires_in: "in 1H",
          refresh_token: refreshToken,
        },
      });
    } else {
      res.status(402).json({
        // accessToken,
        message: "ERROR account is not active",
      });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(401).json({ message: "invalid credentials" });
  }
});

module.exports = router;
