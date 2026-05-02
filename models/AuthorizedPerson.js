const mongoose = require("mongoose");

const authorizedPersonSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  code: {
    type: String,
    required: true,
    trim: true,
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
}, { timestamps: true });

// Ensure unique code per site
authorizedPersonSchema.index({ code: 1, siteId: 1 }, { unique: true });

module.exports = mongoose.model("AuthorizedPerson", authorizedPersonSchema);
