const express = require('express');
const sentenceControllers = require('../controllers/sentenceControllers');

const router = express.Router();

router.get('/',sentenceControllers.getAllSentence)


router.post('/add-sentence', sentenceControllers.addSentence);
router.get('/total', sentenceControllers.getTotalSentences);
router.get('/list', sentenceControllers.getSentenceList);
router.get('/sentence-details', sentenceControllers.getSentenceDetails);


module.exports = router;