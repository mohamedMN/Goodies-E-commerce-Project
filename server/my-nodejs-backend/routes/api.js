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
  const { lastName, firstName, userName, password, email } = req.body;
  console.log(
    password +
      "" +
      userName +
      " email " +
      email +
      " firstName " +
      firstName +
      " path " +
      lastName +
      " lastName "
  );
  const newUser = await register(
    lastName,
    firstName,
    userName,
    password,
    email
  );

  if (newUser) {
    res.status(200).json({ message: "Registration successful" });
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

    if (USER.active) {
      req.session.user = USER;
      await req.session.save;
      const { id } = USER;
      let options = {
        maxAge: 86400, // would expire after 1 day
        httpOnly: true,
        signed: true,
      };
      const accessToken = generate_Public_Token({ id }, 3600); // Expire in 1H
      const refreshToken = generate_Private_Token({ id }, 86400); // Expire in 1 day
      console.log("accessToken :" + accessToken);
      console.log("refreshToken :" + refreshToken);
      res.cookie("refreshToken", refreshToken, options);
      //   Update the user with the refreshToken
      await User.updateOne({ id }, { $set: { refreshToken } });
      const now = new Date();
      const lastLogin = now.toISOString();
      const lastUpdate = now.toISOString();
      res.status(200).json({
        // accessToken,
        message: "login success",
        user: {
          _id: id,
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
