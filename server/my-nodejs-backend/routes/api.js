const express = require("express");
const router = express.Router();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const {
  register,
  authUser,
  generate_Public_Token,
  generate_Private_Token,
  verifyRefreshToken,
  verifyAccessToken,
} = require("./userRoutes");
const User = require("../models/User");
const {
  checkUserRoleAdmin,
  checkUserRole,
} = require("../middleware/authMiddleware");
// our API

router.post("/register", checkUserRoleAdmin, async (req, res) => {
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
//to get new access Token
router.post("/refresh", (req, res) => {
  const _id = req.session.user._id;
  // console.log("id : " + _id);
  const accessToken = generate_Public_Token({ _id }, 3600); //expired: 1H
  res
    .status(200)
    .json({ accessToken, message: "the refresh token is created" });
});
//Only the users with admin and manager role can get the users data.
router.get("/users", checkUserRole, async (req, res) => {
  try {
    // const username = req.session.user.username;
    const users = await User.find();
    // res.status(200).json({ users, username });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ message: "error to get all users" });
  }
});
//Only the users with admin and manager role can get the users data.
router.get("/users/:id", checkUserRole, async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await User.find({ _id: userId });
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  res.status(200).json({ data: user });
});
//Only the users with admin and manager role can get ALL users.
router.get("/api/users", checkUserRole, (req, res) => {
  const query = req.query.query;
  const results = User.filter({ user_name: query });
  if (results.length === 0) {
    return res
      .status(404)
      .json({ message: "No users found with the provided query." });
  }
  res.status(200).json({ data: results });
});
// Only the users with admin role can update the user's data.
router.put("/users/:id", checkUserRoleAdmin, async (req, res) => {
  const userId = req.params.id;
  const updatedUserData = req.body;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "invalid user id" });
    }
    await User.updateOne({ _id: user._id }, { $set: updatedUserData });
    res.status(200).json({ message: "user updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "the field xxx should be of type xxx" });
  }
});
// Only the users with admin role can DELETE the user's.
router.delete("/users/:id", checkUserRoleAdmin, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "invalid user id" });
    }
    await User.deleteOne({ _id: user._id });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the user" });
  }
});

module.exports = router;
