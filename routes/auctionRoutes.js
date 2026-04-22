const router = require("express").Router();
const { submitAuction, getAuctions, deleteAuction } = require("../controllers/auctionController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.post("/", upload.single('gstCertificate'), submitAuction);
router.get("/", getAuctions);
router.delete("/:id", deleteAuction);

module.exports = router;
