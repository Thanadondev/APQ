const QuizResult = require('../models/QuizResult');
const aiService = require('../services/aiService');

exports.matchCharacter = async (req, res) => {
  try {
    const { mbtiType, answers, traits, lang } = req.body;

    // --- Validation ---
    const validTypes = Object.keys(aiService.characterDB);
    if (!mbtiType || typeof mbtiType !== 'string' || !validTypes.includes(mbtiType)) {
      return res.status(400).json({ success: false, message: `Invalid mbtiType. Must be one of: ${validTypes.join(', ')}` });
    }
    if (!answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({ success: false, message: 'Answers must be a non-empty array.' });
    }
    if (!traits || typeof traits !== 'string' || traits.trim().length === 0) {
      return res.status(400).json({ success: false, message: 'Traits must be a non-empty string.' });
    }

    // --- AI Matching Process ---
    let characterMatch = await aiService.getAICharacterMatch(mbtiType, traits, lang);

    // Final fallback
    if (!characterMatch) {
      const requestedLang = lang === 'th' ? 'th' : 'en';
      characterMatch = {
        characterName: requestedLang === 'th' ? "วีรบุรุษนิรนาม" : "Unknown Hero",
        animeTitle: requestedLang === 'th' ? "ดินแดนปริศนา" : "The Great Beyond",
        reason: requestedLang === 'th'
          ? "ระบบไม่สามารถระบุตัวละครได้ในขณะนี้ แต่คุณก็ยังเปล่งประกายอยู่!"
          : "We couldn't determine your character match right now, but you still shine bright!"
      };
    }

    // --- Database Save (Syncing for simplicity or async for speed) ---
    const newResult = new QuizResult({ mbtiType, answers, characterMatch });
    newResult.save().catch(err => console.warn('DB Save Error:', err.message));

    res.status(200).json({ success: true, match: characterMatch });
  } catch (error) {
    console.error('Quiz Controller Error:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
};
