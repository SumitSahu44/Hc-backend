const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  siteId:             { type: String, required: true },
  participantName:    { type: String, required: true },
  legalBusinessName:  { type: String, required: true },
  businessAddress:    { type: String, required: true },
  gstNo:              { type: String },
  mobileNo:           { type: String, required: true },
  email:              { type: String, required: true },
  gstCertificate:     { type: String }
}, { 
  timestamps: true,
  collection: 'Auctions'
});

module.exports = mongoose.model("Auction", auctionSchema);
