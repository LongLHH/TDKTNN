import { motion } from 'framer-motion';
import { navigationData } from '../data/content';
import { useState, useRef } from 'react';

const Footer = () => {
  const [clickCount, setClickCount] = useState(0);
  const clickTimeoutRef = useRef(null);

  const handleNavigation = (path) => {
    if (path.startsWith('#')) {
      const element = document.querySelector(path);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.location.href = path;
    }
  };

  const handleSecretClick = () => {
    setClickCount(prev => prev + 1);

    // Clear timeout cũ
    if (clickTimeoutRef.current) {
      clearTimeout(clickTimeoutRef.current);
    }

    // Nếu đủ 5 lần click, navigate đến admin
    if (clickCount + 1 >= 5) {
      window.location.href = '/admin';
      setClickCount(0);
      return;
    }

    // Reset sau 2 giây nếu không click tiếp
    clickTimeoutRef.current = setTimeout(() => {
      setClickCount(0);
    }, 2000);
  };

  return (
    <footer className="relative bg-vintage-darker border-t-2 border-vintage-accent/30 py-12 px-6">
      {/* Background Texture */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40' fill='%23d97706' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {navigationData.filter(item => item.path !== '/admin').map((item, index) => (
            <motion.button
              key={index}
              onClick={() => handleNavigation(item.path)}
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.95 }}
              className="group flex items-center gap-2 px-6 py-3 bg-vintage-dark/60 backdrop-blur-sm border border-vintage-accent/30 rounded-xl hover:border-vintage-accent/60 hover:bg-vintage-accent/10 transition-all duration-300"
            >
              <span className="text-2xl">{item.icon}</span>
              <span className="text-vintage-light font-serif font-bold group-hover:text-vintage-accent transition-colors duration-300">
                {item.label}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-vintage-accent/50 to-transparent mb-8" />

        {/* Info */}
        <div className="text-center space-y-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="text-vintage-light/70 text-sm"
          >
            Website thuyết trình về{' '}
            <span className="text-vintage-accent font-bold">
              Tập đoàn Kinh tế Nhà nước tại Việt Nam
            </span>
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-vintage-light/50 text-xs"
          >
            Môn: Kinh tế chính trị Mác - Lênin | MLN122
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            onClick={handleSecretClick}
            className="flex justify-center gap-2 pt-4 cursor-pointer select-none"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ 
                  scale: [1, 1.5, 1],
                  backgroundColor: i < clickCount ? '#d97706' : 'rgba(217, 119, 6, 0.5)'
                }}
                transition={{ 
                  scale: { duration: 2, repeat: Infinity, delay: i * 0.2 },
                  backgroundColor: { duration: 0.3 }
                }}
                className={`w-1.5 h-1.5 rounded-full ${i < clickCount ? 'bg-vintage-accent' : 'bg-vintage-accent/50'}`}
              />
            ))}
          </motion.div>

          <p className="text-vintage-accent/70 text-xs mt-4">
            © 2025 | Powered by React + Framer Motion
          </p>
        </div>

        {/* Scroll to Top Button */}
        <motion.button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.1, y: -5 }}
          whileTap={{ scale: 0.9 }}
          className="fixed bottom-8 right-8 w-14 h-14 bg-vintage-accent hover:bg-vintage-accent-light rounded-full shadow-lg shadow-vintage-accent/50 flex items-center justify-center group transition-colors duration-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <svg
            className="w-6 h-6 text-vintage-darker group-hover:animate-bounce"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;
