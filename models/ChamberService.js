const mongoose = require('mongoose');

const chamberServiceSchema = new mongoose.Schema({
  siteId: {
    type: String,
    required: true,
    default: 'ParekhChamberofTextile01'
  },
  title: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('ChamberService', chamberServiceSchema);
