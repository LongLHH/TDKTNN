import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { introData } from "../data/content";

const IntroSection = () => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const fullText = introData.typewriterQuestion;

  useEffect(() => {
    if (!fullText) return;

    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 80);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  const scrollToNext = () => {
    const nextSection = document.getElementById("timeline");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="intro"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `linear-gradient(to bottom, #0f172a 0%, #1e1b4b 100%)`,
      }}
    >
      {/* Parchment Texture Overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100' height='100' filter='url(%23noise)' opacity='0.4'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Decorative Quote Marks */}
      <div className="absolute top-20 left-20 text-9xl text-vintage-accent opacity-10 font-serif">
        "
      </div>
      <div className="absolute bottom-20 right-20 text-9xl text-vintage-accent opacity-10 font-serif">
        "
      </div>

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 text-center px-6 max-w-5xl"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif font-bold text-5xl md:text-7xl text-vintage-accent mb-4 tracking-wide"
        >
          {introData.mainTitle}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-xl md:text-2xl text-vintage-light/80 mb-12 tracking-wide"
        >
          {introData.subTitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative inline-block"
        >
          <div className="absolute inset-0 bg-vintage-accent/20 blur-3xl rounded-full" />
          <div className="relative bg-vintage-dark/60 backdrop-blur-sm border-2 border-vintage-accent/30 rounded-2xl px-8 py-6 min-h-[120px] flex items-center justify-center">
            <p className="text-2xl md:text-3xl font-serif text-vintage-light">
              {displayedText}
              {!isTypingComplete && (
                <span className="inline-block w-1 h-8 bg-vintage-accent ml-1 animate-pulse" />
              )}
              {isTypingComplete && (
                <span className="inline-block w-1 h-8 bg-vintage-accent ml-1 animate-blink" />
              )}
            </p>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        onClick={scrollToNext}
      >
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-vintage-light/60 text-sm tracking-widest">
            SCROLL
          </span>
          <svg
            className="w-6 h-6 text-vintage-accent"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>

      <style jsx>{`
        @keyframes blink {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0;
          }
        }
        .animate-blink {
          animation: blink 1s infinite;
        }
      `}</style>
    </section>
  );
};

export default IntroSection;
