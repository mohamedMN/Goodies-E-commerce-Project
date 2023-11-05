const express = require("express");
const app = express();
const router = require("./routes/api");
const { middleware } = require("./middleware/authMiddleware");

app.use(middleware);
app.use(router);

// Export the Express app for use in server.js
module.exports = app;
