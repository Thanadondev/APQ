import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import QuestionCard from './QuestionCard';
import BossBar from './BossBar';
import { questions } from '../data/questions';
import { archetypes } from '../data/archetypes';
import { quizService } from '../services/quizService';
import { Loader2 } from 'lucide-react';

export default function QuizContainer({ onComplete, lang, playerClass }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [bossDefeated, setBossDefeated] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSelect = async (answerObj) => {
    if (isSubmitting || bossDefeated) return; // prevent double-click
    setIsSubmitting(true);

    // Validate answer object
    if (!answerObj || typeof answerObj.axis !== 'string' || typeof answerObj.score !== 'number') {
      console.error('Invalid answer object', answerObj);
      setIsSubmitting(false);
      return;
    }

    const newAnswers = [...answers, answerObj];

    if (currentIndex < questions.length - 1) {
      setAnswers(newAnswers);
      setCurrentIndex(currentIndex + 1);
      // Small delay to let animation finish before allowing next click
      setTimeout(() => setIsSubmitting(false), 450);
    } else {
      // Boss is defeated on the last answer!
      setBossDefeated(true);
      // Wait for the defeat animation before processing
      setTimeout(async () => {
        setIsLoading(true);
        await processResults(newAnswers);
      }, 2000);
    }
  };

  const processResults = async (finalAnswers) => {
    const axisScores = { EI: 0, SN: 0, TF: 0, JP: 0 };

    finalAnswers.forEach(ans => {
      axisScores[ans.axis] += ans.score;
    });

    const type = [
      axisScores.EI >= 0 ? 'E' : 'I',
      axisScores.SN >= 0 ? 'S' : 'N',
      axisScores.TF >= 0 ? 'T' : 'F',
      axisScores.JP >= 0 ? 'J' : 'P'
    ].join('');

    const archetype = archetypes[type];

    try {
      const data = await quizService.getCharacterMatch({
        mbtiType: type,
        answers: finalAnswers,
        traits: archetype.traits,
        lang: lang
      });

      if (data.success) {
        onComplete({
          archetype,
          axisScores,
          playerClass,
          characterMatch: data.match,
          aiSummary: data.aiSummary
        });
      }
    } catch (error) {
      console.error("Match calculation failed", error);
      onComplete({
        archetype,
        axisScores,
        playerClass,
        aiMatch: {
          characterName: lang === 'th' ? "วีรบุรุษนิรนาม" : "Unknown Hero",
          animeTitle: lang === 'th' ? "ดินแดนปริศนา" : "The Great Beyond",
          reason: lang === 'th' ? "เซิร์ฟเวอร์เวทมนตร์ของเรากำลังพักผ่อน แต่คุณก็ยังเปล่งประกายอยู่ดี!" : "Our magical servers are currently resting. But you still shine bright!"
        }
      });
    }

    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-surface-container-lowest/80 backdrop-blur-md rounded-[3rem] shadow-xl border border-outline-variant/15">
        <Loader2 className="w-12 h-12 text-primary animate-spin mb-4" />
        <h2 className="text-xl font-chakra text-primary">
          {lang === 'en' ? 'Consulting the Oracle...' : 'กำลังปรึกษาเทพพยากรณ์...'}
        </h2>
        <p className="text-on-surface-variant mt-2 text-sm">
          {lang === 'en' ? 'Matching your soul with the multiverse' : 'กำลังจับคู่จิตวิญญาณของคุณกับพหุจักรวาลอนิเมะ'}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="relative w-full">
      {/* Player Class Badge */}
      {playerClass && (
        <div className="flex justify-center mb-4">
          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full ${playerClass.bg} border ${playerClass.border} backdrop-blur-sm`}>
            <div className="w-6 h-6 overflow-hidden rounded-md bg-white/10 flex items-center justify-center">
              <img src={playerClass.image} alt="" className="w-full h-full object-contain" />
            </div>
            <span className="text-xs font-bold font-chakra text-on-surface uppercase tracking-wider">{playerClass.name[lang]}</span>
          </div>
        </div>
      )}

      {/* Boss HP Bar */}
      <BossBar
        current={currentIndex + 1}
        total={questions.length}
        lang={lang}
        bossDefeated={bossDefeated}
      />

      {/* Question Card or Defeated State */}
      {!bossDefeated && (
        <AnimatePresence mode="wait">
          <QuestionCard
            key={currentQuestion.id}
            question={currentQuestion}
            current={currentIndex + 1}
            total={questions.length}
            onSelect={handleSelect}
            lang={lang}
          />
        </AnimatePresence>
      )}
    </div>
  );
}
