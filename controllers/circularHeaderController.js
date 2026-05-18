const CircularHeader = require('../models/CircularHeader');

exports.getCircularHeader = async (req, res) => {
  try {
    const { siteId } = req.params;
    let header = await CircularHeader.findOne({ siteId });
    if (!header) {
      header = await CircularHeader.create({ siteId });
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

exports.updateCircularHeader = async (req, res) => {
  try {
    const { siteId } = req.params;
    const updateData = req.body;
    const header = await CircularHeader.findOneAndUpdate(
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
