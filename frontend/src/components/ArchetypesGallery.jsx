import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { archetypes } from '../data/archetypes';
import { Crown, Zap, Shield, Heart, Search } from 'lucide-react';

export default function ArchetypesGallery({ lang, onBack }) {
  const [selected, setSelected] = useState(null);
  
  const labels = {
    title: lang === 'en' ? 'Character Select' : 'เลือกตัวละคร',
    subtitle: lang === 'en' ? 'Choose your archetype to view stats' : 'เลือกประเภทบุคลิกภาพเพื่อดูค่าพลัง',
    back: lang === 'en' ? 'Back to Hub' : 'กลับสู่หน้าหลัก',
    int: lang === 'en' ? 'INT' : 'ปัญญา',
    pwr: lang === 'en' ? 'PWR' : 'พลังโจมตี',
    spd: lang === 'en' ? 'SPD' : 'ความเร็ว',
    emp: lang === 'en' ? 'EMP' : 'เห็นใจ'
  };

  const archValues = Object.values(archetypes);

  return (
    <div className="w-full max-w-6xl mx-auto py-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="text-display-lg font-chakra font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary mb-2 tracking-tight drop-shadow-md">
            {labels.title}
          </h1>
          <p className="text-on-surface-variant font-manrope">{labels.subtitle}</p>
        </div>
        <button 
          onClick={onBack}
          className="px-6 py-2 bg-surface-container-low hover:bg-surface-container-high rounded-full font-bold text-on-surface-variant transition-colors"
        >
          {labels.back}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {archValues.map((arch, index) => (
          <motion.div
            key={arch.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            onClick={() => setSelected(arch)}
            className={`cursor-pointer rounded-3xl p-6 relative overflow-hidden transition-all duration-300 ${
              selected?.type === arch.type 
                ? 'bg-primary border-transparent shadow-[0_0_30px_rgba(105,85,142,0.6)] scale-105 z-10' 
                : 'bg-surface-container-lowest/80 backdrop-blur-md border border-outline-variant/20 hover:scale-105 hover:bg-surface-container-low hover:shadow-xl'
            }`}
          >
            <div className={`text-5xl mb-4 opacity-10 absolute -right-4 -bottom-4 font-chakra font-black ${selected?.type === arch.type ? 'text-on-primary' : 'text-primary'}`}>
              {arch.type}
            </div>
            
            <div className="relative z-10">
              <span className={`text-xs font-bold px-3 py-1 rounded-full mb-3 inline-block ${
                selected?.type === arch.type ? 'bg-on-primary text-primary' : 'bg-primary-container text-on-primary-container'
              }`}>
                {arch.type}
              </span>
              <h3 className={`text-lg font-chakra font-bold leading-tight mb-1 ${
                selected?.type === arch.type ? 'text-on-primary' : 'text-on-surface'
              }`}>
                {lang === 'en' ? arch.title : arch.thaiTitle}
              </h3>
              <p className={`text-xs line-clamp-2 ${
                selected?.type === arch.type ? 'text-on-primary/80' : 'text-on-surface-variant'
              }`}>
                {arch.traits}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Selected Character Detail Modal overlay */}
      <AnimatePresence>
        {selected && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, y: 50 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-surface-container-lowest rounded-[3rem] p-8 md:p-12 shadow-2xl border border-primary/20 max-w-3xl w-full flex flex-col md:flex-row gap-10"
            >
              <div className="flex-1 flex flex-col justify-center relative">
                <div className="absolute inset-0 bg-primary/5 rounded-[2rem] transform -rotate-3 scale-105"></div>
                <div className="relative bg-surface-container-low rounded-[2rem] p-8 aspect-square flex flex-col items-center justify-center border border-outline-variant/10 text-center">
                  <Crown className="w-16 h-16 text-primary mb-6" />
                  <div className="text-6xl font-chakra font-black text-primary/20 absolute bottom-4">
                    {selected.type}
                  </div>
                  <h2 className="text-3xl font-chakra font-bold text-on-surface relative z-10">
                    {lang === 'en' ? selected.title : selected.thaiTitle}
                  </h2>
                  <h3 className="text-xl font-manrope text-secondary mt-2 relative z-10">
                    {lang === 'en' ? selected.thaiTitle : selected.title}
                  </h3>
                </div>
              </div>

              <div className="flex-1 flex flex-col justify-center">
                <h4 className="text-sm uppercase tracking-widest font-bold text-outline mb-4">
                  {lang === 'en' ? 'Base Stats' : 'ค่าพลังพื้นฐาน'}
                </h4>
                
                <div className="space-y-6">
                  {/* Stats Bar Component */}
                  <div className="flex items-center gap-4">
                    <Search className="w-5 h-5 text-[#69558e]" />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-bold mb-1 uppercase text-[#69558e]">
                        <span>{labels.int}</span>
                        <span>{selected.stats.int} / 100</span>
                      </div>
                      <div className="h-3 bg-surface-container-high rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${selected.stats.int}%` }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-gradient-to-r from-primary to-primary-container"></motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Zap className="w-5 h-5 text-[#ac3149]" />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-bold mb-1 uppercase text-[#ac3149]">
                        <span>{labels.pwr}</span>
                        <span>{selected.stats.pwr} / 100</span>
                      </div>
                      <div className="h-3 bg-surface-container-high rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${selected.stats.pwr}%` }} transition={{ duration: 1, delay: 0.3 }} className="h-full bg-gradient-to-r from-[#ac3149] to-[#f76a80]"></motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Shield className="w-5 h-5 text-[#006c53]" />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-bold mb-1 uppercase text-[#006c53]">
                        <span>{labels.spd}</span>
                        <span>{selected.stats.spd} / 100</span>
                      </div>
                      <div className="h-3 bg-surface-container-high rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${selected.stats.spd}%` }} transition={{ duration: 1, delay: 0.4 }} className="h-full bg-gradient-to-r from-secondary to-secondary-container"></motion.div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <Heart className="w-5 h-5 text-[#7c5649]" />
                    <div className="flex-1">
                      <div className="flex justify-between text-xs font-bold mb-1 uppercase text-[#7c5649]">
                        <span>{labels.emp}</span>
                        <span>{selected.stats.emp} / 100</span>
                      </div>
                      <div className="h-3 bg-surface-container-high rounded-full overflow-hidden">
                        <motion.div initial={{ width: 0 }} animate={{ width: `${selected.stats.emp}%` }} transition={{ duration: 1, delay: 0.5 }} className="h-full bg-gradient-to-r from-tertiary to-tertiary-container"></motion.div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-surface-variant">
                  <p className="text-sm font-manrope text-on-surface-variant italic leading-relaxed">
                    "{selected.traits}"
                  </p>
                </div>
              </div>

              <button 
                onClick={() => setSelected(null)}
                className="absolute top-6 right-6 w-10 h-10 bg-surface-container-high rounded-full flex items-center justify-center text-on-surface-variant hover:text-on-surface hover:bg-surface-variant transition-colors"
              >
                &times;
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
