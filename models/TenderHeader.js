const mongoose = require('mongoose');

const tenderHeaderSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
    unique: true // One header per site
  },
  title: {
    type: String,
    default: 'TENDERS & CONTRACTS'
  },
  description: {
    type: String,
    default: 'EXPLORE OPEN EXPRESSIONS OF INTEREST (EOI), TENDER OPPORTUNITIES, AND OFFICIAL CONTRACTS FROM THE CHAMBER OF TEXTILE.'
  }
}, { timestamps: true });

module.exports = mongoose.model('TenderHeader', tenderHeaderSchema);
