const router = require("express").Router();
const { submitQuotation, getQuotations } = require("../controllers/quotationController");
const multer = require('multer');
const path = require('path');

const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads/quotation');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/quotation/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post("/", upload.single('gstCertificate'), submitQuotation);
router.get("/", getQuotations);

module.exports = router;
