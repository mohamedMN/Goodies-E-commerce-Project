const express = require("express");
const app = express();
const router = require("./routes/api");
const middleware = require("./middleware/authMiddleware");

// Define and use routes
app.get("/", (req, res) => {
  res.send("Hello, this is the main application route.");
});
app.use(middleware);
app.use(router);

// Export the Express app for use in server.js
module.exports = app;
