const express = require("express");
const router = express.Router();
const multer = require("multer");
const { storage } = require("../config/cloudinary");
const {
    getEAuctions,
    addEAuction,
    updateEAuction,
    deleteEAuction
} = require("../controllers/eauctionController");

const upload = multer({ storage });

router.get("/", getEAuctions);
router.post("/", upload.single("image"), addEAuction);
router.put("/:id", upload.single("image"), updateEAuction);
router.delete("/:id", deleteEAuction);

module.exports = router;
