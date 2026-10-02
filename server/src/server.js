const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// ================================
// Import Routes
// ================================

const authRoutes = require("./routes/authRoutes");
const bookRoutes = require("./routes/bookRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const memberRoutes = require("./routes/memberRoutes");
const borrowingRoutes = require("./routes/borrowingRoutes");


// ================================
// Middleware
// ================================

app.use(cors());
app.use(express.json());


// ================================
// API Routes
// ================================

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/borrowings", borrowingRoutes);


// ================================
// Server Test Route
// ================================

app.get("/api/server-test", (req, res) => {
    res.json({
        message: "THIS IS MY NEW LIBRARY SERVER"
    });
});


// ================================
// Root Route
// ================================

app.get("/", (req, res) => {
    res.json({
        message: "Library Management System API is running"
    });
});


// ================================
// Port
// ================================

const PORT = Number(process.env.PORT) || 5000;


// ================================
// Start HTTP Server
// ================================

const server = app.listen(PORT, "0.0.0.0", () => {
    console.log(`HTTP SERVER LISTENING ON PORT ${PORT}`);
});


// ================================
// Server Error
// ================================

server.on("error", (error) => {
    console.error("HTTP SERVER ERROR:", error);
});


// ================================
// MongoDB Connection
// ================================

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully!");
    })
    .catch((error) => {
        console.error(
            "MongoDB Connection Failed:",
            error.message
        );
    });