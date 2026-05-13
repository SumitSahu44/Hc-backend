const express = require('express');
const router = express.Router();
const { getBlogHeader, updateBlogHeader } = require('../controllers/blogHeaderController');

router.get('/:siteId', getBlogHeader);
router.put('/:siteId', updateBlogHeader);

module.exports = router;
