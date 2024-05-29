const express = require('express');
const flashcardControllers = require('../controllers/flashcardControllers');

const router = express.Router();

router.get('/word-pack', flashcardControllers.getWordPack);
router.get('/word-pack/total', flashcardControllers.getTotalWorkPack)

module.exports = router;