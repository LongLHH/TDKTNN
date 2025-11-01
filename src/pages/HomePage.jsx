import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import IntroSection from '../components/IntroSection';
import TimelineSection from '../components/TimelineSection';
import SolutionSection from '../components/SolutionSection';
import FlipCardSection from '../components/FlipCardSection';
import ScratchCardsSection from '../components/ScratchCardsSection';
import DragDropSection from '../components/DragDropSection';
import ConnectingDotsSection from '../components/ConnectingDotsSection';
import MindMapSection from '../components/MindMapSection';
import Footer from '../components/Footer';
import TwoSideOfTDKTNN from '../components/TwoSideOfTDKTNN';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full relative">
      {/* Floating Navigation Buttons */}
      <motion.div 
        className="fixed top-6 right-6 z-50 flex flex-col gap-3"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        <motion.button
          onClick={() => navigate('/quiz')}
          className="px-6 py-3 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg backdrop-blur-sm border border-purple-400/30 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>🎯</span>
          <span>Tham gia Quiz</span>
        </motion.button>
        
        <motion.button
          onClick={() => navigate('/ai-report')}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg backdrop-blur-sm border border-indigo-400/30 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>🤖</span>
          <span>AI Report</span>
        </motion.button>

        <motion.button
          onClick={() => navigate('/admin')}
          className="px-6 py-3 bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-xl shadow-lg backdrop-blur-sm border border-orange-400/30 transition-all flex items-center gap-2"
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>👨‍💼</span>
          <span>Admin Panel</span>
        </motion.button>
      </motion.div>

      {/* Sections theo thứ tự logic với fade transitions */}
      <div className="relative">
        <IntroSection />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-slate-900 pointer-events-none z-10" />
      </div>

      <div className="relative">
        <DragDropSection />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-indigo-900 pointer-events-none z-10" />
      </div>

      <div className="relative">
        <TimelineSection />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-slate-900 pointer-events-none z-10" />
      </div>

      {/* 2 mặt của TDKTNN */}
      <div className="relative w-full">
        <TwoSideOfTDKTNN />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-purple-900 pointer-events-none z-10" />
      </div>

      <SolutionSection />

      <Footer />
    </div>
  );
};

export default HomePage;
