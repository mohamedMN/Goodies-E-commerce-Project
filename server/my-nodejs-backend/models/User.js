const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const users = new Schema(
  {
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
      unique: true,
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
    last_login: {
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
  },
  {
    timestamps: true,
    createdAt: "creation_date", // Use `creation_date` to store the created date
    updatedAt: "last_update", // and `last_update` to store the last updated date
  }
);
const User = mongoose.model("User", users);
module.exports = User;
