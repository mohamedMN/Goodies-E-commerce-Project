const express = require("express");
const app = express();
require("dotenv").config();
const PORT = process.env.PORT;
const connection = require("./config/database");

// calling connection function
connection();

// Middleware and routes setup
// Import and use routes
const APP = require("./app");
app.use("/", APP);

app.listen(PORT, () => {
  console.log("Server on start  http://localhost:" + PORT);
});
