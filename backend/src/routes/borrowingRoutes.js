const express = require("express");

const {
    issueBook,
    getBorrowings,
    returnBook
} = require("../controllers/borrowingController");

const router = express.Router();

// Issue Book
router.post("/issue", issueBook);

// Get All Borrowings
router.get("/", getBorrowings);

// Return Book
router.put("/:id/return", returnBook);

module.exports = router;