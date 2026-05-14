const mongoose = require("mongoose");

const equotationSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
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
  },
  status: {
    type: String,
    enum: ["active", "closed"],
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model("EQuotation", equotationSchema);
