const router = require("express").Router();
const { submitQuotation, getQuotations, deleteQuotation } = require("../controllers/quotationController");
const multer = require('multer');
const path = require('path');

const fs = require('fs');

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.post("/", upload.single('gstCertificate'), submitQuotation);
router.get("/", getQuotations);
router.delete("/:id", deleteQuotation);

module.exports = router;
