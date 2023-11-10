const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  id: { type: String, required: true, unique: true }, 
  customer_id: { type: String, required: true, ref: "Customer" }, 
  order_items: [
    {
      product_id: { type: String, required: true }, 
      quantity: { type: Number, required: true },
      price: { type: Number, required: true },
    },
  ],
  order_date: { timestamps: true }, // Date and time when the order was placed
  cart_total_price: { type: Number, required: true }, // Total price of the items in the cart
  status: { type: String, required: true }, // Status of the order (e.g., 'Pending', 'Shipped', 'Delivered', etc.)
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
