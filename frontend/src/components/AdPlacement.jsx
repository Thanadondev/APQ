import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Info, X } from 'lucide-react';

export default function AdPlacement({ type = 'banner', lang = 'en' }) {
  const [isVisible, setIsVisible] = useState(true);
  const isBanner = type === 'banner';
  const isSidebar = type === 'sidebar';

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className={`relative group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md flex items-center justify-center transition-all hover:bg-white/10 hover:border-primary/30 
          ${isBanner ? 'w-full h-24 md:h-28 mt-4' : 'w-full h-64'} 
          ${isSidebar ? 'hidden lg:flex flex-col' : 'flex'}`}
      >
        {/* Close Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsVisible(false);
          }}
          className="absolute top-2 right-2 z-20 p-1 rounded-full bg-white/5 hover:bg-white/20 text-white/40 hover:text-white transition-colors"
          title={lang === 'en' ? 'Close Ad' : 'ปิดโฆษณา'}
        >
          <X className="w-3.5 h-3.5" />
        </button>
        {/* Decorative corners */}
        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/30 rounded-tl-lg"></div>
        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/30 rounded-tr-lg"></div>
        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/30 rounded-bl-lg"></div>
        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/30 rounded-br-lg"></div>

        <div className="flex flex-col items-center justify-center text-white/20 p-4">
          <Info className="w-5 h-5 mb-2 opacity-50" />
          <p className="text-[10px] uppercase tracking-widest font-chakra font-bold">
            {lang === 'en' ? 'Sponsor / Advertising Area' : 'พื้นที่โฆษณา / สปอนเซอร์'}
          </p>
        </div>

        {/* Subtle shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </motion.div>
    </AnimatePresence>
  );
}
