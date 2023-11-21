const express = require("express");
const app = express();
const { middleware } = require("./middleware/authMiddleware");
const usersRoutes = require("./routes/api");
const customersRoutes = require("./routes/customerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const productRoutes = require("./routes/productRoutes");

app.use(middleware);
app.use("/users", usersRoutes);
app.use("/customers", customersRoutes);
app.use("/category", categoryRoutes);
app.use("/subcategory", subcategoryRoutes);
app.use("/product", productRoutes);

// Export the Express app for use in server.js
module.exports = app;
