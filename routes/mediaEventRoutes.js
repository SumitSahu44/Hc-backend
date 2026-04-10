const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mediaEventController = require("../controllers/mediaEventController");

// Ensure upload directory exists
const uploadDir = "uploads/media-events";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ storage });

router.get("/", mediaEventController.getMediaEvents);
router.post("/", upload.single("image"), mediaEventController.addMediaEvent);
router.put("/:id", upload.single("image"), mediaEventController.updateMediaEvent);
router.delete("/:id", mediaEventController.deleteMediaEvent);

module.exports = router;
