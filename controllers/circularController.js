const Circular = require("../models/Circular");
const { cloudinary } = require("../config/cloudinary");

// Get all circulars for a site
exports.getCirculars = async (req, res) => {
  try {
    const { siteId } = req.query;
    if (!siteId) {
      return res.status(400).json({ success: false, message: "Site ID is required." });
    }

    const query = siteId === "all" ? {} : { siteId };
    const circulars = await Circular.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      data: circulars
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add a new circular
exports.addCircular = async (req, res) => {
  try {
    const { subject, publishDate, siteId } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, message: "PDF document is required." });
    }

    const newCircular = new Circular({
      subject,
      publishDate,
      siteId,
      pdfUrl: req.file.path,
      pdfPublicId: req.file.filename
    });

    await newCircular.save();

    res.status(201).json({
      success: true,
      message: "Circular added successfully.",
      data: newCircular
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a circular
exports.updateCircular = async (req, res) => {
  try {
    const { id } = req.params;
    const { subject, publishDate } = req.body;

    let circular = await Circular.findById(id);
    if (!circular) {
      return res.status(404).json({ success: false, message: "Circular not found." });
    }

    circular.subject = subject || circular.subject;
    circular.publishDate = publishDate || circular.publishDate;

    if (req.file) {
      // Delete old PDF from Cloudinary if it exists
      if (circular.pdfPublicId) {
        await cloudinary.uploader.destroy(circular.pdfPublicId);
      }
      circular.pdfUrl = req.file.path;
      circular.pdfPublicId = req.file.filename;
    }

    await circular.save();

    res.status(200).json({
      success: true,
      message: "Circular updated successfully.",
      data: circular
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a circular
exports.deleteCircular = async (req, res) => {
  try {
    const { id } = req.params;

    const circular = await Circular.findById(id);
    if (!circular) {
      return res.status(404).json({ success: false, message: "Circular not found." });
    }

    // Delete PDF from Cloudinary
    if (circular.pdfPublicId) {
      await cloudinary.uploader.destroy(circular.pdfPublicId);
    }

    await circular.deleteOne();

    res.status(200).json({
      success: true,
      message: "Circular deleted successfully."
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
