import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { timelineData } from '../data/content';

const TimelineSection = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative bg-vintage-darker"
      style={{ minHeight: `${timelineData.length * 100}vh` }}
    >
      {/* Timeline Title */}
      <div className="sticky top-0 z-20 bg-gradient-to-b from-vintage-darker via-vintage-darker to-transparent py-12">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-serif font-bold text-center text-vintage-accent"
        >
          Dòng Thời Gian Phát Triển
        </motion.h2>
      </div>

      {/* Timeline Items */}
      <div className="relative">
        {timelineData.map((item, index) => (
          <TimelineItem
            key={item.id}
            item={item}
            index={index}
            totalItems={timelineData.length}
          />
        ))}
      </div>
    </section>
  );
};

const TimelineItem = ({ item, index, totalItems }) => {
  const itemRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.8, 1, 1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [100, 0, 0, -100]);

  return (
    <div
      ref={itemRef}
      className="relative min-h-screen flex items-center justify-center px-6"
    >
      {/* Timeline Line on the left */}
      <div className="absolute left-8 md:left-20 top-0 bottom-0 w-1 bg-gradient-to-b from-vintage-accent/50 via-vintage-accent to-vintage-accent/50">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="w-full h-full bg-vintage-accent origin-top"
        />
      </div>

      {/* Timeline Marker */}
      <motion.div
        style={{ scale }}
        className="absolute left-5 md:left-[4.5rem] w-8 h-8 bg-vintage-accent rounded-full border-4 border-vintage-darker shadow-lg"
        whileInView={{ scale: [0, 1.2, 1] }}
        transition={{ duration: 0.5 }}
      />

      {/* Content Card */}
      <motion.div
        style={{ opacity, scale, y }}
        className="relative w-full max-w-5xl ml-0 md:ml-32"
      >
        <div className="grid md:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <div className={`${index % 2 === 0 ? 'md:order-1' : 'md:order-2'} space-y-4`}>
            <motion.div
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="inline-block"
            >
              <span className="text-vintage-accent-light font-serif text-xl font-bold tracking-wider">
                {item.period}
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-3xl md:text-4xl font-serif font-bold text-vintage-light"
            >
              {item.title}
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg text-vintage-light/80 leading-relaxed"
            >
              {item.desc}
            </motion.p>
          </div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className={`${index % 2 === 0 ? 'md:order-2' : 'md:order-1'} relative group`}
          >
            <div className="absolute inset-0 bg-vintage-accent/20 blur-2xl group-hover:blur-3xl transition-all duration-500 rounded-lg" />
            <div className="relative overflow-hidden rounded-lg border-2 border-vintage-accent/30 shadow-2xl">
              <img
                src={item.imageUrl}
                alt={item.title}
                className="w-full h-64 md:h-80 object-cover transform group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-vintage-darker/80 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default TimelineSection;
