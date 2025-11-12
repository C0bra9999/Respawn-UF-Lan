import { motion } from 'motion/react';
import { Clock, MapPin, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { scheduleSection } from '../config/siteConfig';

// Icon mapping - kopplar string-namn till ikoner
const iconMap: Record<string, any> = {
  MapPin,
  Clock,
  CheckCircle2,
};

export function ScheduleSection() {
  return (
    <section id="schedule" className="py-16 md:py-24 relative" style={{ transform: 'translate3d(0, 0, 0)' }}>
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
            {scheduleSection.title} <span className="text-green-400">{scheduleSection.titleHighlight}</span>
          </h2>
        </motion.div>

        {/* Practical Info Cards - Single animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-12"
        >
          {scheduleSection.practicalInfo.map((info) => {
            const Icon = iconMap[info.icon];
            return (
              <div
                key={info.title}
                className="bg-gradient-to-br from-gray-800/80 to-gray-900/80 border border-purple-500/30 rounded-xl p-5 md:p-6 text-center"
                style={{ transform: 'translate3d(0, 0, 0)' }}
              >
                <Icon className="text-green-400 mx-auto mb-3" size={28} />
                <h3 className="text-gray-400 text-sm mb-2">{info.title}</h3>
                <p className="text-white md:text-lg">{info.value}</p>
              </div>
            );
          })}
        </motion.div>

        {/* Schedule Timeline - Single animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="space-y-6 mb-12"
        >
          {scheduleSection.schedule.map((day) => (
            <div
              key={day.day}
              className="bg-gray-800/70 border border-gray-700 rounded-xl p-5 md:p-6"
              style={{ transform: 'translate3d(0, 0, 0)' }}
            >
              <h3
                className="text-xl md:text-2xl text-white mb-4 md:mb-6"
                style={{ fontFamily: 'Orbitron, sans-serif' }}
              >
                {day.day}
              </h3>
              <div className="space-y-3">
                {day.events.map((event, eventIndex) => (
                  <div
                    key={eventIndex}
                    className="flex gap-3 md:gap-4 items-start hover:bg-gray-700/30 p-2 md:p-3 rounded-lg transition-colors"
                  >
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30 shrink-0 text-xs">
                      {event.time}
                    </Badge>
                    <div className="flex-1">
                      <h4 className="text-white text-sm md:text-base mb-1">{event.title}</h4>
                      <p className="text-gray-400 text-xs md:text-sm">{event.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Checklist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-500/30 rounded-xl p-6 md:p-8"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <h3
            className="text-xl md:text-2xl text-white mb-4 md:mb-6 text-center"
            style={{ fontFamily: 'Orbitron, sans-serif' }}
          >
            {scheduleSection.checklistTitle}<span className="text-purple-400">{scheduleSection.checklistTitleHighlight}</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {scheduleSection.checklist.map((item) => (
              <div
                key={item}
                className="flex items-center gap-2 md:gap-3 bg-gray-800/50 rounded-lg p-3"
              >
                <CheckCircle2 className="text-green-400 shrink-0" size={18} />
                <span className="text-gray-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}