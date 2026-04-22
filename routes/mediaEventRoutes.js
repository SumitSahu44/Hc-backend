const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mediaEventController = require("../controllers/mediaEventController");

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.get("/", mediaEventController.getMediaEvents);
router.post("/", upload.single("image"), mediaEventController.addMediaEvent);
router.put("/:id", upload.single("image"), mediaEventController.updateMediaEvent);
router.delete("/:id", mediaEventController.deleteMediaEvent);

module.exports = router;
