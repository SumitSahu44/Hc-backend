const mongoose = require('mongoose');

const circularHeaderSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: 'OFFICIAL CIRCULARS'
  },
  description: {
    type: String,
    default: 'STAY INFORMED WITH THE LATEST ALERTS, STATUTORY CIRCULARS, AND COMPLIANCE NOTICES.'
  }
}, { timestamps: true });

module.exports = mongoose.model('CircularHeader', circularHeaderSchema);
