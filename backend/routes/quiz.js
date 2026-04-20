const express = require('express');
const router = express.Router();
const quizController = require('../controllers/quizController');

// POST /api/match
router.post('/match', async (req, res) => {
    const { mbtiType, traits, lang } = req.body;
    const result = await aiService.getAIPersonalityAnalysis(mbtiType, traits, lang);

    res.json({
      success: true,
      match: result.characterMatch,
      aiSummary: result.aiSummary
    });
});

module.exports = router;
