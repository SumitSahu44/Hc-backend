const express = require('express');
const router = express.Router();
const membershipController = require('../controllers/membershipController');
const multer = require('multer');
const path = require('path');

const fs = require('fs');

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

router.post('/', upload.single('document'), membershipController.submitMembership);
router.get('/', membershipController.getMemberships);
router.delete('/:id', membershipController.deleteMembershipEnquiry);

module.exports = router;
