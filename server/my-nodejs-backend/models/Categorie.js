const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const categories = new Schema({
  _id: {
    type: String,
  },
  category_name: {
    type: String,
  },
  active: {
    type: Boolean,
  },
});
const Categorie = mongoose.model("Categorie", categories);
module.exports = Categorie;
