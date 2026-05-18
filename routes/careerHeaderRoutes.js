const express = require('express');
const router = express.Router();
const { getCareerHeader, updateCareerHeader } = require('../controllers/careerHeaderController');

router.get('/:siteId', getCareerHeader);
router.put('/:siteId', updateCareerHeader);

module.exports = router;
