const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
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

// Ensure a category name is unique within a site
categorySchema.index({ name: 1, siteId: 1 }, { unique: true });

module.exports = mongoose.model("Category", categorySchema);
