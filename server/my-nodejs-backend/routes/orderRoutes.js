const express = require("express");
const router = express.Router();
const { createOrder, getOrdersList, getOrderById, updateOrderById } = require("../controllers/orderController");

// Route to create a new order
router.post("/orders", createOrder);

// Route to get the list of orders
router.get("/orders", getOrdersList);

// Route to get details of a specific order by its ID
router.get("/orders/:id", getOrderById);

// Route to update order data by its ID
router.put("/orders/:id", updateOrderById);
module.exports = router;
