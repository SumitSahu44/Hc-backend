const EQuotationHeader = require('../models/EQuotationHeader');

exports.getEQuotationHeader = async (req, res) => {
  try {
    const { siteId } = req.params;
    let header = await EQuotationHeader.findOne({ siteId });
    
    // If not found, create a default one for this site
    if (!header) {
      header = await EQuotationHeader.create({ siteId });
    }
    
    res.status(200).json({
      success: true,
      data: header
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateEQuotationHeader = async (req, res) => {
  try {
    const { siteId } = req.params;
    const updateData = req.body;
    
    const header = await EQuotationHeader.findOneAndUpdate(
      { siteId },
      updateData,
      { new: true, upsert: true, runValidators: true }
    );
    
    res.status(200).json({
      success: true,
      data: header
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
