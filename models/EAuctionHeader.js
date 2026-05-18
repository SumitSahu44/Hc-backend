const mongoose = require('mongoose');

const eauctionHeaderSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
    unique: true // One header per site
  },
  title: {
    type: String,
    default: 'e-AUCTION'
  },
  description: {
    type: String,
    default: 'DIGITAL LIQUIDATION AND TRANSPARENT AUCTION SYSTEM ACROSS OUR CORPORATE ECOSYSTEM.'
  }
}, { timestamps: true });

module.exports = mongoose.model('EAuctionHeader', eauctionHeaderSchema);
