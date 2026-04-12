const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true,
    default: "Admin"
  },
  thumbnail: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["Draft", "Published", "draft", "published"],
    default: "draft"
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
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model("Blog", blogSchema);
