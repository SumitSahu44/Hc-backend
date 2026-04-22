// controllers/bulkController.js
const BulkSeller = require("../models/BulkSeller");

exports.createBulk = async (req, res) => {
  try {
    const { name, businessName, mobile, productType, quantity, price, website } = req.body;

    if (!name || !businessName || !mobile || !productType) {
      return res.status(400).json({
        success: false,
        message: "name, businessName, mobile, and productType are required fields."
      });
    }

    const bulk = await BulkSeller.create({ 
      name, 
      businessName, 
      mobile, 
      productType, 
      quantity, 
      price, 
      website,
      siteId: website // Map website to siteId for uniform dashboard filtering
    });

    return res.status(201).json({
      success: true,
      message: "Bulk seller request submitted successfully.",
      data: bulk
    });

  } catch (error) {
    console.error("❌ Bulk Seller Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error. Please try again later."
    });
  }
};
exports.deleteBulkSeller = async (req, res) => {
  try {
    const bulk = await BulkSeller.findByIdAndDelete(req.params.id);
    if (!bulk) {
      return res.status(404).json({ success: false, message: "Bulk seller request not found" });
    }
    res.status(200).json({ success: true, message: "Bulk seller request deleted successfully" });
  } catch (error) {
    console.error("Delete Bulk Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getBulks = async (req, res) => {
  try {
    const bulks = await BulkSeller.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, data: bulks });
  } catch (error) {
    console.error("Get Bulks Error:", error);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
