const mongoose = require('mongoose');

const managementMemberSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ManagementMember', managementMemberSchema);
