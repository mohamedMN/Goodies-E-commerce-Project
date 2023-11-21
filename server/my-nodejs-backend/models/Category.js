const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = new Schema({
  _id: {
    type: String,
  },
  category_name: {
    type: String,
    require: true,
  },
  active: {
    type: Boolean,
  },
});
const Category = mongoose.model("Category", categories);
module.exports = Category;
