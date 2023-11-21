const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const {
  addCategoryController,
  getAllCategories,
  getCategoriesBySearch,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} = require("../controllers/CategoryController");

// create new category ------------------------- checkAdminOrManager   (checkUserRole)
router.post("/categories", addCategoryController);

// Route to retrieve all categories with pagination
router.get("/categories", getAllCategories);

// Route to retrieve categories based on a search query
// router.get("/search", getCategoriesBySearch);
// deja in redux

// Route to retrieve a category by its ID
router.get("/:id", getCategoryById);

// Route to update a category by its ID------------------------- checkAdminOrManager
router.put("/categories/:id", updateCategoryById);

// Route to delete a category by its ID------------------------- checkAdminOrManager
router.delete("/categories/:id", deleteCategoryById);

module.exports = router;
