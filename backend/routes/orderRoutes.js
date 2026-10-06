import express from "express";
import Order from "../models/Order.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// Create a new order
router.post("/", protect, async (req, res) => {
  try {
    const {
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
    } = req.body;

    if (
      !items ||
      items.length === 0 ||
      !totalAmount ||
      !deliveryAddress ||
      !paymentMethod
    ) {
      return res.status(400).json({
        message: "Please provide all order details",
      });
    }

    const order = await Order.create({
      user: req.user.id,
      items,
      totalAmount,
      deliveryAddress,
      paymentMethod,
      paymentStatus:
        paymentMethod === "Cash on Delivery"
          ? "Pending"
          : "Paid",
    });

    res.status(201).json({
      message: "Order placed successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to place order",
      error: error.message,
    });
  }
});

// Get logged-in user's orders
router.get("/my-orders", protect, async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user.id,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
});
// Get all orders for admin
router.get("/admin/all", protect, adminOnly, async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email")
      .sort({ createdAt: -1 });

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
});
// Update order status for admin
router.put("/admin/:id/status", protect, adminOnly, async (req, res) => {
  try {
    const { orderStatus } = req.body;

    const allowedStatuses = [
      "Pending",
      "Confirmed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
    ];

    if (!allowedStatuses.includes(orderStatus)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      {
        orderStatus,
      },
      {
        new: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json({
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update order status",
      error: error.message,
    });
  }
});

export default router;