const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { v4 } = require("uuid"); // Import the uuid package and generate a v4 UUID
require("dotenv").config();

const register = async (
  firstName,
  lastName,
  email,
  userName,
  password,
  role
) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const uniqueId = v4();

    // Create a new user
    const newUser = new User({
      _id: uniqueId,
      first_name: firstName,
      last_name: lastName,
      email: email,
      role: role,
      user_name: userName,
      password: hashedPassword,
      active: true,
    });

    await newUser.save();
    return newUser;
  } catch (error) {
    return console.error(error);
  }
};
const authUser = async (username, password, done) => {
  // console.log("username " + username + " passwotrd " + password);
  const data = await User.findOne({ user_name: username });
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
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user);
});
passport.deserializeUser((userObj, done) => {
  console.log("---------> Deserialize Id");
  console.log(userObj);
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
module.exports = {
  register,
  authUser,
  generate_Private_Token,
  generate_Public_Token,
};
