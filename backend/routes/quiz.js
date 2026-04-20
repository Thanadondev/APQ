const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// POST /api/match
router.post('/match', quizController.matchCharacter);

module.exports = router;
