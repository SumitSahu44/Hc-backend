const mongoose = require('mongoose');

const managementContentSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
    default: 'OUR MANAGEMENT'
  },
  description: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ManagementContent', managementContentSchema);
