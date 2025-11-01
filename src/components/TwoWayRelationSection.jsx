import { motion } from 'framer-motion';
import { conceptAData, conceptBData, exampleData } from '../data/content';

const TwoWayRelationSection = () => {
  return (
    <section id="analysis" className="relative min-h-screen py-20 px-6" style={{
      background: `linear-gradient(to bottom, #0f766e 0%, #059669 50%, #10b981 100%)`
    }}>
      {/* Three Column Layout */}
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 items-stretch">
          {/* Left Column - Concept A */}
          <ConceptColumn data={conceptAData} side="left" />

          {/* Middle Column - Interaction */}
          <InteractionColumn />

          {/* Right Column - Concept B */}
          <ConceptColumn data={conceptBData} side="right" />
        </div>

        {/* Example Section */}
        <ExampleSection />
      </div>
    </section>
  );
};

const ConceptColumn = ({ data, side }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'left' ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-6"
    >
      {/* Column Header */}
      <div className="text-center bg-gradient-to-br from-vintage-accent/20 to-vintage-accent-dark/20 backdrop-blur-sm border-2 border-vintage-accent/30 rounded-xl p-6">
        <h3 className="text-2xl font-serif font-bold text-vintage-accent mb-2">
          {data.title}
        </h3>
        <p className="text-sm text-vintage-light/70">{data.subtitle}</p>
      </div>

      {/* Items */}
      <div className="space-y-4">
        {data.items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group cursor-pointer"
          >
            <div className="absolute inset-0 bg-vintage-accent/10 blur-xl group-hover:blur-2xl group-hover:bg-vintage-accent/20 transition-all duration-300 rounded-lg" />
            <div className="relative bg-vintage-dark/80 backdrop-blur-sm border border-vintage-accent/20 rounded-lg p-5 hover:border-vintage-accent/50 transition-all duration-300 h-full">
              <div className="flex items-start gap-3">
                <span className="text-3xl flex-shrink-0">{item.icon}</span>
                <div className="flex-1">
                  <h4 className="text-lg font-serif font-bold text-vintage-light mb-2">
                    {item.title}
                  </h4>
                  <p className="text-sm text-vintage-light/70 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const InteractionColumn = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="flex flex-col items-center justify-center space-y-8"
    >
      {/* Gear Animation */}
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="w-24 h-24"
        >
          <svg viewBox="0 0 100 100" className="text-vintage-accent">
            <path
              fill="currentColor"
              d="M50,10 L55,20 L65,15 L68,25 L78,24 L77,34 L87,37 L82,46 L90,52 L82,58 L87,67 L77,70 L78,80 L68,79 L65,89 L55,84 L50,94 L45,84 L35,89 L32,79 L22,80 L23,70 L13,67 L18,58 L10,52 L18,46 L13,37 L23,34 L22,24 L32,25 L35,15 L45,20 Z"
            />
          </svg>
        </motion.div>
      </div>

      {/* Double Arrow */}
      <div className="flex flex-col items-center gap-4">
        <motion.svg
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-12 h-12 text-vintage-accent-light"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11l5-5m0 0l5 5m-5-5v12" />
        </motion.svg>

        <div className="text-center px-4 py-2 bg-vintage-accent/20 rounded-lg">
          <span className="text-vintage-light font-serif font-bold text-sm tracking-wider">
            TƯƠNG TÁC
          </span>
        </div>

        <motion.svg
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-12 h-12 text-vintage-accent-light"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 13l-5 5m0 0l-5-5m5 5V6" />
        </motion.svg>
      </div>

      {/* Decorative Elements */}
      <div className="space-y-2 text-center">
        <div className="text-xs text-vintage-light/50 font-serif">Ảnh hưởng lẫn nhau</div>
        <div className="flex gap-2 justify-center">
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              animate={{ scale: [1, 1.5, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              className="w-1.5 h-1.5 bg-vintage-accent rounded-full"
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ExampleSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.4 }}
      className="mt-20 grid md:grid-cols-2 gap-8"
    >
      {/* Left Example */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-br from-vintage-accent/20 to-transparent blur-xl group-hover:blur-2xl transition-all duration-500 rounded-xl" />
        <div className="relative bg-vintage-dark/60 backdrop-blur-sm border-2 border-vintage-accent/30 rounded-xl p-8 hover:border-vintage-accent/50 transition-all duration-300">
          <h4 className="text-2xl font-serif font-bold text-vintage-accent mb-4">
            {exampleData.left.title}
          </h4>
          <p className="text-vintage-light/80 mb-6 leading-relaxed">
            {exampleData.left.description}
          </p>
          <div className="space-y-2">
            {exampleData.left.impacts.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-vintage-light/70 flex items-start gap-2"
              >
                <span className="text-vintage-accent">→</span>
                <span>{impact}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Example */}
      <div className="relative group">
        <div className="absolute inset-0 bg-gradient-to-bl from-vintage-accent/20 to-transparent blur-xl group-hover:blur-2xl transition-all duration-500 rounded-xl" />
        <div className="relative bg-vintage-dark/60 backdrop-blur-sm border-2 border-vintage-accent/30 rounded-xl p-8 hover:border-vintage-accent/50 transition-all duration-300">
          <h4 className="text-2xl font-serif font-bold text-vintage-accent mb-4">
            {exampleData.right.title}
          </h4>
          <p className="text-vintage-light/80 mb-6 leading-relaxed">
            {exampleData.right.description}
          </p>
          <div className="space-y-2">
            {exampleData.right.impacts.map((impact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-vintage-light/70 flex items-start gap-2"
              >
                <span className="text-vintage-accent">←</span>
                <span>{impact}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TwoWayRelationSection;
