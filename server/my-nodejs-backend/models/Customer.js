const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customers = new Schema(
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
    valid_account: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
      default: "",
    },
    token: {
      type: String,
      default: "",
    },
    expires: {
      type: Number,
      default: Date.now(),
    },
  },
  {
    timestamps: true,
    createdAt: "creation_date", // Use `creation_date` to store the created date
    updatedAt: "last_update", // and `last_update` to store the last updated date
  }
);
const Customer = mongoose.model("Customer", customers);
module.exports = Customer;
