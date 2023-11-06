const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const users = new Schema({
  _id: {
    type: String,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Manager", // enum: ["Manager", "Admin"],
  },
  user_name: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Date,
    default: Date.now,
  },
  last_login: {
    type: Date,
    default: Date.now,
  },
  last_update: {
    type: Date,
    default: Date.now,
  },
  active: {
    type: Boolean,
  },
  image: {
    data: Buffer,
    createdAt: { type: Date, default: Date.now },
  },
  refreshToken: {
    type: String,
    default: "",
  },
});
const User = mongoose.model("User", users);
module.exports = User;
