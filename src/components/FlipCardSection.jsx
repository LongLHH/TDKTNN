import { useState } from 'react';
import { motion } from 'framer-motion';

const FlipCardSection = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => setFlipped((v) => !v);

  return (
    <section
      id="flipcard"
      className="relative min-h-screen flex items-center justify-center px-6"
      style={{ background: 'linear-gradient(135deg, #23170f 0%, #2a2722 50%, #3d352f 100%)' }}
    >
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' /%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23noise)' opacity='0.25'/%3E%3C/svg%3E")`
      }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center"
      >
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-vintage-accent">EVN: Gã khổng lồ ĐỘC QUYỀN?</h1>
          <p className="text-vintage-light/80 mt-2">(Click hoặc rê chuột để lật)</p>
        </div>

        <div
          className="flip-card w-[340px] h-[420px] md:w-[480px] md:h-[560px] mx-auto cursor-pointer perspective-1000"
          onClick={handleFlip}
          onKeyDown={(e) => e.key === 'Enter' && handleFlip()}
          role="button"
          tabIndex={0}
        >
          <div
            className={`flip-card-inner relative w-full h-full rounded-2xl transition-transform duration-700 ${flipped ? 'transform rotate-y-180' : ''}`}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div className="flip-card-front absolute inset-0 backface-hidden bg-vintage-dark/80 border-2 border-vintage-accent rounded-2xl flex flex-col items-center justify-center p-6">
              <div className="text-7xl mb-6">⚡️</div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-vintage-accent">EVN: Gã khổng lồ ĐỘC QUYỀN?</h2>
              <p className="mt-4 text-vintage-light/80">Nhấp hoặc rê để lật và xem góc nhìn khác</p>
            </div>

            {/* Back */}
            <div className="flip-card-back absolute inset-0 backface-hidden bg-vintage-dark/90 border-2 border-vintage-accent rounded-2xl flex flex-col items-center justify-center p-6" style={{ transform: 'rotateY(180deg)' }}>
              <div className="text-6xl mb-4">⚖️</div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold text-vintage-accent">Hay... Cánh tay nối dài ĐIỀU TIẾT VĨ MÔ?</h2>
              <p className="mt-4 text-vintage-light/80">Tập đoàn kinh tế nhà nước: Độc quyền tự nhiên hay Công cụ điều tiết vĩ mô?</p>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <button
            onClick={() => {
              const el = document.getElementById('scratchcards');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-amber-600 text-black font-semibold"
          >
            Bắt đầu
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 7l5 5 5-5" /></svg>
          </button>
        </div>
      </motion.div>

      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .rotate-y-180 { transform: rotateY(180deg); }
        .backface-hidden { -webkit-backface-visibility: hidden; backface-visibility: hidden; }
        .flip-card-inner { transform-style: preserve-3d; }
      `}</style>
    </section>
  );
};

export default FlipCardSection;
