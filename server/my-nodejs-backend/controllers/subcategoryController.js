const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");
const { v4 } = require("uuid"); // Import the uuid package and generate a v4 UUID

const createSubcategory = async (req, res) => {
  try {
    const { subcategoryName, category_id } = req.body;
    console.log("subcategoryName ", subcategoryName);
    console.log("category_id ", category_id);
    // Check if the subcategory name is unique
    const existingSubcategory = await Subcategory.findOne({
      subcategory_name: subcategoryName,
    });
    if (existingSubcategory) {
      return res
        .status(400)
        .json({ error: "Subcategory name must be unique." });
    }

    const newSubcategory = new Subcategory({
      _id: v4(),
      subcategory_name: subcategoryName,
      category_id: category_id,
      isActive: false, // Set active status to false by default
    });

    const savedSubcategory = await newSubcategory.save();
    res.json(savedSubcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const getSubcategoriesWithPagination = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category_id"); // Populate the 'category' field with the 'name' property
    // .exec();

    if (subcategories.length === 0) {
      return res.json([]);
    }

    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSubcategoriesWithSearchAndPagination = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const perPage = 10;
    const searchQuery = req.query.q;

    const aggregationPipeline = [
      {
        $match: {
          name: { $regex: searchQuery, $options: "i" },
        },
      },
      {
        $lookup: {
          from: "categories", // Assuming 'categories' is the name of the category collection/table
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $skip: (page - 1) * perPage,
      },
      {
        $limit: perPage,
      },
      {
        $project: {
          _id: 1,
          name: 1,
          isActive: 1,
          category: "$categoryInfo.name", // Include the 'name' property of the category in the result
        },
      },
    ];

    const subcategories = await Subcategory.aggregate(aggregationPipeline);

    if (subcategories.length === 0) {
      return res.json([]);
    }

    res.json(subcategories);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getSubcategoryById = async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    const aggregationPipeline = [
      {
        $match: {
          _id: subcategoryId,
        },
      },
      {
        $lookup: {
          from: "categories", // Assuming 'categories' is the name of the category collection/table
          localField: "category",
          foreignField: "_id",
          as: "categoryInfo",
        },
      },
      {
        $unwind: "$categoryInfo",
      },
      {
        $project: {
          _id: 1,
          name: 1,
          isActive: 1,
          category: "$categoryInfo.name", // Include the 'name' property of the category in the result
        },
      },
    ];

    const subcategory = await Subcategory.aggregate(aggregationPipeline);

    if (!subcategory || subcategory.length === 0) {
      return res.status(404).json({ error: "Subcategory not found." });
    }

    res.json(subcategory[0]); // Assuming there's only one result for the provided ID
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateSubcategoryById = async (req, res) => {
  try {
    const subcategoryId = req.params["id"];
    const { subcategoryName } = req.body;
    console.log("subcategoryName ", subcategoryName);
    console.log("subcategoryId ", subcategoryId);
    // Check if the subcategory name is unique
    const existingSubcategory = await Subcategory.findOne({
      subcategory_name: subcategoryName,
    });
    if (existingSubcategory) {
      return res
        .status(400)
        .json({ error: "Subcategory name must be unique." });
    }
    const subcategory = await Subcategory.find({ _id: subcategoryId });

    if (!subcategory) {
      return res.status(404).json({ error: "Subcategory not found." });
    }

    // Update the subcategory data
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      { subcategory_name: subcategoryName },
      { new: true }
    );

    res.json(updatedSubcategory);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteSubcategoryById = async (req, res) => {
  try {
    const subcategoryId = req.params["id"];

    // // Check if the subcategory has attached products
    // const productsCount = await Product.countDocuments({
    //   subcategory: subcategoryId,
    // });

    // if (productsCount > 0) {
    //   return res.status(400).json({
    //     error: "Subcategory has attached products and cannot be deleted.",
    //   });
    // }

    // Delete the subcategory
    const deletedSubcategory = await Subcategory.findByIdAndDelete(
      subcategoryId
    );

    if (!deletedSubcategory) {
      return res.status(404).json({ error: "Subcategory not found." });
    }

    res.json({ message: "Subcategory deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createSubcategory,
  getSubcategoriesWithPagination,
  getSubcategoriesWithSearchAndPagination,
  getSubcategoryById,
  updateSubcategoryById,
  deleteSubcategoryById,
};
