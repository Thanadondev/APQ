import { motion, AnimatePresence } from 'framer-motion';
import { Skull } from 'lucide-react';

export default function BossBar({ current, total, lang, bossDefeated }) {
  const answered = current - 1; // questions answered so far
  const hpPercent = bossDefeated ? 0 : Math.max(0, ((total - answered) / total) * 100);

  // Boss color shifts as HP drops
  let barColor = 'bg-gradient-to-r from-[#ac3149] to-[#f76a80]';
  if (hpPercent < 25) barColor = 'bg-gradient-to-r from-[#770326] to-[#ac3149]';
  else if (hpPercent < 50) barColor = 'bg-gradient-to-r from-[#ac3149] to-[#f76a80]';

  return (
    <div className="w-full mb-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="w-12 h-12 bg-[#ac3149]/20 rounded-full flex items-center justify-center">
          <Skull className={`w-7 h-7 ${bossDefeated ? 'text-surface-container-high' : 'text-[#ac3149]'}`} />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h4 className="font-chakra font-bold text-on-surface text-sm">
              {lang === 'en' ? '🔥 Demon Lord Azaroth' : '🔥 จอมมารอาซาร็อธ'}
            </h4>
            <span className={`text-xs font-bold font-manrope ${bossDefeated ? 'text-secondary' : 'text-[#ac3149]'}`}>
              {bossDefeated
                ? (lang === 'en' ? 'DEFEATED!' : 'พ่ายแพ้!')
                : `HP ${Math.round(hpPercent)}%`}
            </span>
          </div>
          <div className="h-4 bg-surface-container-high rounded-full overflow-hidden relative">
            <motion.div
              className={`h-full rounded-full ${barColor}`}
              initial={{ width: '100%' }}
              animate={{ width: `${hpPercent}%` }}
              transition={{ duration: 0.8, ease: [0.34, 1.56, 0.64, 1] }}
            />
            {/* Damage flash effect */}
            <AnimatePresence>
              {!bossDefeated && (
                <motion.div
                  key={current}
                  initial={{ opacity: 0.8, scale: 1 }}
                  animate={{ opacity: 0, scale: 1.5 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-white/30 rounded-full"
                />
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Boss defeated animation */}
      <AnimatePresence>
        {bossDefeated && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-center mt-4 p-4 bg-secondary/10 rounded-2xl border border-secondary/20"
          >
            <p className="font-chakra font-bold text-secondary text-lg">
              {lang === 'en' ? '⚔️ Victory! The Demon Lord has fallen!' : '⚔️ ชัยชนะ! จอมมารถูกปราบแล้ว!'}
            </p>
            <p className="text-on-surface-variant text-sm mt-1">
              {lang === 'en' ? 'Revealing your true soul...' : 'กำลังเปิดเผยจิตวิญญาณที่แท้จริงของคุณ...'}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
