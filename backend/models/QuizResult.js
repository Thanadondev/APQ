const mongoose = require('mongoose');

const quizResultSchema = new mongoose.Schema({
  mbtiType: { type: String, required: true },
  characterMatch: { type: Object, required: true },
  answers: { type: Array, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('QuizResult', quizResultSchema);
