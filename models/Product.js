const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  }, // Stores the file path from uploads/
  siteId: {
    type: String,
    required: true,
    enum: [
      "ParekhChamberofTextile01",
      "ParekhETradeMarket02",
      "ParekhSouthernPolyfabrics03",
      "ParekhLinen04",
      "ParekhRayon05",
      "ParekhFabrics06",
      "ParekhSilk07"
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model("Product", productSchema);
