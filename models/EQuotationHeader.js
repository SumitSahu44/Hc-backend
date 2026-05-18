const mongoose = require('mongoose');

const equotationHeaderSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
    unique: true // One header per site
  },
  title: {
    type: String,
    default: 'e-QUOTATION'
  },
  description: {
    type: String,
    default: 'DIGITAL PRICE SUBMISSION AND PROPOSAL MANAGEMENT FOR APPROVED VENDORS AND TRADERS ACROSS OUR NETWORK.'
  }
}, { timestamps: true });

module.exports = mongoose.model('EQuotationHeader', equotationHeaderSchema);
