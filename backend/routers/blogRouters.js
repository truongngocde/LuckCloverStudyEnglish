const express = require('express');
const blogControllers = require('../controllers/blogControllers');

const router = express.Router();

router.get('/', blogControllers.getBlogList);
router.get('/blog-html', blogControllers.getBlogHtml);

module.exports = router; 