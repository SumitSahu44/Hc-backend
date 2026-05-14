const express = require('express');
const router = express.Router();
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const {
    getManagementContent,
    updateManagementContent,
    getManagementMembers,
    addManagementMember,
    updateManagementMember,
    deleteManagementMember
} = require('../controllers/managementController');

const upload = multer({ storage });

// Content routes
router.get('/content', getManagementContent);
router.post('/content', updateManagementContent);

// Member routes
router.get('/members', getManagementMembers);
router.post('/members', upload.single('image'), addManagementMember);
router.put('/members/:id', upload.single('image'), updateManagementMember);
router.delete('/members/:id', deleteManagementMember);

module.exports = router;
