const express = require('express');
const highscoreControllers = require('../controllers/highscoreControllers');

const router = express.Router();

router.put('update', highscoreControllers.putUpdateHighScore);
router.get('/leaderboard', highscoreControllers.getLeaderboard);

module.exports = router;