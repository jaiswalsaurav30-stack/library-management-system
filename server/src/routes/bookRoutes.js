const express = require("express");

console.log("BOOK ROUTES LOADED");

const {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
} = require("../controllers/bookController");

const router = express.Router();

// Test Route
router.get("/test", (req, res) => {
    res.json({
        message: "Book route is working"
    });
});

// Add Book
router.post("/", addBook);

// Get All Books
router.get("/", getBooks);

// Get Single Book
router.get("/:id", getBookById);

// Update Book
router.put("/:id", updateBook);

// Delete / Deactivate Book
router.delete("/:id", deleteBook);

module.exports = router;