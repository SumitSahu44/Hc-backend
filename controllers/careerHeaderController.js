const CareerHeader = require('../models/CareerHeader');

exports.getCareerHeader = async (req, res) => {
  try {
    const { siteId } = req.params;
    let header = await CareerHeader.findOne({ siteId });
    if (!header) {
      header = await CareerHeader.create({ siteId });
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

exports.updateCareerHeader = async (req, res) => {
  try {
    const { siteId } = req.params;
    const updateData = req.body;
    const header = await CareerHeader.findOneAndUpdate(
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
