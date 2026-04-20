import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { Sparkles, Crown, Share2, Trophy, ShieldX } from 'lucide-react';

function AxisBar({ leftLabel, rightLabel, score, maxScore, delay, lang }) {
  // score > 0 means left side wins, score < 0 means right side wins
  const absScore = Math.abs(score);
  const leftPercent = score >= 0 ? 50 + (absScore / maxScore) * 50 : 50 - (absScore / maxScore) * 50;
  const leftWins = score >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="mb-5"
    >
      <div className="flex justify-between items-center mb-2">
        <div className={`flex items-center gap-1.5 font-chakra font-bold text-sm ${leftWins ? 'text-primary' : 'text-on-surface-variant'}`}>
          {leftWins && <Trophy className="w-4 h-4 text-primary" />}
          {!leftWins && <ShieldX className="w-4 h-4 text-on-surface-variant/50" />}
          <span>{leftLabel}</span>
        </div>
        <div className={`flex items-center gap-1.5 font-chakra font-bold text-sm ${!leftWins ? 'text-secondary' : 'text-on-surface-variant'}`}>
          <span>{rightLabel}</span>
          {!leftWins && <Trophy className="w-4 h-4 text-secondary" />}
          {leftWins && <ShieldX className="w-4 h-4 text-on-surface-variant/50" />}
        </div>
      </div>
      <div className="h-4 bg-surface-container-high rounded-full overflow-hidden relative flex">
        <motion.div
          initial={{ width: '50%' }}
          animate={{ width: `${leftPercent}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className={`h-full rounded-l-full ${leftWins ? 'bg-gradient-to-r from-primary to-primary-container' : 'bg-surface-container-highest'}`}
        />
        <motion.div
          initial={{ width: '50%' }}
          animate={{ width: `${100 - leftPercent}%` }}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.34, 1.56, 0.64, 1] }}
          className={`h-full rounded-r-full ${!leftWins ? 'bg-gradient-to-l from-secondary to-secondary-container' : 'bg-surface-container-highest'}`}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className={`text-xs font-manrope ${leftWins ? 'text-primary font-bold' : 'text-on-surface-variant'}`}>
          {leftWins ? (lang === 'en' ? 'Winner!' : 'ชนะ!') : ''}
        </span>
        <span className={`text-xs font-manrope ${!leftWins ? 'text-secondary font-bold' : 'text-on-surface-variant'}`}>
          {!leftWins ? (lang === 'en' ? 'Winner!' : 'ชนะ!') : ''}
        </span>
      </div>
    </motion.div>
  );
}

export default function ResultDisplay({ result, resetQuiz, lang }) {
  const { archetype, aiMatch, axisScores } = result;

  const maxPossible = 8; // 4 questions per axis * max score 2 per question

  const axisLabels = [
    { axis: 'EI', left: { en: 'Extrovert (E)', th: 'เปิดเผย (E)' }, right: { en: 'Introvert (I)', th: 'เก็บตัว (I)' } },
    { axis: 'SN', left: { en: 'Sensing (S)', th: 'ประสาทสัมผัส (S)' }, right: { en: 'Intuition (N)', th: 'สัญชาตญาณ (N)' } },
    { axis: 'TF', left: { en: 'Thinking (T)', th: 'ตรรกะ (T)' }, right: { en: 'Feeling (F)', th: 'ความรู้สึก (F)' } },
    { axis: 'JP', left: { en: 'Judging (J)', th: 'มีแบบแผน (J)' }, right: { en: 'Perceiving (P)', th: 'ยืดหยุ่น (P)' } },
  ];

  const labels = {
    int: lang === 'en' ? 'Intelligence' : 'สติปัญญา',
    pwr: lang === 'en' ? 'Power' : 'พลังโจมตี',
    spd: lang === 'en' ? 'Speed' : 'ความเร็ว',
    emp: lang === 'en' ? 'Empathy' : 'ความเห็นอกเห็นใจ',
    title: lang === 'en' ? 'Your Archetype' : 'ประเภทบุคลิกภาพของคุณ',
    aiMatch: lang === 'en' ? 'AI Resonance Match' : 'การจับคู่ด้วย AI',
    retry: lang === 'en' ? 'Take Quiz Again' : 'ทำแบบทดสอบอีกครั้ง',
    share: lang === 'en' ? 'Share Result' : 'แชร์ผลลัพธ์',
    breakdown: lang === 'en' ? 'Personality Axis Breakdown' : 'ผลแพ้ชนะบุคลิกภาพแต่ละด้าน'
  };

  const data = [
    { subject: labels.int, A: archetype.stats.int, fullMark: 100 },
    { subject: labels.pwr, A: archetype.stats.pwr, fullMark: 100 },
    { subject: labels.spd, A: archetype.stats.spd, fullMark: 100 },
    { subject: labels.emp, A: archetype.stats.emp, fullMark: 100 },
  ];

  const handleShare = async () => {
    const axisSummary = axisLabels.map(a => {
      const s = axisScores[a.axis];
      const winner = s >= 0 ? a.left[lang] : a.right[lang];
      return `${winner} ✓`;
    }).join(' | ');

    const textToShare = lang === 'en' 
      ? `🎌 Anime Personality Quiz\nI got: ${archetype.title} (${archetype.type})\nAxis: ${axisSummary}\nAI Anime Match: ${aiMatch.characterName} (${aiMatch.animeTitle})\n\nTake the quiz!`
      : `🎌 แบบทดสอบบุคลิกภาพอนิเมะ\nฉันได้เป็น: ${archetype.thaiTitle} (${archetype.type})\nผลแกน: ${axisSummary}\nตัวละครจาก AI: ${aiMatch.characterName} (${aiMatch.animeTitle})\n\nมาลองเล่นกัน!`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Anime Personality Quiz Result',
          text: textToShare,
          url: window.location.href,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      navigator.clipboard.writeText(textToShare);
      alert(lang === 'en' ? 'Result copied to clipboard!' : 'คัดลอกผลลัพธ์ลงคลิปบอร์ดแล้ว!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-[3rem] p-8 md:p-10 shadow-[0_20px_40px_rgba(46,51,53,0.08)] border border-outline-variant/20"
    >
      {/* Header: Archetype Title */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <Crown className="w-10 h-10 text-primary" />
        </motion.div>
        
        <h2 className="text-secondary font-bold tracking-widest text-sm uppercase mb-2">
          {labels.title}
        </h2>
        <h3 className="text-3xl md:text-4xl font-chakra text-on-surface mb-1">
          {lang === 'en' ? archetype.title : archetype.thaiTitle}
        </h3>
        <p className="text-lg text-primary/80 font-chakra mb-4">
          {lang === 'en' ? archetype.thaiTitle : archetype.title}
        </p>
        <p className="text-on-surface-variant max-w-md mx-auto italic">
          "{archetype.traits}"
        </p>
      </div>

      {/* Axis Breakdown Section */}
      <div className="bg-surface-container-low rounded-[2rem] p-6 md:p-8 mb-8">
        <h4 className="font-chakra font-bold text-on-surface text-center mb-6 text-lg">
          ⚔️ {labels.breakdown}
        </h4>
        {axisLabels.map((a, i) => (
          <AxisBar
            key={a.axis}
            leftLabel={a.left[lang]}
            rightLabel={a.right[lang]}
            score={axisScores[a.axis]}
            maxScore={maxPossible}
            delay={i * 0.15}
            lang={lang}
          />
        ))}
      </div>

      {/* Radar Chart + AI Match */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center border-t border-b border-surface-variant py-8 my-8">
        <div className="h-64 scale-110">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="60%" data={data}>
              <PolarGrid stroke="#aeb3b5" strokeOpacity={0.4} />
              <PolarAngleAxis dataKey="subject" tick={{ fill: '#5a6062', fontSize: 12, fontFamily: 'var(--font-manrope)' }} />
              <Radar
                name="Stats"
                dataKey="A"
                stroke="#69558e"
                fill="#d6beff"
                fillOpacity={0.6}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-primary/5 rounded-3xl p-6 relative overflow-hidden">
          <div className="absolute -top-6 -right-6 text-primary/10">
            <Sparkles className="w-32 h-32" />
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <h4 className="font-chakra font-bold text-on-surface">{labels.aiMatch}</h4>
            </div>
            
            <h5 className="text-2xl font-chakra text-primary mb-1">
              {aiMatch.characterName}
            </h5>
            <p className="text-sm font-bold text-secondary mb-4 uppercase tracking-wider">
              {aiMatch.animeTitle}
            </p>
            
            <p className="text-on-surface-variant text-sm leading-relaxed">
              {aiMatch.reason}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleShare}
          className="flex items-center gap-2 bg-secondary text-on-secondary px-8 py-3 rounded-full font-chakra font-bold shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all w-full sm:w-auto justify-center"
        >
          <Share2 className="w-5 h-5" />
          {labels.share}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetQuiz}
          className="bg-gradient-to-r from-primary to-[#5c4981] text-on-primary px-8 py-3 rounded-full font-chakra font-bold shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all w-full sm:w-auto justify-center"
        >
          {labels.retry}
        </motion.button>
      </div>
    </motion.div>
  );
}
