import { motion } from 'motion/react';
import { Users, Award, FileText } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { tournamentsSection } from '../config/siteConfig';

export function TournamentsSection() {
  return (
    <section id="tournaments" className="py-16 md:py-24 relative" style={{ transform: 'translate3d(0, 0, 0)' }}>
      {/* Ultra-optimized background - no blur for 300fps */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-purple-600/8 opacity-60" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
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
              textShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
            }}
          >
            {tournamentsSection.title}<span className="text-purple-400">{tournamentsSection.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 md:text-lg max-w-3xl mx-auto">
            {tournamentsSection.description}
          </p>
        </motion.div>

        {/* Tournaments Grid - Single animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-8"
        >
          {tournamentsSection.tournaments.map((tournament) => (
            <div
              key={tournament.name}
              className="bg-gray-800/70 border border-gray-700 rounded-xl p-5 md:p-6 hover:border-purple-500/50 transition-all duration-300 group"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-white text-xl md:text-2xl mb-2">{tournament.name}</h3>
                  <p className="text-gray-400 text-sm">{tournament.description}</p>
                </div>
                <div
                  className={`w-10 h-10 md:w-12 md:h-12 rounded-lg bg-gradient-to-br ${tournament.color} flex items-center justify-center shadow-lg transition-all`}
                >
                  <Award className="text-white" size={20} />
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <Users size={14} className="mr-1" />
                  {tournament.format}
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  {tournament.slots}
                </Badge>
                <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                  <Award size={14} className="mr-1" />
                  {tournament.prize}
                </Badge>
              </div>

              <div className="border-t border-gray-700 pt-4">
                <ul className="text-gray-400 text-sm space-y-2">
                  {tournament.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>

        {/* Rules Button */}
        <div className="text-center">
          <Button
            variant="outline"
            className="border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:text-purple-300"
          >
            <FileText size={18} className="mr-2" />
            {tournamentsSection.rulesButtonText}
          </Button>
        </div>
      </div>
    </section>
  );
}