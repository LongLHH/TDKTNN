import { motion } from 'framer-motion';
import { summaryData, significanceData, finalSectionData } from '../data/content';

const SummarySection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-b from-vintage-dark to-vintage-darker py-20 px-6">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 0l30 30-30 30L0 30z' fill='%23d97706' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl md:text-6xl font-serif font-bold text-vintage-accent mb-4">
            Tổng Hợp & Ý Nghĩa
          </h2>
          <div className="w-24 h-1 bg-vintage-accent mx-auto rounded-full" />
        </motion.div>

        {/* Split Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          {/* Summary (Left) */}
          <SummaryPanel data={summaryData} />

          {/* Significance (Right) */}
          <SignificancePanel data={significanceData} />
        </div>

        {/* Final Quote Section */}
        <FinalQuoteSection data={finalSectionData} />
      </div>
    </section>
  );
};

const SummaryPanel = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{data.icon}</span>
        <h3 className="text-3xl font-serif font-bold text-vintage-accent">
          {data.title}
        </h3>
      </div>

      {/* Description */}
      <div className="relative">
        <div className="absolute inset-0 bg-vintage-accent/10 blur-xl rounded-xl" />
        <div className="relative bg-vintage-dark/60 backdrop-blur-sm border-2 border-vintage-accent/30 rounded-xl p-6">
          <p className="text-lg text-vintage-light/90 leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* Key Points */}
      <div className="space-y-4">
        {data.keyPoints.map((point, index) => (
          <motion.div
            key={point.id}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, x: 10 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-vintage-accent/5 blur-lg group-hover:blur-xl group-hover:bg-vintage-accent/10 transition-all duration-300 rounded-lg" />
            <div className="relative bg-vintage-medium/40 backdrop-blur-sm border border-vintage-accent/20 rounded-lg p-5 group-hover:border-vintage-accent/40 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{point.icon}</span>
                <div className="flex-1">
                  <h4 className="text-lg font-serif font-bold text-vintage-accent mb-2">
                    {point.title}
                  </h4>
                  <p className="text-vintage-light/80 leading-relaxed">
                    {point.description}
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

const SignificancePanel = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-8"
    >
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <span className="text-5xl">{data.icon}</span>
        <h3 className="text-3xl font-serif font-bold text-vintage-accent">
          {data.title}
        </h3>
      </div>

      {/* Description */}
      <div className="relative">
        <div className="absolute inset-0 bg-vintage-accent-light/10 blur-xl rounded-xl" />
        <div className="relative bg-vintage-dark/60 backdrop-blur-sm border-2 border-vintage-accent-light/30 rounded-xl p-6">
          <p className="text-lg text-vintage-light/90 leading-relaxed">
            {data.description}
          </p>
        </div>
      </div>

      {/* Applications */}
      <div className="space-y-4">
        {data.applications.map((app, index) => (
          <motion.div
            key={app.id}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.03, x: -10 }}
            className="relative group"
          >
            <div className="absolute inset-0 bg-vintage-accent-light/5 blur-lg group-hover:blur-xl group-hover:bg-vintage-accent-light/10 transition-all duration-300 rounded-lg" />
            <div className="relative bg-vintage-medium/40 backdrop-blur-sm border border-vintage-accent-light/20 rounded-lg p-5 group-hover:border-vintage-accent-light/40 transition-all duration-300">
              <div className="flex items-start gap-4">
                <span className="text-3xl flex-shrink-0">{app.icon}</span>
                <div className="flex-1">
                  <h4 className="text-lg font-serif font-bold text-vintage-accent-light mb-2">
                    {app.title}
                  </h4>
                  <p className="text-vintage-light/80 leading-relaxed">
                    {app.description}
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

const FinalQuoteSection = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.3 }}
      className="space-y-12"
    >
      {/* Quote Box */}
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-vintage-accent/20 via-vintage-accent-light/20 to-vintage-accent/20 blur-2xl" />
        <div className="relative bg-vintage-darker/80 backdrop-blur-sm border-4 border-vintage-accent/40 rounded-3xl p-12 text-center">
          {/* Quote Marks */}
          <div className="absolute top-6 left-6 text-6xl text-vintage-accent/30 font-serif">"</div>
          <div className="absolute bottom-6 right-6 text-6xl text-vintage-accent/30 font-serif">"</div>

          {/* Quote Text */}
          <blockquote className="text-2xl md:text-3xl font-serif italic text-vintage-light leading-relaxed mb-6 relative z-10">
            {data.quote}
          </blockquote>

          {/* Author */}
          <p className="text-lg text-vintage-accent font-bold mb-4">
            — {data.author}
          </p>

          {/* Context */}
          <p className="text-vintage-light/70 max-w-2xl mx-auto leading-relaxed">
            {data.context}
          </p>
        </div>
      </div>

      {/* Final Question */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        whileHover={{ scale: 1.02 }}
        className="relative cursor-pointer group"
      >
        <div className="absolute inset-0 bg-vintage-accent/30 blur-2xl group-hover:blur-3xl transition-all duration-500 rounded-2xl" />
        <div className="relative bg-gradient-to-br from-vintage-accent/20 to-vintage-accent-dark/20 backdrop-blur-sm border-2 border-vintage-accent rounded-2xl p-10 text-center">
          <div className="inline-block px-4 py-2 bg-vintage-accent/30 rounded-lg mb-6">
            <span className="text-sm font-bold text-vintage-light tracking-wider">
              CÂU HỎI MỞ
            </span>
          </div>
          <p className="text-2xl md:text-3xl font-serif font-bold text-vintage-light leading-relaxed">
            {data.finalQuestion}
          </p>
          <div className="mt-6 flex justify-center gap-2">
            {[...Array(7)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.1 }}
                className="w-1.5 h-1.5 bg-vintage-accent rounded-full"
              />
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default SummarySection;
