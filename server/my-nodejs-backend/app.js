const express = require("express");
const app = express();
const { middleware } = require("./middleware/authMiddleware");
const usersRoutes = require("./routes/api");
const customersRoutes = require("./routes/customerRoutes");

app.use(middleware);
app.use("/users", usersRoutes);
app.use("/customers", customersRoutes);

// Export the Express app for use in server.js
module.exports = app;
