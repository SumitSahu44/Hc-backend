const mongoose = require("mongoose");

const quotationSchema = new mongoose.Schema({
  siteId:          { type: String, required: true },
  traderName:      { type: String, required: true },
  businessName:    { type: String, required: true },
  businessAddress: { type: String, required: true },
  gstNo:           { type: String },
  mobileNo:        { type: String, required: true },
  email:           { type: String, required: true },
  quotationType:   { 
    type: String, 
    required: true
  },
  particulars:     { type: String },
  gstCertificate:  { type: String }
}, { 
  timestamps: true,
  collection: 'Quotations'
});

module.exports = mongoose.model("Quotation", quotationSchema);
