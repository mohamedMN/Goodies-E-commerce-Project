const mongoose = require("mongoose");
require("dotenv").config();

const dbURI = process.env.DB_URI;

const connection = async () => {
  try {
    mongoose.connect(dbURI);
    console.log("connected to db");
  } catch (error) {
    console.error(err);
  }
};
module.exports = connection;
