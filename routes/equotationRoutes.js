const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const {
    getEQuotations,
    addEQuotation,
    updateEQuotation,
    deleteEQuotation
} = require("../controllers/equotationController");

const upload = multer({ storage });

router.get("/", getEQuotations);
router.post("/", upload.single("image"), addEQuotation);
router.put("/:id", upload.single("image"), updateEQuotation);
router.delete("/:id", deleteEQuotation);

module.exports = router;
