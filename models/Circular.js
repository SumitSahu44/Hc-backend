const mongoose = require("mongoose");

const circularSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
    trim: true
  },
  pdfUrl: {
    type: String,
    required: true
  },
  pdfPublicId: {
    type: String
  },
  publishDate: {
    type: String, // User requested text type for date
    required: true
  },
  siteId: {
    type: String,
    required: true,
    enum: [
      "ParekhChamberofTextile01",
      "ParekheTradeMarket02",
      "ParekhSouthernPolyfabrics03",
      "ParekhLinen04",
      "ParekhRayon05",
      "ParekhFabrics06",
      "ParekhSilk07"
    ]
  }
}, { timestamps: true });

module.exports = mongoose.model("Circular", circularSchema);
