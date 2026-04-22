const express = require('express');
const router = express.Router();
const multer = require('multer');

const { storage } = require("../config/cloudinary");
const upload = multer({ storage });

const authorizedPersonController = require('../controllers/authorizedPersonController');

router.post('/add', authorizedPersonController.addAuthorizedPerson);
router.post('/validate', authorizedPersonController.validateAuthorizedPerson);
router.post('/bulk-upload', upload.single('file'), authorizedPersonController.bulkUploadAuthorizedPersons);
router.get('/list', authorizedPersonController.getAuthorizedPersons);
router.put('/:id', authorizedPersonController.updateAuthorizedPerson);
router.delete('/:id', authorizedPersonController.deleteAuthorizedPerson);

module.exports = router;
