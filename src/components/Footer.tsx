import { motion } from 'motion/react';
import { Instagram, MessageCircle, Twitch, Video } from 'lucide-react';
import { footer } from '../config/siteConfig';

// Icon mapping - kopplar string-namn till ikoner
const iconMap: Record<string, any> = {
  Instagram,
  MessageCircle,
  Twitch,
  Video,
};

export function Footer() {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-8 md:py-12" style={{ transform: 'translate3d(0, 0, 0)' }}>
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-6 md:mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-2 mb-3">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 rounded-lg" />
              <span className="text-white text-xl md:text-2xl" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                {footer.brand.name}<span className="text-green-400">{footer.brand.nameHighlight}</span>
              </span>
            </div>
            <p className="text-gray-400 text-xs md:text-sm">
              {footer.brand.description}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white text-sm md:text-base mb-3 md:mb-4">{footer.quickLinksTitle}</h3>
            <ul className="space-y-2">
              {footer.quickLinks.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-gray-400 hover:text-green-400 transition-colors text-xs md:text-sm"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Event Info */}
          <div>
            <h3 className="text-white text-sm md:text-base mb-3 md:mb-4">{footer.eventInfoTitle}</h3>
            <ul className="space-y-2 text-xs md:text-sm text-gray-400">
              {footer.eventInfo.map((info, index) => (
                <li key={index}>{info}</li>
              ))}
            </ul>
            
            {/* Social Media Links */}
            <div className="mt-4 md:mt-6">
              <h4 className="text-white mb-2 md:mb-3 text-xs md:text-sm">{footer.followUsText}</h4>
              <div className="flex gap-3">
                {footer.socialLinks.map((social) => {
                  const Icon = iconMap[social.icon];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`text-gray-400 ${social.color} transition-colors`}
                      aria-label={social.label}
                    >
                      <Icon size={20} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center gap-3 md:gap-4">
          <p className="text-gray-400 text-xs md:text-sm text-center md:text-left">
            {footer.copyright}
          </p>
          <div className="flex gap-3 md:gap-4 text-xs md:text-sm text-gray-400">
            {footer.bottomLinks.map((link, index) => (
              <div key={index} className="flex gap-3 md:gap-4 items-center">
                {index > 0 && <span>|</span>}
                <button className="hover:text-green-400 transition-colors">{link.label}</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}