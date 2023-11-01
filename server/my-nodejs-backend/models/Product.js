const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const users = new Schema({
  _id: {
    type: String,
  },
  sku: {
    type: String,
  },
  product_image: {
    type: String,
  },
  product_name: {
    type: String,
  },
  subcategory_id: [{ type: Schema.Types.ObjectId, ref: "Subcategory" }],
  short_description: {
    type: String,
  },
  long_description: {
    type: String,
  },
  price: {
    type: Number,
  },
  discount_price: {
    type: Number,
  },
  options: [
    {
      name: "Option 1",
      price: 10.99,
      description: "This is option 1.",
    },
  ],
  active: {
    type: Boolean,
  },
});
const User = mongoose.model("User", users);
module.exports = User;
