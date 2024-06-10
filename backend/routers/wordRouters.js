const express = require('express');
const wordControllers = require('../controllers/wordControllers');
const { jwtAuthentication } = require('../middlewares/authMiddlewares');

const router = express.Router();

// ADMIN
router.get('/', wordControllers.getAllWords);

// CLIENT
router.post('/add-word', wordControllers.addWord);
router.get('/exist', wordControllers.getCheckWordExist);
router.get('/pack', wordControllers.getWordsPack)
router.get('/search-word', wordControllers.getSearchWord)
router.get('/word-details', wordControllers.getWordDetails);
router.get('/favorite-list',jwtAuthentication, wordControllers.getUserFavoriteList);

module.exports = router;