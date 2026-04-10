// routes/tradeEnquiryRoutes.js
const router = require("express").Router();
const { submitTradeEnquiry, getTradeEnquiries } = require("../controllers/tradeEnquiryController");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const uploadDir = path.join(__dirname, '../uploads/trade-enquiry');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/trade-enquiry/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '-'));
  }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('gstCertificate'), submitTradeEnquiry);
router.get("/", getTradeEnquiries);

module.exports = router;