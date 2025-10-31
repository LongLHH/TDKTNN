import { motion } from 'framer-motion';
import { useState } from 'react';
import { mindMapData } from '../data/content';

const MindMapSection = () => {
  const [selectedBranch, setSelectedBranch] = useState(null);

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-vintage-darker to-vintage-dark py-20 px-6">
      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-vintage-accent mb-4">
          Sơ Đồ Tư Duy
        </h2>
        <p className="text-lg text-vintage-light/70 max-w-3xl mx-auto">
          Khám phá các khía cạnh chi tiết thông qua ví dụ thực tế
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto">
        {/* Central Concept */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative mb-20"
        >
          <div className="absolute inset-0 bg-vintage-accent/30 blur-3xl rounded-full" />
          <div className="relative bg-gradient-to-br from-vintage-accent/30 to-vintage-accent-dark/30 backdrop-blur-sm border-4 border-vintage-accent rounded-3xl p-10 text-center max-w-2xl mx-auto">
            <div className="text-6xl mb-4">{mindMapData.mainConcept.icon}</div>
            <h3 className="text-3xl font-serif font-bold text-vintage-light mb-4">
              {mindMapData.mainConcept.title}
            </h3>
            <p className="text-lg text-vintage-light/80">
              {mindMapData.mainConcept.description}
            </p>
          </div>
        </motion.div>

        {/* Branches Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {mindMapData.branches.map((branch, index) => (
            <BranchCard
              key={branch.id}
              branch={branch}
              index={index}
              isSelected={selectedBranch === branch.id}
              onSelect={() => setSelectedBranch(selectedBranch === branch.id ? null : branch.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const BranchCard = ({ branch, index, isSelected, onSelect }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ scale: 1.03, y: -5 }}
      onClick={onSelect}
      className="relative cursor-pointer group"
    >
      {/* Glow Effect */}
      <div className={`absolute inset-0 bg-vintage-accent/20 blur-xl transition-all duration-500 rounded-2xl ${
        isSelected ? 'blur-2xl bg-vintage-accent/40' : 'group-hover:blur-2xl group-hover:bg-vintage-accent/30'
      }`} />

      {/* Card */}
      <div className={`relative bg-vintage-dark/80 backdrop-blur-sm border-2 rounded-2xl p-8 transition-all duration-300 ${
        isSelected 
          ? 'border-vintage-accent shadow-2xl shadow-vintage-accent/50' 
          : 'border-vintage-accent/30 group-hover:border-vintage-accent/60'
      }`}>
        {/* Icon */}
        <div className="text-5xl mb-4">{branch.icon}</div>

        {/* Title */}
        <h4 className="text-2xl font-serif font-bold text-vintage-accent mb-4">
          {branch.title}
        </h4>

        {/* Concept */}
        <div className="mb-4">
          <div className="inline-block px-3 py-1 bg-vintage-accent/20 rounded-lg mb-2">
            <span className="text-xs font-bold text-vintage-accent-light tracking-wider">
              KHÁI NIỆM
            </span>
          </div>
          <p className="text-vintage-light/90 leading-relaxed">
            {branch.concept}
          </p>
        </div>

        {/* Real Example - Expandable */}
        <motion.div
          initial={false}
          animate={{ height: isSelected ? 'auto' : 0, opacity: isSelected ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="overflow-hidden"
        >
          <div className="pt-4 border-t border-vintage-accent/20">
            <div className="inline-block px-3 py-1 bg-vintage-accent-light/20 rounded-lg mb-2">
              <span className="text-xs font-bold text-vintage-accent-light tracking-wider">
                VÍ DỤ THỰC TẾ
              </span>
            </div>
            <p className="text-vintage-light/80 leading-relaxed italic">
              "{branch.realExample}"
            </p>
          </div>
        </motion.div>

        {/* Click Indicator */}
        <div className="mt-4 text-center">
          <span className="text-xs text-vintage-light/50">
            {isSelected ? '▲ Thu gọn' : '▼ Xem ví dụ'}
          </span>
        </div>
      </div>

      {/* Connection Line (decorative) */}
      <div className="absolute -top-20 left-1/2 w-0.5 h-20 bg-gradient-to-b from-vintage-accent/50 to-transparent transform -translate-x-1/2 hidden md:block" />
    </motion.div>
  );
};

export default MindMapSection;
