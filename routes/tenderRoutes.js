const express = require('express');
const router = express.Router();
const { getTenders, addTender, updateTender, deleteTender } = require('../controllers/tenderController');

router.get('/', getTenders);
router.post('/', addTender);
router.put('/:id', updateTender);
router.delete('/:id', deleteTender);

module.exports = router;
