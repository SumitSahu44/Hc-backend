const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const circularController = require("../controllers/circularController");

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.get("/", circularController.getCirculars);
router.post("/", upload.single("pdf"), circularController.addCircular);
router.put("/:id", upload.single("pdf"), circularController.updateCircular);
router.delete("/:id", circularController.deleteCircular);

module.exports = router;
