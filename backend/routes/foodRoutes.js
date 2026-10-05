import express from "express";
import Food from "../models/Food.js";
import protect from "../middleware/authMiddleware.js";
import adminOnly from "../middleware/adminMiddleware.js";

const router = express.Router();

// Add a new food item
router.post("/",protect, adminOnly,async (req, res) => {
  try {
    const { name, description, price, category, image } = req.body;

    if (!name || !description || !price || !category) {
      return res.status(400).json({
        message: "Please provide name, description, price and category",
      });
    }

    const food = await Food.create({
      name,
      description,
      price,
      category,
      image,
    });

    res.status(201).json({
      message: "Food item added successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add food item",
      error: error.message,
    });
  }
});

// Get all food items
router.get("/", async (req, res) => {
  try {
    const foods = await Food.find();

    res.status(200).json({
      count: foods.length,
      foods,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch food items",
      error: error.message,
    });
  }
});
// Get a single food item by ID
router.get("/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.status(200).json({
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch food item",
      error: error.message,
    });
  }
});
// Update a food item
router.put("/:id",protect, adminOnly,async (req, res) => {
  try {
    const { name, description, price, category, image, available } =
      req.body;

    const food = await Food.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        image,
        available,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!food) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.status(200).json({
      message: "Food item updated successfully",
      food,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update food item",
      error: error.message,
    });
  }
});
// Delete a food item
router.delete("/:id",protect, adminOnly,async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params.id);

    if (!food) {
      return res.status(404).json({
        message: "Food item not found",
      });
    }

    res.status(200).json({
      message: "Food item deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete food item",
      error: error.message,
    });
  }
});
export default router;