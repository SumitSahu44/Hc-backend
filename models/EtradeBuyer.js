const mongoose = require("mongoose");

const etradeBuyerSchema = new mongoose.Schema({
  authorizedPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuthorizedPerson",
    required: true,
  },
  buyerName: { type: String, required: true },
  businessTitle: { type: String, required: true },
  businessAddress: { type: String, required: true },
  mobileNo: { type: String, required: true },
  emailId: { type: String, required: true },
  websiteUrl: { type: String },
  natureOfBusiness: { type: String, required: true },
  categoryOfBusiness: { type: String, required: true },
  chamberMembership: { type: String },
  kycDocuments: [{ type: String }], // Array of file paths
  textileItemsToBuy: { type: String, required: true },
  itemDescription: { type: String },
  requiredQuantity: { type: String, required: true },
  tentativeRate: { type: String },
  tentativeBudget: { type: String },
  siteId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("EtradeBuyer", etradeBuyerSchema);
