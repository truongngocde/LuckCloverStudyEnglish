const express = require('express');
const wordControllers = require('../controllers/wordControllers');

const router = express.Router();

// ADMIN
router.get('/', wordControllers.getAllWords);

// CLIENT
router.get('/add-word', wordControllers.addWord);
router.get('/exist', wordControllers.getCheckWordExist);
router.get('/search-word', wordControllers.getSearchWord)
router.get('/word-detail', wordControllers.getWordDetails);


module.exports = router;