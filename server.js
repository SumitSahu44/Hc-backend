// server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get(["/", "/api"], (req, res) => {
  res.status(200).json({
    success: true,
    message: "HC Backend API is running.",
    version: "1.0.0"
  });
});

// Routes
app.use("/api/contact", require("./routes/contactRoutes"));
// app.use("/api/enquiry", require("./routes/enquiryRoutes"));
app.use("/api/appointment", require("./routes/appointmentRoutes"));
app.use("/api/bulk", require("./routes/bulkRoutes"));

app.use("/api/trade-enquiry", require("./routes/tradeEnquiryRoutes"));
app.use("/api/quotation", require("./routes/quotationRoutes"));
app.use("/api/auction", require("./routes/auctionRoutes"));
app.use("/api/authorized-person", require("./routes/authorizedPersonRoutes"));
app.use("/api/etrade", require("./routes/etradePlatformRoutes"));
app.use("/api/product", require("./routes/productRoutes"));
app.use("/api/category", require("./routes/categoryRoutes"));
app.use("/api/membership", require("./routes/membershipRoutes"));

// Static Folder for Uploads
app.use("/uploads", express.static("uploads"));

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route ${req.originalUrl} not found.`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("🔥 Unhandled Error:", err.message);
  res.status(500).json({
    success: false,
    message: "Internal server error."
  });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));