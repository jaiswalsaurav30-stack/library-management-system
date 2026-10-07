const express = require("express");

const {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require("../controllers/categoryController");

const router = express.Router();

// Add Category
router.post("/", addCategory);

// Get All Categories
router.get("/", getCategories);

// Get Category By ID
router.get("/:id", getCategoryById);

// Update Category
router.put("/:id", updateCategory);

// Delete / Deactivate Category
router.delete("/:id", deleteCategory);

module.exports = router;