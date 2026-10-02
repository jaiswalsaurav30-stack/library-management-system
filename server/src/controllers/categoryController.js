const Category = require("../models/Category");

// Add Category
const addCategory = async (req, res) => {
    try {
        const { name, description } = req.body;

        // Check required field
        if (!name) {
            return res.status(400).json({
                message: "Category name is required"
            });
        }

        // Check duplicate category
        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({
                message: "Category already exists"
            });
        }

        // Create category
        const category = await Category.create({
            name,
            description
        });

        res.status(201).json({
            message: "Category added successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add category",
            error: error.message
        });
    }
};


// Get All Categories
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({
            isActive: true
        }).sort({ createdAt: -1 });

        res.status(200).json({
            count: categories.length,
            categories
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch categories",
            error: error.message
        });
    }
};


// Get Category By ID
const getCategoryById = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findOne({
            _id: id,
            isActive: true
        });

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch category",
            error: error.message
        });
    }
};


// Update Category
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description } = req.body;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        // Check duplicate name
        if (name && name !== category.name) {
            const existingCategory = await Category.findOne({ name });

            if (existingCategory) {
                return res.status(400).json({
                    message: "Category already exists"
                });
            }
        }

        if (name !== undefined) {
            category.name = name;
        }

        if (description !== undefined) {
            category.description = description;
        }

        await category.save();

        res.status(200).json({
            message: "Category updated successfully",
            category
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update category",
            error: error.message
        });
    }
};


// Delete / Deactivate Category
const deleteCategory = async (req, res) => {
    try {
        const { id } = req.params;

        const category = await Category.findById(id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        // Soft delete
        category.isActive = false;

        await category.save();

        res.status(200).json({
            message: "Category deactivated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to deactivate category",
            error: error.message
        });
    }
};


module.exports = {
    addCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};