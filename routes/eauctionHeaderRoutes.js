const express = require('express');
const router = express.Router();
const { getEAuctionHeader, updateEAuctionHeader } = require('../controllers/eauctionHeaderController');

router.get('/:siteId', getEAuctionHeader);
router.put('/:siteId', updateEAuctionHeader);

module.exports = router;
