const Book = require("../models/Book");

// Add Book
const addBook = async (req, res) => {
    try {
        const {
            title,
            author,
            isbn,
            category,
            totalCopies
        } = req.body;

        // Check required fields
        if (!title || !author || !isbn || !category || !totalCopies) {
            return res.status(400).json({
                message: "All book fields are required"
            });
        }

        // Check if ISBN already exists
        const existingBook = await Book.findOne({ isbn });

        if (existingBook) {
            return res.status(400).json({
                message: "A book with this ISBN already exists"
            });
        }

        // Create book
        const book = await Book.create({
            title,
            author,
            isbn,
            category,
            totalCopies,
            availableCopies: totalCopies
        });

        res.status(201).json({
            message: "Book added successfully",
            book
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to add book",
            error: error.message
        });
    }
};


// Get All Books
const getBooks = async (req, res) => {
    try {
        const books = await Book.find({ isActive: true })
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: books.length,
            books
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch books",
            error: error.message
        });
    }
};


// Get Single Book
const getBookById = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findOne({
            _id: id,
            isActive: true
        });

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            book
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch book",
            error: error.message
        });
    }
};


// Update Book
const updateBook = async (req, res) => {
    try {
        const { id } = req.params;

        const {
            title,
            author,
            isbn,
            category,
            totalCopies
        } = req.body;

        // Find book
        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        // Check ISBN conflict
        if (isbn && isbn !== book.isbn) {
            const existingBook = await Book.findOne({ isbn });

            if (existingBook) {
                return res.status(400).json({
                    message: "A book with this ISBN already exists"
                });
            }
        }

        // Calculate borrowed copies
        const borrowedCopies =
            book.totalCopies - book.availableCopies;

        // Prevent reducing total copies below borrowed copies
        if (
            totalCopies !== undefined &&
            Number(totalCopies) < borrowedCopies
        ) {
            return res.status(400).json({
                message:
                    "Total copies cannot be less than currently borrowed copies"
            });
        }

        // Update fields
        if (title !== undefined) book.title = title;
        if (author !== undefined) book.author = author;
        if (isbn !== undefined) book.isbn = isbn;
        if (category !== undefined) book.category = category;

        if (totalCopies !== undefined) {
            book.totalCopies = Number(totalCopies);
            book.availableCopies =
                Number(totalCopies) - borrowedCopies;
        }

        await book.save();

        res.status(200).json({
            message: "Book updated successfully",
            book
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to update book",
            error: error.message
        });
    }
};


// Delete / Deactivate Book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;

        const book = await Book.findById(id);

        if (!book) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        // Soft delete
        book.isActive = false;

        await book.save();

        res.status(200).json({
            message: "Book deactivated successfully"
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to deactivate book",
            error: error.message
        });
    }
};


module.exports = {
    addBook,
    getBooks,
    getBookById,
    updateBook,
    deleteBook
};