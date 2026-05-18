const express = require('express');
const router = express.Router();
const { getCircularHeader, updateCircularHeader } = require('../controllers/circularHeaderController');

router.get('/:siteId', getCircularHeader);
router.put('/:siteId', updateCircularHeader);

module.exports = router;
