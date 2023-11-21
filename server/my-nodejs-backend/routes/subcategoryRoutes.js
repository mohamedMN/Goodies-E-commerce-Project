const express = require("express");
const router = express.Router();
const {
  createSubcategory,
  getSubcategoriesWithPagination,
  getSubcategoriesWithSearchAndPagination,
  getSubcategoryById,
  updateSubcategoryById,
  deleteSubcategoryById,
} = require("../controllers/subcategoryController");

// Route to create a new subcategory
router.post("/subcategories", createSubcategory);

// Route to retrieve subcategories with pagination
router.get("/subcategories", getSubcategoriesWithPagination);

// Route to retrieve subcategories with search and pagination
// redux
// router.get("/subcategories", getSubcategoriesWithSearchAndPagination);

// Route to retrieve a subcategory by its ID
// router.get("/subcategories/:id", getSubcategoryById);

// Route to update subcategory data by its ID
router.put("/subcategories/:id", updateSubcategoryById);

// Route to delete a subcategory by its ID
router.delete("/subcategories/:id", deleteSubcategoryById);

module.exports = router;
