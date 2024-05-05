const express = require('express');
const wordControllers = require('../controllers/wordControllers');

const router = express.Router();

router
    .route('/word-details')
    .get(wordControllers.getWordDetails)


module.exports = router;