import { motion } from 'motion/react';
import { Monitor, Trophy, Pizza, Heart } from 'lucide-react';
import { infoSection } from '../config/siteConfig';

// Icon mapping - kopplar string-namn till ikoner
const iconMap: Record<string, any> = {
  Monitor,
  Trophy,
  Pizza,
  Heart,
};

export function InfoSection() {
  return (
    <section id="info" className="py-16 md:py-24 relative" style={{ transform: 'translate3d(0, 0, 0)' }}>
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2
            className="text-3xl md:text-5xl text-white mb-4"
            style={{
              fontFamily: 'Orbitron, sans-serif',
              textShadow: '0 0 20px rgba(34, 197, 94, 0.4)',
            }}
          >
            {infoSection.title} <span className="text-green-400">{infoSection.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 md:text-lg max-w-3xl mx-auto">
            {infoSection.description}
          </p>
        </motion.div>

        {/* Features Grid - Single animation for all items */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {infoSection.features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <div
                key={feature.title}
                className="bg-gray-800/70 border border-gray-700 rounded-xl p-5 md:p-6 hover:border-purple-500/50 transition-all duration-300"
                style={{ transform: 'translate3d(0, 0, 0)' }}
              >
                <div className={`${feature.bgColor} w-14 h-14 md:w-16 md:h-16 rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className={feature.color} size={28} />
                </div>
                <h3 className="text-white text-lg md:text-xl mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}