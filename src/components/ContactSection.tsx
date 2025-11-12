import { motion } from "motion/react";
import {
  Mail,
  MessageCircle,
  Instagram,
  Twitch,
  Video,
  ExternalLink,
  MapPin,
  Calendar,
} from "lucide-react";
import { contactSection } from "../config/siteConfig";

// Icon mapping - kopplar string-namn till ikoner
const iconMap: Record<string, any> = {
  Mail,
  MessageCircle,
  Instagram,
  Twitch,
  Video,
};

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 relative overflow-hidden" style={{ transform: 'translate3d(0, 0, 0)' }}>
      {/* Ultra-optimized background - no blur for 300fps */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-60">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-gradient-to-r from-purple-600/15 via-blue-600/15 to-green-600/15" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        {/* Compact header */}
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
              fontFamily: "Orbitron, sans-serif",
              textShadow: "0 0 20px rgba(168, 85, 247, 0.3)",
            }}
          >
            {contactSection.title}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              {contactSection.titleHighlight}
            </span>
          </h2>
          <p className="text-gray-400 md:text-lg max-w-2xl mx-auto">
            {contactSection.description}
          </p>
        </motion.div>

        {/* Centered, compact grid - Single animation */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4 mb-12"
        >
          {contactSection.contactMethods.map((method) => {
            const Icon = iconMap[method.icon];
            return (
              <a
                key={method.title}
                href={method.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`relative bg-gray-800/80 border ${method.borderColor} rounded-xl p-4 md:p-5 transition-all duration-300 hover:scale-105 hover:border-opacity-100 group`}
                style={{ transform: 'translate3d(0, 0, 0)' }}
              >
                <div className={`${method.bgColor} w-12 h-12 md:w-14 md:h-14 rounded-lg flex items-center justify-center mb-3 mx-auto transition-transform group-hover:scale-110`}>
                  <Icon className={method.color} size={24} strokeWidth={2.5} />
                </div>
                
                <h3 className="text-white text-sm md:text-base mb-1 text-center">
                  {method.title}
                </h3>
                <p className="text-gray-400 text-xs text-center truncate">
                  {method.value}
                </p>
                
                <div className="flex items-center justify-center gap-1 text-gray-500 text-xs mt-2 group-hover:text-purple-400 transition-colors">
                  <span>{contactSection.visitLinkText}</span>
                  <ExternalLink size={12} />
                </div>
              </a>
            );
          })}
        </motion.div>

        {/* Compact location section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto bg-gray-800/80 border border-gray-700 rounded-2xl p-6 md:p-8 hover:border-purple-500/50 transition-all"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl md:text-3xl text-white mb-4" style={{ fontFamily: "Orbitron, sans-serif" }}>
                {contactSection.locationSection.title}
              </h3>
              
              <div className="space-y-3">
                <div className="flex items-start gap-3 justify-center md:justify-start">
                  <MapPin className="text-green-400 mt-1 flex-shrink-0" size={20} />
                  <div className="text-left">
                    <p className="text-white">{contactSection.locationSection.address.line1}</p>
                    <p className="text-gray-400 text-sm">{contactSection.locationSection.address.line2}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 justify-center md:justify-start">
                  <Calendar className="text-blue-400 flex-shrink-0" size={20} />
                  <div className="text-left">
                    <p className="text-white">{contactSection.locationSection.dates.line1}</p>
                    <p className="text-gray-400 text-sm">{contactSection.locationSection.dates.line2}</p>
                  </div>
                </div>
              </div>
            </div>

            <a
              href={contactSection.locationSection.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-xl hover:from-green-400 hover:to-blue-400 transition-all shadow-lg"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              <MapPin size={20} />
              <span>{contactSection.locationSection.mapButtonText}</span>
              <ExternalLink size={16} />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}