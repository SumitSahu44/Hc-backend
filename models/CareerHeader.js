const mongoose = require('mongoose');

const careerHeaderSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
    unique: true
  },
  title: {
    type: String,
    default: 'CAREERS & OPPORTUNITIES'
  },
  description: {
    type: String,
    default: 'JOIN OUR GLOBAL TEAM OF PROFESSIONALS AND DEFINE THE FUTURE OF THE TEXTILE INDUSTRY.'
  }
}, { timestamps: true });

module.exports = mongoose.model('CareerHeader', careerHeaderSchema);
