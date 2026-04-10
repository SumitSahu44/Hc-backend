// models/Appointment.js
const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  siteId:         { type: String, required: true },
  visitorName:    { type: String, required: true },
  businessName:   { type: String, required: true },
  visitorAddress: { type: String, required: true },
  mobileNo:       { type: String, required: true },
  email:          { type: String, required: true },
  proofType:      { 
    type: String, 
    required: true
  },
  proofFile:      { type: String }, // Path to uploaded file
  reasonForVisit: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Appointment", appointmentSchema);