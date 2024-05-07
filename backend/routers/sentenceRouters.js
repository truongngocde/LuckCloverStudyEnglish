const express = require('express');
const sentenceControllers = require('../controllers/sentenceControllers');

const router = express.Router();

router.get('/',sentenceControllers.getAllSentence)

module.exports = router;