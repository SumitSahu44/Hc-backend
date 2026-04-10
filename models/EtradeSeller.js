const mongoose = require("mongoose");

const etradeSellerSchema = new mongoose.Schema({
  authorizedPerson: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AuthorizedPerson",
    required: true,
  },
  sellerName: { type: String, required: true },
  businessName: { type: String, required: true },
  businessAddress: { type: String, required: true },
  mobileNo: { type: String, required: true },
  emailId: { type: String, required: true },
  websiteUrl: { type: String },
  natureOfBusiness: { type: String, required: true },
  categoryOfBusiness: { type: String, required: true },
  chamberMembership: { type: String },
  kycDocuments: [{ type: String }], // Array of file paths
  textileItemsToSell: { type: String, required: true },
  itemDescription: { type: String },
  totalQuantity: { type: String, required: true },
  expectedRate: { type: String },
  siteId: { type: String },
}, { timestamps: true });

module.exports = mongoose.model("EtradeSeller", etradeSellerSchema);
