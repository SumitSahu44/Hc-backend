const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const circularController = require("../controllers/circularController");

const upload = multer({ storage });

router.get("/", circularController.getCirculars);
router.post("/", upload.single("pdf"), circularController.addCircular);
router.put("/:id", upload.single("pdf"), circularController.updateCircular);
router.delete("/:id", circularController.deleteCircular);

module.exports = router;
