const express = require('express');
const router = express.Router();
const { getNotices, addNotice, updateNotice, deleteNotice } = require('../controllers/noticeController');

router.get('/', getNotices);
router.post('/', addNotice);
router.put('/:id', updateNotice);
router.delete('/:id', deleteNotice);

module.exports = router;
