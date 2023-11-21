const Order = require("../models/Order");
const Customer = require("../models/Customer");

const createOrder = async (req, res) => {
  try {
    // Check if the customer is authenticated
    const customer = req.user; // Assuming user information is available in the request (e.g., after authentication)
    if (!customer) {
      return res
        .status(401)
        .json({ error: "Unauthorized. Customer must be authenticated." });
    }

    // Check if the customer has validated their email
    if (!customer.emailValidated) {
      return res.status(403).json({
        error:
          "Forbidden. Customer must validate their email to create an order.",
      });
    }

    // Create a new order
    const newOrder = new Order({
      customer: customer._id,
      status: "open", // Default status is open
      orderDate: new Date(), // Update order date when created
      // Add other fields as needed
    });

    const savedOrder = await newOrder.save();
    res.json(savedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrdersList = async (req, res) => {
  try {
    // Check if the user has admin or manager role
    const user = req.user; // Assuming user information is available in the request (e.g., after authentication)
    if (!user || (user.role !== "admin" && user.role !== "manager")) {
      return res.status(403).json({
        error: "Permission denied. Only admins and managers can list orders.",
      });
    }

    const page = parseInt(req.query.page) || 1;
    const perPage = 10;

    const orders = await Order.aggregate([
      {
        $lookup: {
          from: "customers", // Name of the customers collection
          localField: "customer",
          foreignField: "_id",
          as: "customerInfo",
        },
      },
      {
        $unwind: "$customerInfo",
      },
      {
        $project: {
          _id: 1,
          status: 1,
          orderDate: 1,
          itemsTotal: 1, // Assuming you have an 'itemsTotal' field in the Order model
          "customerInfo.firstName": 1,
          "customerInfo.lastName": 1,
        },
      },
      {
        $skip: (page - 1) * perPage,
      },
      {
        $limit: perPage,
      },
    ]);

    const totalCount = await Order.countDocuments();

    res.json({ totalCount, orders });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getOrderById = async (req, res) => {
  try {
    // Check if the user has admin or manager role
    const user = req.user; // Assuming user information is available in the request (e.g., after authentication)
    if (!user || (user.role !== "admin" && user.role !== "manager")) {
      return res.status(403).json({
        error:
          "Permission denied. Only admins and managers can get order details.",
      });
    }

    const orderId = req.params.id;

    const order = await Order.aggregate([
      {
        $match: {
          _id: orderId,
        },
      },
      {
        $lookup: {
          from: "customers", // Name of the customers collection
          localField: "customer",
          foreignField: "_id",
          as: "customerInfo",
        },
      },
      {
        $unwind: "$customerInfo",
      },
      {
        $project: {
          _id: 1,
          status: 1,
          orderDate: 1,
          itemsTotal: 1, // Assuming you have an 'itemsTotal' field in the Order model
          "customerInfo.firstName": 1,
          "customerInfo.lastName": 1,
        },
      },
    ]);

    if (order.length === 0) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.json(order[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const updateOrderById = async (req, res) => {
  try {
    // Check if the user has admin or manager role
    const user = req.user; // Assuming user information is available in the request (e.g., after authentication)
    if (!user || (user.role !== "admin" && user.role !== "manager")) {
      return res.status(403).json({
        error: "Permission denied. Only admins and managers can update orders.",
      });
    }

    const orderId = req.params.id;
    const { status } = req.body;

    // Update the order data
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true, runValidators: true }
    )
      .select("status orderDate itemsTotal customer")
      .populate({
        path: "customer",
        select: "firstName lastName", // Select only the necessary fields for customer
      })
      .exec();

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found." });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createOrder,
  getOrderById,
  getOrdersList,
  updateOrderById,
};
