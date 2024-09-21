import Order from "../models/orderModel.js";
import asyncHandler from "express-async-handler";

const createOrder = asyncHandler(async (req, res) => {
  const { total_amount, status, items } = req.body;

  // Check if items exist and are not an empty array
  if (!items || items.length === 0) {
    res.status(400);
    throw new Error("Add Products");
  } else {
    const order = new Order({
      items,
      total_amount,
      status,
      user_id: req.user._id, // Assuming req.user contains the authenticated user's data
    });

    const createdOrder = await order.save();
    console.log(createdOrder);
    if (createdOrder) {
      res.json(createdOrder);
    } else {
      res.status(500);
      throw new Error("Order is not created");
    }
  }
});

const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({});

  if (orders) {
    res.json(orders);
  } else {
    throw new Error(`No Orders`);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);

  if (order) {
    res.json(order);
  } else {
    throw new Error(`Order Not Found`);
  }
});

const cancelOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id);
  if (order) {
    await Order.deleteOne(order);
    res.json({ msg: "Order Cancelled" });
  } else {
    throw new Error(`Order Not Found`);
  }
});

export { createOrder, getOrders, cancelOrder, getOrderById };
