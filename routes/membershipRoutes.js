const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');
const multer = require('multer');
const path = require('path');

const fs = require('fs');

const uploadDir = path.join(__dirname, '../uploads/memberships');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/memberships/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });

router.post('/', upload.single('document'), membershipController.submitMembership);
router.get('/', membershipController.getMemberships);

module.exports = router;
