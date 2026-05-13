const mongoose = require('mongoose');

const tenderSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String, // Rich text HTML
    required: true
  },
  keyPoints: {
    type: [String],
    default: []
  },
  status: {
    type: String,
    enum: ['active', 'closed', 'archived'],
    default: 'active'
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

module.exports = mongoose.model('Tender', tenderSchema);
