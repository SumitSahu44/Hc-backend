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
  headerTitle: {
    type: String,
    default: ''
  },
  headerDescription: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: null
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
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("EQuotation", equotationSchema);
