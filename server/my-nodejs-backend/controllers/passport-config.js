const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { v4 } = require("uuid"); // Import the uuid package and generate a v4 UUID
const Customer = require("../models/Customer");
require("dotenv").config();
bcryptSalt = process.env.BCRYPT_SALT;
const register = async (
  firstName,
  lastName,
  email,
  userName,
  password,
  data
  // role
) => {
  try {
    // const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, Number(bcryptSalt));
    const uniqueId = v4();

    // Create a new user
    const newUser = new User({
      _id: uniqueId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      // role: role,
      user_name: userName,
      password: hashedPassword,
      image: {
        data: data,
      },
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    return console.error(error);
  }
};
const authUser = async (username, password, done) => {
  try {
    console.log("username " + username + " passwotrd " + password);
    const data = await User.findOne({ user_name: username });
    if (!data)
      return done(null, false, {
        message: "Cannot find user with that username",
      });
    const checkPassword = await bcrypt.compare(password, data.password);
    if (!checkPassword)
      return done(null, false, { message: "Incorrect password" });
    if (data) {
      done(null, data);
    }
  } catch (err) {
    return done(err);
  }
};
const isLogin = (req, res, next) => {
  // console.log("req.isAuthenticated() ", req.isAuthenticated());
  if (req.session.user) {
    return next();
  } else {
    return res.status(401).json({ message: "Unauthorized" }); // User is not authenticated
  }
};
const logOut = async (req, res, next) => {
  try {
    console.log("user logOut " + req.session.user);
    const userId = req.session.user;
    const currentTime = new Date();
    const user = await User.findOne({ _id: userId });

    await User.updateOne(
      { _id: user._id },
      { $set: { last_login: currentTime } }
    );

    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      console.log("user " + req.session.user);
      // res.redirect("/");
      res.status(200).json({ message: "logout success" });
    });
  } catch (error) {
    console.log("there's no user session to disconnected :", error);
  }
};

passport.serializeUser((user, done) => {
  // console.log("user ", user);
  console.log("serializeUser called");
  done(null, user);
});
passport.deserializeUser((userObj, done) => {
  // console.log("---------> Deserialize Id");
  // console.log("userObj ", userObj);
  console.log("deserializeUser---- called");

  done(null, userObj);
});
const Access_Public_Secret_Key = process.env.Access_Public_Secret_Key;
const Access_Private_Secret_Key = process.env.Access_Private_Secret_Key;
function generate_Public_Token(user, temp) {
  return jwt.sign(user, Access_Public_Secret_Key, { expiresIn: temp }); // expiresIn : 1H
}

function generate_Private_Token(user, temp) {
  return jwt.sign(user, Access_Private_Secret_Key, { expiresIn: temp }); // expiresIn : 1 day
}

async function verifyRefreshToken(req, res, next) {
  try {
    const refreshToken = req.signedCookies.refreshToken;
    console.log("refreshToken ", refreshToken);
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }
    // const id = req.session.user._id;
    const username = req.session.user.user_name;
    console.log("verifyRefreshToken has been called !!!! : ", username);
    const refreshTokenDoc = await User.findOne({ user_name: username });
    if (!refreshTokenDoc || refreshTokenDoc.refreshToken !== refreshToken) {
      return res
        .status(403)
        .json({ message: "Forbidden: Invalid refresh token" });
    }
    next();
  } catch (error) {
    console.error("Error in verifyRefreshToken:", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

const verifyAccessToken = async (req, res, next) => {
  token = req.headers["authorization"];
  console.log(" verifyAccessToken has ben caled: ");
  if (!token) {
    return res.status(401).json({ message: "AccessToken  is missing" });
  }
  jwt.verify(token.split(" ")[1], Access_Public_Secret_Key, (err) => {
    if (err) {
      return res.status(402).json({ message: "Invalid token" });
    }
    next();
  });
};
function generateToken(user, temps) {
  return jwt.sign(user, Access_Secret_Key, { expiresIn: temps }); // expiresIn : 1H
}
// -------------------------------- Customer Authentication-------------------

const loginCustomer = async (username, password, done) => {
  console.log("email " + username + " passwotrd " + password);
  const data = await Customer.findOne({ email: username });
  if (!data)
    return done(null, false, {
      message: "Cannot find user with that username",
    });
  try {
    const checkPassword = await bcrypt.compare(password, data.password);
    if (!checkPassword)
      return done(null, false, { message: "Incorrect password" });
    if (data) done(null, data);
  } catch (err) {
    return done(err);
  }
};
const register_Customer = async (
  firstName,
  lastName,
  email,
  password,
  hash
) => {
  try {
    // console.log("Last Name:" + lastName);
    // console.log("First Name:" + firstName);
    // console.log("Password:" + password);
    // console.log("Email:" + email);
    // console.log("hash:" + hash);
    const hashedPassword = await bcrypt.hash(password, Number(bcryptSalt));
    const uniqueId = v4();

    // Create a new user
    const newUser = new Customer({
      _id: uniqueId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      password: hashedPassword,
      token: hash, // TOken to check if account is active or not
      // valid_account: true,
      active: true,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    console.error("error :" + error);
    return false;
  }
};

module.exports = {
  register,
  authUser,
  generate_Private_Token,
  generate_Public_Token,
  verifyAccessToken,
  verifyRefreshToken,
  logOut,
  loginCustomer,
  register_Customer,
  isLogin,
};
