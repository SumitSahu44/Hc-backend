const express = require('express');
const router = express.Router();
const multer = require('multer');

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

const etradePlatformController = require('../controllers/etradePlatformController');

router.post('/buyer', upload.array('kycDocuments'), etradePlatformController.submitBuyerPlatform);
router.post('/seller', upload.array('kycDocuments'), etradePlatformController.submitSellerPlatform);
router.get('/submissions', etradePlatformController.getPlatformSubmissions);
router.delete('/submissions/:id', etradePlatformController.deleteSubmission);

module.exports = router;
