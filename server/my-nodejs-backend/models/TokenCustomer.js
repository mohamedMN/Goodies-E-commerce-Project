// models/token.model.js
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const tokenSchema = new Schema({
  userId: {
    type: String,
    required: true,
    ref: "Customer",
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 3600, // this is the expiry time in seconds
  },
});
module.exports = mongoose.model("TokenCustomer", tokenSchema);
