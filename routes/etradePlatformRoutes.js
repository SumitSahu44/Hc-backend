const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

const etradePlatformController = require('../controllers/etradePlatformController');

router.post('/buyer', upload.array('kycDocuments'), etradePlatformController.submitBuyerPlatform);
router.post('/seller', upload.array('kycDocuments'), etradePlatformController.submitSellerPlatform);
router.get('/submissions', etradePlatformController.getPlatformSubmissions);

module.exports = router;
