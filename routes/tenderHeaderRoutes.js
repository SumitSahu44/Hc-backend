const express = require('express');
const router = express.Router();
const { getTenderHeader, updateTenderHeader } = require('../controllers/tenderHeaderController');

router.get('/:siteId', getTenderHeader);
router.put('/:siteId', updateTenderHeader);

module.exports = router;
