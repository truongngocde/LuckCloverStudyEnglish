const express = require('express');
const sentenceControllers = require('../controllers/sentenceControllers');

const router = express.Router();

router.get('/',sentenceControllers.getAllSentence)


router.post('/add-sentence', sentenceControllers.addSentence);
router.get('/total', sentenceControllers.getTotalSentences);
router.get('/list', sentenceControllers.getSentenceList);

module.exports = router;