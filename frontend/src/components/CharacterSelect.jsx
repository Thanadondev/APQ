import { motion } from 'framer-motion';
import { Sword, Target, Flame, Skull } from 'lucide-react';

const classes = [
  {
    id: 'swordsman',
    icon: Sword,
    name: { en: 'Swordsman', th: 'นักดาบ' },
    desc: { en: 'A fearless warrior who charges the front line.', th: 'นักรบไร้พ่ายผู้บุกตะลุยแนวหน้า' },
    color: 'from-[#ac3149] to-[#f76a80]',
    glow: 'shadow-[#ac3149]/40',
    bg: 'bg-[#ac3149]/10',
    border: 'border-[#ac3149]/30',
  },
  {
    id: 'archer',
    icon: Target,
    name: { en: 'Archer', th: 'นักธนู' },
    desc: { en: 'A sharp-eyed marksman striking from afar.', th: 'พรานธนูตาเหยี่ยวที่ลอบจู่โจมจากระยะไกล' },
    color: 'from-secondary to-secondary-container',
    glow: 'shadow-secondary/40',
    bg: 'bg-secondary/10',
    border: 'border-secondary/30',
  },
  {
    id: 'mage',
    icon: Flame,
    name: { en: 'Mage', th: 'นักเวทย์' },
    desc: { en: 'A master of arcane arts who bends reality.', th: 'จอมเวทย์ผู้บิดเบือนกฎแห่งความจริง' },
    color: 'from-primary to-primary-container',
    glow: 'shadow-primary/40',
    bg: 'bg-primary/10',
    border: 'border-primary/30',
  },
  {
    id: 'assassin',
    icon: Skull,
    name: { en: 'Assassin', th: 'นักฆ่า' },
    desc: { en: 'A silent shadow delivering lethal precision.', th: 'เงาเงียบผู้สังหารด้วยความแม่นยำ' },
    color: 'from-[#4b386e] to-[#69558e]',
    glow: 'shadow-[#4b386e]/40',
    bg: 'bg-[#4b386e]/10',
    border: 'border-[#4b386e]/30',
  }
];

export default function CharacterSelect({ lang, onSelect }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-3xl mx-auto"
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-chakra font-extrabold text-on-surface mb-3">
          {lang === 'en' ? 'Choose Your Class' : 'เลือกอาชีพของคุณ'}
        </h2>
        <p className="text-on-surface-variant font-manrope">
          {lang === 'en'
            ? 'Select your warrior class before challenging the Demon Lord'
            : 'เลือกอาชีพนักรบก่อนเข้าท้าทายจอมมาร'}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {classes.map((cls, i) => {
          const Icon = cls.icon;
          return (
            <motion.button
              key={cls.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ scale: 1.08, y: -8 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(cls)}
              className={`group relative flex flex-col items-center p-6 md:p-8 rounded-[2rem] bg-surface-container-lowest/90 backdrop-blur-md border ${cls.border} hover:shadow-2xl hover:${cls.glow} transition-all duration-300 cursor-pointer`}
            >
              <div className={`w-16 h-16 md:w-20 md:h-20 rounded-full ${cls.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-8 h-8 md:w-10 md:h-10 text-on-surface" />
              </div>

              <h3 className="text-lg md:text-xl font-chakra font-bold text-on-surface mb-1">
                {cls.name[lang]}
              </h3>
              <p className="text-xs text-on-surface-variant text-center leading-relaxed">
                {cls.desc[lang]}
              </p>

              <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 w-0 group-hover:w-3/4 rounded-full bg-gradient-to-r ${cls.color} transition-all duration-500`} />
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
