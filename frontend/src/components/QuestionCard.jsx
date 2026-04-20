import { motion } from 'framer-motion';

export default function QuestionCard({ question, current, total, onSelect, lang }) {
  const scaleOptions = [
    { value: 2, label: { en: "Strongly Agree", th: "มากที่สุด" } },
    { value: 1, label: { en: "Agree", th: "มาก" } },
    { value: 0, label: { en: "Neutral", th: "เฉยๆ" } },
    { value: -1, label: { en: "Disagree", th: "น้อย" } },
    { value: -2, label: { en: "Strongly Disagree", th: "น้อยมาก" } }
  ];

  const handleValueSelect = (val) => {
    // We pass the raw value multiplied by the question's direction 
    // to align it with the primary axis (e.g. +value for E, -value for I)
    onSelect({ axis: question.axis, score: val * question.direction });
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 1.05, y: -20 }}
      transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
      className="game-card rounded-[3rem] p-10 relative overflow-hidden"
    >
      <div 
        data-testid="question-counter"
        className="absolute top-6 left-10 text-primary font-chakra font-bold text-sm tracking-widest opacity-60"
      >
        QUESTION {current} / {total}
      </div>
      
      <h3 className="text-xl md:text-2xl font-chakra mt-4 mb-4 text-on-surface leading-normal text-center min-h-[120px] flex items-center justify-center font-bold px-4">
        {question.text[lang]}
      </h3>

      <div className="flex flex-col gap-3">
        {scaleOptions.map((opt, idx) => {
          // Adjust visual styles based on how strong the agreement is
          const isHigh = opt.value > 0;
          const isLow = opt.value < 0;
          const isNeutral = opt.value === 0;

          let colorClasses = "hover:bg-surface-container hover:text-on-surface";
          if (isHigh) {
            colorClasses = "hover:bg-primary-container hover:text-on-primary-container hover:border-primary/50 text-primary";
          } else if (isLow) {
            colorClasses = "hover:bg-secondary-container hover:text-on-secondary-container hover:border-secondary/50 text-secondary";
          } else if (isNeutral) {
            colorClasses = "hover:bg-surface-container-highest hover:text-on-surface hover:border-outline/50 text-outline";
          }

          return (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleValueSelect(opt.value)}
              className={`font-manrope text-center w-full py-4 px-6 rounded-[2rem] bg-surface-container-low transition-colors border border-transparent font-bold ${colorClasses}`}
            >
              {opt.label[lang]}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
