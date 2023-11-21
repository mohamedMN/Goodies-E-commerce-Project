const Product = require("../models/Product");
const { v4 } = require("uuid"); // Import the uuid package and generate a v4 UUID

const createProduct = async (req, res) => {
  try {
    const {
      product_image,
      product_name,
      subcategory_id,
      short_description,
      long_description,
      price,
      discount_price,
    } = req.body;

    // Check if the product name is unique
    const existingProductByName = await Product.findOne({ product_name });
    if (existingProductByName) {
      return res.status(400).json({ error: "Product name must be unique." });
    }

    // Create a new product
    const newProduct = new Product({
      _id: v4(),
      discount_price,
      price,
      long_description,
      product_image,
      short_description,
      subcategory_id,
      product_name,
    });

    const savedProduct = await newProduct.save();
    res.status(200).json({ message: "product add success", savedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getProductsListWithCategoryName = async (req, res) => {
  try {
    const products = await Product.find()
      // .select("_id product_image product_name subcategory_id short_description long_description price") // Select only the necessary fields
      .populate({
        path: "subcategory_id",
        select: "subcategory_name", // Select only the necessary fields for subcategory
        populate: {
          path: "category_id",
          select: "category_name", // Select only the necessary field for category
        },
      });

    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// const getProductsList = async (req, res) => {
//   try {
//     const { page = 1, searchQuery = "" } = req.query;
//     const perPage = 10;

//     const query = {
//       $or: [
//         { name: { $regex: searchQuery, $options: "i" } },
//         { sku: { $regex: searchQuery, $options: "i" } },
//       ],
//     };

//     const products = await Product.find(query)
//       .skip((page - 1) * perPage)
//       .limit(perPage)
//       .select("name sku isActive subcategory") // Select only the necessary fields
//       .populate({
//         path: "subcategory",
//         select: "name category", // Select only the necessary fields for subcategory
//         populate: {
//           path: "category",
//           select: "name", // Select only the necessary field for category
//         },
//       })
//       .exec();

//     const formattedProducts = products.map((product) => ({
//       name: product.name,
//       sku: product.sku,
//       isActive: product.isActive,
//       categoryName: product.subcategory
//         ? product.subcategory.category.name
//         : null,
//       // Add other fields as needed
//     }));

//     res.json(formattedProducts);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

// const getProductById = async (req, res) => {
//   try {
//     const productId = req.params.id;

//     const product = await Product.findById(productId)
//       .select(
//         "_id product_image product_name subcategory_id short_description long_description price"
//       ) // Select only the necessary fields
//       .populate({
//         path: "subcategory",
//         select: "name", // Select only the necessary field for subcategory
//       })
//       .exec();

//     if (!product) {
//       return res.status(404).json({ error: "Product not found." });
//     }

//     const formattedProduct = {
//       name: product.name,
//       sku: product.sku,
//       isActive: product.isActive,
//       subcategoryName: product.subcategory ? product.subcategory.name : null,
//       // Add other fields as needed
//     };

//     res.status(200).json(formattedProduct);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

const updateProductById = async (req, res) => {
  try {
    const productId = req.params["id"];
    const {
      product_name,
      product_image,
      price,
      discount_price,
      short_description,
      long_description,
    } = req.body;

    // Check if the product name is unique
    const existingProduct = await Product.findOne({
      product_name,
      _id: { $ne: productId },
    });
    if (existingProduct) {
      return res.status(400).json({ error: "Product name must be unique." });
    }

    // Update the product data
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      {
        product_name,
        product_image,
        price,
        discount_price,
        short_description,
        long_description,
      },
      { new: true, runValidators: true }
    )
      // .select("_id product_image product_name subcategory_id short_description long_description price")
      .populate({
        path: "subcategory_id",
        select: "subcategory_name", // Select only the necessary field for subcategory
      });

    if (!updatedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res
      .status(200)
      .json({ message: "product updated successfully", updatedProduct });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const deleteProductById = async (req, res) => {
  try {
    const productId = req.params["id"];

    // Delete the product
    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({ message: "Product deleted successfully." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getProductsListWithCategoryName,
  createProduct,
  // getProductsList,
  deleteProductById,
  // getProductById,
  updateProductById,
};
