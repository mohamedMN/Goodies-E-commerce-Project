const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const customers = new Schema({
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
  valid_account: {
    type: Boolean,
  },
});
const Customer = mongoose.model("Customer", customers);
module.exports = Customer;
