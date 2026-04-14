const router = require("express").Router();
const { submitAuction, getAuctions, deleteAuction } = require("../controllers/auctionController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, '../uploads/auction');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/auction/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/ /g, '-'));
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('gstCertificate'), submitAuction);
router.get("/", getAuctions);
router.delete("/:id", deleteAuction);

module.exports = router;
