const Category = require("../models/Category");
const { v4 } = require("uuid"); // Import the uuid package and generate a v4 UUID

const addCategoryController = async (req, res) => {
  try {
    const { categoryName } = req.body;
    console.log("categoryName ", categoryName);

    // Check if the category name is unique
    const existingCategory = await Category.findOne({
      category_name: categoryName,
    });
    if (existingCategory) {
      return res.status(400).json({ error: "Category name must be unique." });
    }

    // Create a new category
    const newCategory = new Category({
      _id: v4(),
      category_name: categoryName,
      active: false, // Set active status to false by default
    });

    const savedCategory = await newCategory.save();
    res.json(savedCategory);
  } catch (error) {
    console.log("erreur ", error);
    res.status(500).json({ Message: "Internal Server Error" });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;

    const skip = (page - 1) * limit;

    const categories = await Category.find().skip(skip).limit(limit);

    // If no data, return an empty array
    if (categories.length === 0) {
      return res.json([]);
    }

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoriesBySearch = async (req, res) => {
  try {
    const searchQuery = req.query.q;

    if (!searchQuery) {
      return res.status(400).json({ error: "Search query is required." });
    }

    const categories = await Category.find({
      name: { $regex: searchQuery, $options: "i" },
    });

    // If no data, return an empty array
    if (categories.length === 0) {
      return res.json([]);
    }

    res.json(categories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params["id"];

    const category = await Category.findById(categoryId);

    if (!category) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.json(category);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateCategoryById = async (req, res) => {
  try {
    const categoryId = req.params["id"];
    let { categoryName } = req.body;
    // Trim leading and trailing whitespaces, convert the entire string to lowercase,
    // and capitalize the first letter
    categoryName = categoryName
      .trim()
      .toLowerCase()
      .replace(/^\w/, (c) => c.toUpperCase());
    // Check if the category name is unique
    const existingCategory = await Category.findOne({
      category_name: categoryName,
    });
    console.log("existingCategory ", existingCategory);
    if (existingCategory) {
      return res.status(400).json({ error: "Category name must be unique." });
    }

    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { category_name: categoryName },
      { new: true } // Return the updated category
    );
    console.log("updatedCategory ", updatedCategory);

    if (!updatedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.json(updatedCategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteCategoryById = async (req, res) => {
  try {
    const categoryId = req.params["id"];

    // Check if the category has attached subcategories
    const subcategories = await Category.find({ parentCategory: categoryId });
    if (subcategories.length > 0) {
      return res.status(400).json({
        error: "Category has attached subcategories and cannot be deleted.",
      });
    }

    // Delete the category
    const deletedCategory = await Category.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ error: "Category not found." });
    }

    res.json({ message: "Category deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  deleteCategoryById,
  addCategoryController,
  getAllCategories,
  getCategoriesBySearch,
  getCategoryById,
  updateCategoryById,
};
