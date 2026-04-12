const mongoose = require("mongoose");

const careerSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  salary: {
    type: String,
    default: ""
  },
  email: {
    type: String,
    required: false,
    trim: true
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    default: ""
  },
  type: {
    type: String,
    enum: ["Full-time", "Part-time", "Contract", "Internship", "Remote"],
    default: "Full-time"
  },
  experience: {
    type: String,
    default: ""
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
    enum: ["Open", "Closed", "active", "closed"],
    default: "active"
  }
}, { timestamps: true });

module.exports = mongoose.model("Career", careerSchema);
