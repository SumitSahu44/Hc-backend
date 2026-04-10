// models/TradeEnquiry.js
const mongoose = require("mongoose");

const tradeEnquirySchema = new mongoose.Schema({
  traderName:      { type: String, required: true },
  businessName:    { type: String, required: true },
  businessAddress: { type: String, required: true },
  gstNo:           { type: String },
  mobileNo:        { type: String, required: true },
  email:           { type: String, required: true },
  enquiryType:     { 
    type: String, 
    required: true
  },
  gstCertificate:  { type: String },
  siteId:          { type: String, required: true }
}, { 
  timestamps: true,
  collection: 'Textile'
});

module.exports = mongoose.model("TradeEnquiry", tradeEnquirySchema);