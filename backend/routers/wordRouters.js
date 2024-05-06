<<<<<<< HEAD
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


=======
const express = require('express');
const wordControllers = require('../controllers/wordControllers');

const router = express.Router();

router
    .route('/word-details')
    .get(wordControllers.getWordDetails)


>>>>>>> 6b2f26e08d69e2db20d97b3fce3409e5d02635d4
module.exports = router;