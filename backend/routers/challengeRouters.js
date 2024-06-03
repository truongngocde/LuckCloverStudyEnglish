const express = require('express');
const challengeControllers = require('../controllers/challengeControllers');

const router = express.Router();

router.get('/correct-word-pack', challengeControllers.getWordPackCorrectWord);
router.get('/match-word-pack', challengeControllers.getWordPackWordMatch);
router.get('/fast-word-pack', challengeControllers.getWordPackWordFast);

module.exports = router;