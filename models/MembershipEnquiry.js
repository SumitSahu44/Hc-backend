const mongoose = require("mongoose");

const membershipEnquirySchema = new mongoose.Schema({
  siteId:                 { type: String, default: "ParekhChamberofTextile01" },
  authorizedOfficialName: { type: String, required: true },
  officialCodeNo:         { type: String, required: true },
  applicantName:          { type: String, required: true },
  businessTitle:          { type: String, required: true },
  businessAddress:        { type: String, required: true },
  mobileNo:               { type: String, required: true },
  emailId:                { type: String, required: true },
  websiteUrl:             { type: String },
  natureOfBusiness:       { type: String, required: true },
  categoryOfBusiness:     { type: String, required: true },
  uploadedDocument:       { type: String }, // Path to file
}, { timestamps: true });

module.exports = mongoose.model("MembershipEnquiry", membershipEnquirySchema);
