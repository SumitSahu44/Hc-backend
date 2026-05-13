const mongoose = require('mongoose');

const blogHeaderSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
    unique: true // One header per site
  },
  title: {
    type: String,
    default: 'BLOG & ARTICLE'
  },
  description: {
    type: String,
    default: '"Join and participate in our nation-wide campaign to digitalize the Textile Sector, one of the largest sectors of India".'
  },
  authorName: {
    type: String,
    default: 'HC PAREKH'
  },
  authorRole: {
    type: String,
    default: 'Textile Manufacturer & Entrepreneur'
  },
  country: {
    type: String,
    default: 'INDIA'
  }
}, { timestamps: true });

module.exports = mongoose.model('BlogHeader', blogHeaderSchema);
