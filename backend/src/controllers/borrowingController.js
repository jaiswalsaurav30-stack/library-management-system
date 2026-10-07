const Borrowing = require("../models/Borrowing");
const Book = require("../models/Book");
const Member = require("../models/Member");

// Issue Book
const issueBook = async (req, res) => {
    try {
        const {
            memberId,
            bookId,
            dueDate
        } = req.body;

        // Check required fields
        if (!memberId || !bookId || !dueDate) {
            return res.status(400).json({
                message: "Member, book and due date are required"
            });
        }

        // Validate due date
        const parsedDueDate = new Date(dueDate);

        if (isNaN(parsedDueDate.getTime())) {
            return res.status(400).json({
                message: "Invalid due date"
            });
        }

        // Check member
        const member = await Member.findById(memberId);

        if (!member || !member.isActive) {
            return res.status(404).json({
                message: "Active member not found"
            });
        }

        // Check book
        const book = await Book.findById(bookId);

        if (!book || !book.isActive) {
            return res.status(404).json({
                message: "Active book not found"
            });
        }

        // Check availability
        if (book.availableCopies <= 0) {
            return res.status(400).json({
                message: "Book is currently not available"
            });
        }

        // Check if member already has this book
        const existingBorrowing = await Borrowing.findOne({
            member: memberId,
            book: bookId,
            status: {
                $in: ["issued", "overdue"]
            }
        });

        if (existingBorrowing) {
            return res.status(400).json({
                message: "Member already has this book"
            });
        }

        // Create borrowing record
        const borrowing = await Borrowing.create({
            member: memberId,
            book: bookId,
            dueDate: parsedDueDate
        });

        // Decrease available copies
        book.availableCopies -= 1;

        await book.save();

        // Populate response
        const populatedBorrowing = await Borrowing.findById(
            borrowing._id
        )
            .populate("member", "name email membershipId")
            .populate("book", "title author isbn");

        res.status(201).json({
            message: "Book issued successfully",
            borrowing: populatedBorrowing
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to issue book",
            error: error.message
        });
    }
};


// Get All Borrowings
const getBorrowings = async (req, res) => {
    try {
        const borrowings = await Borrowing.find()
            .populate("member", "name email membershipId")
            .populate("book", "title author isbn")
            .sort({ createdAt: -1 });

        res.status(200).json({
            count: borrowings.length,
            borrowings
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to fetch borrowings",
            error: error.message
        });
    }
};


// Return Book
const returnBook = async (req, res) => {
    try {
        const { id } = req.params;

        const borrowing = await Borrowing.findById(id);

        if (!borrowing) {
            return res.status(404).json({
                message: "Borrowing record not found"
            });
        }

        if (borrowing.status === "returned") {
            return res.status(400).json({
                message: "Book has already been returned"
            });
        }

        const returnDate = new Date();

        // Calculate overdue days
        const timeDifference =
            returnDate - borrowing.dueDate;

        const overdueDays = Math.max(
            0,
            Math.ceil(
                timeDifference /
                (1000 * 60 * 60 * 24)
            )
        );

        // Fine = ₹10 per overdue day
        const fine = overdueDays * 10;

        borrowing.returnDate = returnDate;
        borrowing.status = "returned";
        borrowing.fine = fine;

        await borrowing.save();

        // Increase available copies
        const book = await Book.findById(borrowing.book);

        if (book) {
            book.availableCopies += 1;
            await book.save();
        }

        // Populate response
        const populatedBorrowing = await Borrowing.findById(
            borrowing._id
        )
            .populate("member", "name email membershipId")
            .populate("book", "title author isbn");

        res.status(200).json({
            message: "Book returned successfully",
            overdueDays,
            fine,
            borrowing: populatedBorrowing
        });

    } catch (error) {
        res.status(500).json({
            message: "Failed to return book",
            error: error.message
        });
    }
};


module.exports = {
    issueBook,
    getBorrowings,
    returnBook
};