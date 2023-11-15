const {
  generate_Public_Token,
  generate_Private_Token,
  authUser,
  register,
  loginCustomer,
} = require("./passport-config");
const User = require("../models/User");
const path = require("path");
const fs = require("fs");

const sendEmail = require("../utils/sendEmail");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
passport.use("local-user", new LocalStrategy(authUser));
const login = async (req, res) => {
  try {
    const USER = await new Promise((resolve, reject) => {
      passport.authenticate("local-user", { session: true }, (err, user) => {
        if (err || !user) {
          return reject("Authentication failed!");
        }
        resolve(user);
      })(req, res);
    });
    req.session.user = USER;
    await req.session.save;
    // console.log(" role ! " + JSON.stringify(req.session));

    if (USER.active) {
      const { _id } = USER;
      let options = {
        maxAge: 86400, // would expire after 1 day
        httpOnly: true,
        signed: true,
      };
      const accessToken = generate_Public_Token({ _id }, 3600); // Expire in 1H
      const refreshToken = generate_Private_Token({ _id }, 86400); // Expire in 1 day
      // console.log("accessToken :" + accessToken);
      // console.log("refreshToken :" + refreshToken);
      // console.log("req.session.passport.user  " + req.session.passport);

      // console.log("user session ::" + JSON.stringify(req.session));

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
};

const registerUser = async (req, res) => {
  const { firstName, lastName, email, userName, password } = req.body;
  console.log("Last Name:", lastName);
  console.log("First Name:", firstName);
  console.log("User Name:", userName);
  console.log("Password:", password);
  console.log("Email:", email);
  if (req.file) {
    var data = req.file.buffer;
  } else {
    const defaultImagePath = path.join(
      __dirname,
      "../assets/images/images.jpg"
    );
    var data = fs.readFileSync(defaultImagePath);
  }
  // const { firstName, lastName, email, userName, password, role } = req.body;
  const newUser = await register(
    firstName,
    lastName,
    email,
    userName,
    password,
    data
    // role
  );
  if (newUser) {
    res.status(201).json({ message: "user created successfully" });
  } else {
    res.status(400).json({ message: "Registration failed" });
  }
};

const refresh = (req, res) => {
  try {
    const _id = req.session.user._id;
    // console.log("id : " + _id);
    const accessToken = generate_Public_Token({ _id }, 3600); //expired: 1H
    res
      .status(200)
      .json({ accessToken, message: "the refresh token is created" });
  } catch (error) {
    return res.status(400).json({ error: " user id is undefined" });
  }
};

//---------------------- RESET PASSWORD -----------------------------
const crypto = require("crypto");
const bcrypt = require("bcrypt");
const Token = require("../models/Token");
require("dotenv").config();
bcryptSalt = process.env.BCRYPT_SALT;
clientURL = process.env.CLIENT_URL;
const requestPasswordReset = async (email) => {
  // console.log("clientURL " + clientURL);
  console.log("email " + email);
  const user = await User.findOne({ email });

  if (!user) throw new Error("User does not exist");
  console.log("user._id " + user._id);

  let token = await Token.findOne({ userId: user._id });
  if (token) await token.deleteOne();
  let resetToken = crypto.randomBytes(32).toString("hex");
  const hash = await bcrypt.hash(resetToken, Number(bcryptSalt));
  await new Token({
    userId: user._id,
    token: hash,
    createdAt: Date.now(),
  }).save();

  const link = `${clientURL}?token=${resetToken}&id=${user._id}`;
  sendEmail(
    user.email,
    "Password Reset Request",
    { name: user.user_name, link: link },
    "../utils/email/template/requestResetPassword.handlebars"
  );
  return link;
};
const resetPasswordRequestController = async (req, res) => {
  const { email } = req.body;
  // console.log("email " + JSON.stringify(req.body));
  try {
    const requestPasswordResetService = await requestPasswordReset(email);
    return res.status(200).json(requestPasswordResetService);
  } catch (error) {
    console.log(error);
  }
};

const resetPasswordController = async (req, res) => {
  console.log(`
  userId: ${req.body.userId},
  token: ${req.body.token},
  password: ${req.body.password}
`);
  const resetPasswordService = await resetPassword(
    req.body.userId,
    req.body.token,
    req.body.password
  );
  if (resetPasswordService) {
    return res.status(200).json({ message: " password has reset succes" });
  } else {
    return res.status(400).json({ error: "Password reset failed" });
  }
};
const resetPassword = async (userId, token, password) => {
  let passwordResetToken = await Token.findOne({ userId });
  if (!passwordResetToken) {
    throw new Error("Invalid or expired password reset token");
  }
  const isValid = await bcrypt.compare(token, passwordResetToken.token);
  if (!isValid) {
    throw new Error("Invalid or expired password reset token");
  }
  const hash = await bcrypt.hash(password, Number(bcryptSalt));
  await User.updateOne(
    { _id: userId },
    { $set: { password: hash } },
    { new: true }
  );
  const user = await User.findById({ _id: userId });
  sendEmail(
    user.email,
    "Password Reset Successfully",
    {
      name: user.name,
    },
    "./template/resetPassword.handlebars"
  );
  await passwordResetToken.deleteOne();
  return true;
};
// ------------------------------------------CuStomer Controller----------------------------------------
const Customer = require("../models/Customer");
passport.use("local-customer", new LocalStrategy(loginCustomer));

const loginCustomerController = async (req, res) => {
  try {
    const CUSTOMER = await new Promise((resolve, reject) => {
      passport.authenticate(
        "local-customer",
        { session: true },
        (err, user) => {
          if (err || !user) {
            return reject("Authentication failed!");
          }
          resolve(user);
        }
      )(req, res);
    });
    req.session.customer = CUSTOMER;
    await req.session.save;
    // console.log(" role ! " + JSON.stringify(req.session));

    if (CUSTOMER.valid_account) {
      const { _id } = CUSTOMER;
      let options = {
        maxAge: 86400, // would expire after 1 day
        httpOnly: true,
        signed: true,
      };
      const accessToken = generate_Public_Token({ _id }, 3600); // Expire in 1H
      const refreshToken = generate_Private_Token({ _id }, 86400); // Expire in 1 day
      res.cookie("refreshToken", refreshToken, options);
      //   Update the user with the refreshToken
      await Customer.updateOne({ _id }, { $set: { refreshToken } });
      const now = new Date();
      const lastLogin = now.toISOString();
      res.status(200).json({
        // accessToken,
        message: "login success",
        user: {
          _id: _id,
          firstName: CUSTOMER.first_name,
          lastName: CUSTOMER.last_name,
          email: CUSTOMER.email,
          creationDate: now,
          lastLogin: lastLogin,
          active: true,
          valid_account: true,
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
        message: "ERROR account is not active !  , you should check your EMAIL",
      });
    }
  } catch (error) {
    console.error("Error in login:", error);
    res.status(401).json({ message: "invalid credentials" });
  }
};
module.exports = {
  login,
  registerUser,
  refresh,
  resetPasswordRequestController,
  resetPasswordController,
  loginCustomerController,
};
