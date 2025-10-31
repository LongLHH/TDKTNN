import { motion } from 'framer-motion';
import { useState } from 'react';
import { scenariosData } from '../data/content';

const ScenariosSection = () => {
  const [activeScenario, setActiveScenario] = useState('scenario1');
  const scenarios = Object.values(scenariosData);

  return (
    <section className="relative min-h-screen bg-vintage-darker py-20 px-6">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-vintage-accent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-vintage-accent-light rounded-full blur-3xl" />
      </div>

      {/* Section Title */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-4xl md:text-5xl font-serif font-bold text-vintage-accent mb-4">
          Kịch Bản Thực Tế
        </h2>
        <p className="text-lg text-vintage-light/70 max-w-3xl mx-auto">
          Phân tích các tình huống cụ thể và ứng dụng thực tiễn
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Scenario Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {scenarios.map((scenario) => (
            <motion.button
              key={scenario.id}
              onClick={() => setActiveScenario(scenario.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-xl font-serif font-bold transition-all duration-300 ${
                activeScenario === scenario.id
                  ? 'bg-vintage-accent text-vintage-darker shadow-lg shadow-vintage-accent/50'
                  : 'bg-vintage-dark/60 text-vintage-light border border-vintage-accent/30 hover:border-vintage-accent/60'
              }`}
            >
              <span className="mr-2">{scenario.icon}</span>
              {scenario.name}
            </motion.button>
          ))}
        </div>

        {/* Active Scenario Content */}
        {scenarios.map((scenario) => (
          activeScenario === scenario.id && (
            <ScenarioContent key={scenario.id} scenario={scenario} />
          )
        ))}
      </div>
    </section>
  );
};

const ScenarioContent = ({ scenario }) => {
  const aspects = Object.entries(scenario.aspects);

  return (
    <motion.div
      key={scenario.id}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}
      className="space-y-8"
    >
      {/* Scenario Header */}
      <div className="relative">
        <div className="absolute inset-0 bg-vintage-accent/20 blur-2xl rounded-2xl" />
        <div className="relative bg-gradient-to-br from-vintage-dark/80 to-vintage-medium/80 backdrop-blur-sm border-2 border-vintage-accent/40 rounded-2xl p-8 text-center">
          <div className="text-6xl mb-4">{scenario.icon}</div>
          <h3 className="text-3xl font-serif font-bold text-vintage-accent mb-4">
            {scenario.name}
          </h3>
          <p className="text-lg text-vintage-light/80 max-w-2xl mx-auto leading-relaxed">
            {scenario.description}
          </p>
        </div>
      </div>

      {/* Aspects Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {aspects.map(([key, aspect], index) => (
          <motion.div
            key={key}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-vintage-accent/10 blur-xl group-hover:blur-2xl group-hover:bg-vintage-accent/20 transition-all duration-300 rounded-xl" />
            <div className="relative bg-vintage-dark/70 backdrop-blur-sm border border-vintage-accent/30 rounded-xl p-6 group-hover:border-vintage-accent/60 transition-all duration-300 h-full">
              {/* Aspect Number */}
              <div className="inline-flex items-center justify-center w-10 h-10 bg-vintage-accent/20 rounded-full mb-4">
                <span className="text-vintage-accent font-bold">{index + 1}</span>
              </div>

              {/* Aspect Title */}
              <h4 className="text-xl font-serif font-bold text-vintage-accent mb-3">
                {aspect.title}
              </h4>

              {/* Aspect Content */}
              <p className="text-vintage-light/80 leading-relaxed">
                {aspect.content}
              </p>

              {/* Decorative Corner */}
              <div className="absolute top-3 right-3 w-12 h-12 border-t-2 border-r-2 border-vintage-accent/20 rounded-tr-xl" />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center gap-2 pt-4"
      >
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              scale: [1, 1.5, 1],
              opacity: [0.5, 1, 0.5]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              delay: i * 0.2 
            }}
            className="w-2 h-2 bg-vintage-accent rounded-full"
          />
        ))}
      </motion.div>
    </motion.div>
  );
};

export default ScenariosSection;
