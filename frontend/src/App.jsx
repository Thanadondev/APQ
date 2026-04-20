import { useState } from 'react';
import QuizContainer from './components/QuizContainer';
import ResultDisplay from './components/ResultDisplay';
import ArchetypesGallery from './components/ArchetypesGallery';
import CharacterSelect from './components/CharacterSelect';
import { Globe, Users } from 'lucide-react';

function App() {
  const [result, setResult] = useState(null);
  const [lang, setLang] = useState('th');
  const [view, setView] = useState('home'); // 'home', 'gallery', 'select', 'quiz'
  const [playerClass, setPlayerClass] = useState(null);

  const toggleLang = () => {
    setLang(lang === 'en' ? 'th' : 'en');
  };

  const handleClassSelect = (cls) => {
    setPlayerClass(cls);
    setView('quiz');
  };

  const handleReset = () => {
    setResult(null);
    setPlayerClass(null);
    setView('home');
  };

  return (
    <div className="min-h-screen text-on-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* 8-bit Castle Background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/castle-bg.png')" }}></div>
      <div className="absolute inset-0 bg-background/80 backdrop-blur-[1px]"></div>
      <div className="scanline"></div>

      {/* Decorative background blobs */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-secondary-container rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      {/* Top buttons */}
      <div className="absolute top-6 right-6 z-20 flex gap-3">
        {(view === 'home' || view === 'select') && (
          <button
            onClick={() => setView('gallery')}
            className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest/80 backdrop-blur-md rounded-full text-on-surface hover:text-primary hover:bg-primary-container transition-colors shadow-sm"
          >
            <Users className="w-4 h-4" />
            <span className="text-sm font-bold font-chakra tracking-wider">
              {lang === 'en' ? 'Archetypes' : 'ตัวละคร'}
            </span>
          </button>
        )}
        <button
          onClick={toggleLang}
          className="flex items-center gap-2 px-4 py-2 bg-surface-container-highest/80 backdrop-blur-md rounded-full text-on-surface hover:text-primary hover:bg-primary-container transition-colors shadow-sm"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm font-bold font-chakra uppercase tracking-wider">{lang === 'en' ? 'EN' : 'TH'}</span>
        </button>
      </div>

      <div className="z-10 w-full relative">
        {/* Gallery View */}
        {view === 'gallery' && (
          <ArchetypesGallery lang={lang} onBack={() => setView('home')} />
        )}

        {/* Home View - Landing */}
        {view === 'home' && (
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh]">
            <div className="text-center mb-10 mt-8 md:mt-0">
              <h1 className="text-4xl md:text-5xl font-chakra font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-[#5c4981] mb-3 tracking-tight">
                {lang === 'en' ? 'Anime Personality Quiz' : 'แบบทดสอบบุคลิกภาพอนิเมะ'}
              </h1>
              <p className="text-on-surface-variant font-manrope mb-10">
                {lang === 'en' ? 'Defeat the Demon Lord to discover your true archetype' : 'ปราบจอมมารเพื่อค้นพบตัวตนที่แท้จริงของคุณ'}
              </p>
              <button
                onClick={() => setView('select')}
                className="bg-gradient-to-r from-primary to-[#5c4981] text-on-primary px-10 py-4 rounded-full font-chakra font-bold text-lg shadow-xl shadow-primary/30 hover:shadow-primary/50 hover:scale-105 transition-all"
              >
                {lang === 'en' ? '⚔️ Start Adventure' : '⚔️ เริ่มการผจญภัย'}
              </button>
            </div>
          </div>
        )}

        {/* Character Select View */}
        {view === 'select' && (
          <div className="flex flex-col items-center justify-center min-h-[80vh]">
            <CharacterSelect lang={lang} onSelect={handleClassSelect} />
          </div>
        )}

        {/* Quiz View */}
        {view === 'quiz' && !result && (
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh] mt-8 md:mt-0">
            <QuizContainer onComplete={setResult} lang={lang} playerClass={playerClass} />
          </div>
        )}

        {/* Result View */}
        {result && (
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center min-h-[80vh] mt-8 md:mt-0">
            <ResultDisplay result={result} resetQuiz={handleReset} lang={lang} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
