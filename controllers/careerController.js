const Career = require("../models/Career");

// @desc Get all careers (optionally filtered by siteId and/or status)
// @route GET /api/careers
exports.getCareers = async (req, res) => {
  try {
    const { siteId, status } = req.query;
    const query = {};
    if (siteId) query.siteId = siteId;
    if (status) query.status = status;

    const careers = await Career.find(query).sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      data: careers
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Add a new career opening
// @route POST /api/careers
exports.addCareer = async (req, res) => {
  try {
    const newCareer = new Career(req.body);
    await newCareer.save();
    res.status(201).json({
      success: true,
      data: newCareer
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Update a career opening
// @route PUT /api/careers/:id
exports.updateCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career opening not found."
      });
    }
    res.status(200).json({
      success: true,
      data: career
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Delete a career opening
// @route DELETE /api/careers/:id
exports.deleteCareer = async (req, res) => {
  try {
    const career = await Career.findByIdAndDelete(req.params.id);
    if (!career) {
      return res.status(404).json({
        success: false,
        message: "Career opening not found."
      });
    }
    res.status(200).json({
      success: true,
      message: "Career opening deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
