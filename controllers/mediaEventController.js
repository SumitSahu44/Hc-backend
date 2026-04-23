const MediaEvent = require("../models/MediaEvent");
const fs = require("fs");
const path = require("path");

// @desc Get all media events
// @route GET /api/media-events
exports.getMediaEvents = async (req, res) => {
  try {
    const { siteId } = req.query;
    const query = {};
    if (siteId && siteId !== 'all') query.siteId = siteId;

    const events = await MediaEvent.find(query).sort({ date: -1 });
    res.status(200).json({
      success: true,
      data: events
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Add a new media event
// @route POST /api/media-events
exports.addMediaEvent = async (req, res) => {
  try {
    const { title, category, date, siteId } = req.body;
    
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an event image."
      });
    }

    const image = req.file.path;

    const newEvent = new MediaEvent({
      title,
      category,
      image,
      date,
      siteId
    });

    await newEvent.save();

    res.status(201).json({
      success: true,
      data: newEvent
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Update a media event
// @route PUT /api/media-events/:id
exports.updateMediaEvent = async (req, res) => {
  try {
    const { title, category, date, siteId } = req.body;
    const event = await MediaEvent.findById(req.params.id);
    
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found."
      });
    }

    let image = event.image;
    if (req.file) {
      image = req.file.path;
    }

    const updatedEvent = await MediaEvent.findByIdAndUpdate(
      req.params.id,
      { title, category, date, siteId, image },
      { returnDocument: 'after' }
    );

    res.status(200).json({
      success: true,
      data: updatedEvent
    });
  } catch (error) {
    if (req.file) {
      // Cloudinary handles asset lifecycle separately
    }
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc Delete a media event
// @route DELETE /api/media-events/:id
exports.deleteMediaEvent = async (req, res) => {
  try {
    const event = await MediaEvent.findById(req.params.id);
    if (!event) {
      return res.status(404).json({
        success: false,
        message: "Event not found."
      });
    }

    // Delete logic for Cloudinary could be added here

    await MediaEvent.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Event deleted successfully."
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
