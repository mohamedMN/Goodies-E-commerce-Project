const express = require("express");
const {
  createProduct,
  getProductsListWithCategoryName,
  getProductsList,
  getProductById,
  updateProductById,
  deleteProductById,
} = require("../controllers/productController");
const router = express.Router();

// Route to create a new product   (checkUserRole)
router.post("/products", createProduct);

// Route to retrieve the product list with category name
router.get("/products", getProductsListWithCategoryName);

// // Route to retrieve the product list with search and pagination
// router.get("/products", getProductsList);

// // Route to retrieve a product by its ID
// router.get("/products/:id", getProductById);

// Route to update product data by its ID
router.put("/products/:id", updateProductById);

// Route to delete a product by its ID
router.delete("/products/:id", deleteProductById);

module.exports = router;
