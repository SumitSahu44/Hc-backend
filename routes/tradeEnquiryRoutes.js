// routes/tradeEnquiryRoutes.js
const router = require("express").Router();
const { submitTradeEnquiry, getTradeEnquiries, deleteTradeEnquiry } = require("../controllers/tradeEnquiryController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.post("/", upload.single('gstCertificate'), submitTradeEnquiry);
router.get("/", getTradeEnquiries);
router.delete("/:id", deleteTradeEnquiry);

module.exports = router;
