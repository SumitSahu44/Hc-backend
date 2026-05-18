const express = require('express');
const router = express.Router();
const { getEQuotationHeader, updateEQuotationHeader } = require('../controllers/equotationHeaderController');

router.get('/:siteId', getEQuotationHeader);
router.put('/:siteId', updateEQuotationHeader);

module.exports = router;
