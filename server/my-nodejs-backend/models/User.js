const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const users = new Schema({
  id: {
    type: String,
    unique: true,
    index: true,
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
    enum: ["Manager", "Admin"],
  },
  user_name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  creation_date: {
    type: Number,
    default: Date.now,
  },
  last_login: {
    type: Number,
    default: Date.now,
  },
  last_update: {
    type: Number,
    default: Date.now,
  },
  active: {
    type: Boolean,
  },
  refreshToken: {
    type: String,
  },
});
const User = mongoose.model("User", users);
module.exports = User;
