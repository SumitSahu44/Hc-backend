const Tender = require('../models/Tender');

exports.getTenders = async (req, res) => {
  try {
    const { siteId } = req.query;
    const filter = {};
    if (siteId && siteId !== 'all') {
      filter.siteId = siteId;
    }

    const tenders = await Tender.find(filter).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: tenders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.addTender = async (req, res) => {
  try {
    const tender = await Tender.create(req.body);
    res.status(201).json({
      success: true,
      data: tender
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.updateTender = async (req, res) => {
  try {
    const tender = await Tender.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    if (!tender) {
      return res.status(404).json({
        success: false,
        message: 'Tender not found'
      });
    }

    res.status(200).json({
      success: true,
      data: tender
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

exports.deleteTender = async (req, res) => {
  try {
    const tender = await Tender.findByIdAndDelete(req.params.id);
    
    if (!tender) {
      return res.status(404).json({
        success: false,
        message: 'Tender not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Tender deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
