const express = require('express');
const router = express.Router();
const multer = require('multer');

// Reusing multer config if exist or define simple one
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage });

const authorizedPersonController = require('../controllers/authorizedPersonController');

router.post('/add', authorizedPersonController.addAuthorizedPerson);
router.post('/validate', authorizedPersonController.validateAuthorizedPerson);
router.post('/bulk-upload', upload.single('file'), authorizedPersonController.bulkUploadAuthorizedPersons);
router.get('/list', authorizedPersonController.getAuthorizedPersons);

module.exports = router;
