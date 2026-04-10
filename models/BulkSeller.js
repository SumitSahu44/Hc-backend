// models/BulkSeller.js
const mongoose = require("mongoose");

const bulkSellerSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  businessName:{ type: String, required: true },
  mobile:      { type: String, required: true },
  productType: { type: String, required: true },
  quantity:    { type: Number },
  price:       { type: Number },
  website:     { type: String },
  siteId:      { type: String }
}, { timestamps: true });

module.exports = mongoose.model("BulkSeller", bulkSellerSchema);