import { useState, useEffect, memo, useMemo } from "react";
import { motion } from "motion/react";
import { Calendar, MapPin, Users, LogIn } from "lucide-react";
import { Button } from "./ui/button";
import { eventInfo, heroSection } from "../config/siteConfig";

// Memoized countdown component to prevent unnecessary re-renders
const CountdownTimer = memo(
   ({
      timeLeft,
   }: {
      timeLeft: {
         days: number;
         hours: number;
         minutes: number;
         seconds: number;
      };
   }) => {
      const items = useMemo(
         () => [
            { value: timeLeft.days, label: heroSection.countdownLabels.days },
            { value: timeLeft.hours, label: heroSection.countdownLabels.hours },
            {
               value: timeLeft.minutes,
               label: heroSection.countdownLabels.minutes,
            },
            {
               value: timeLeft.seconds,
               label: heroSection.countdownLabels.seconds,
            },
         ],
         [timeLeft.days, timeLeft.hours, timeLeft.minutes, timeLeft.seconds]
      );

      return (
         <div className="flex justify-center gap-2 md:gap-6">
            {items.map((item) => (
               <div
                  key={item.label}
                  className="bg-gray-800/70 border border-purple-500/30 rounded-lg p-3 md:p-6 min-w-[60px] md:min-w-[100px]"
                  style={{ boxShadow: "0 0 15px rgba(168, 85, 247, 0.15)" }}
               >
                  <div
                     className="text-2xl md:text-5xl text-green-400 mb-1 md:mb-2"
                     style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                     {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs md:text-sm text-gray-400">
                     {item.label}
                  </div>
               </div>
            ))}
         </div>
      );
   }
);

CountdownTimer.displayName = "CountdownTimer";

export function HeroSection() {
   const [timeLeft, setTimeLeft] = useState({
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
   });

   const [participantCount, setParticipantCount] = useState(0);

   // Load initial participant count from the Netlify function (fallback to localStorage). Poll for updates.
   useEffect(() => {
      const setFromLocal = () => {
         const registrations = JSON.parse(
            localStorage.getItem("lanRegistrations") || "[]"
         );
         setParticipantCount(registrations.length);
         eventInfo.currentParticipants = registrations.length;
      };

      const fetchCount = async () => {
         try {
            const res = await fetch("/.netlify/functions/register", {
               method: "GET",
            });
            if (res.ok) {
               const json = await res.json();
               const count = typeof json.count === "number" ? json.count : 0;
               // store a lightweight representation in localStorage so other tabs update
               localStorage.setItem(
                  "lanRegistrations",
                  JSON.stringify(new Array(count))
               );
               setParticipantCount(Math.min(count, eventInfo.maxParticipants));
               eventInfo.currentParticipants = Math.min(
                  count,
                  eventInfo.maxParticipants
               );
            } else {
               setFromLocal();
            }
         } catch (err) {
            setFromLocal();
         }
      };

      // initial
      fetchCount();

      // poll every 10s
      const interval = setInterval(fetchCount, 10000);

      // Listen for storage changes (other tabs)
      const handleStorageChange = () => {
         const updated = JSON.parse(
            localStorage.getItem("lanRegistrations") || "[]"
         );
         setParticipantCount(updated.length);
         eventInfo.currentParticipants = updated.length;
      };
      window.addEventListener("storage", handleStorageChange);

      return () => {
         clearInterval(interval);
         window.removeEventListener("storage", handleStorageChange);
      };
   }, []);

   useEffect(() => {
      const targetDate = new Date(eventInfo.startDate).getTime();

      const updateCountdown = () => {
         const now = new Date().getTime();
         const difference = targetDate - now;

         if (difference > 0) {
            const newTimeLeft = {
               days: Math.floor(difference / (1000 * 60 * 60 * 24)),
               hours: Math.floor(
                  (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
               ),
               minutes: Math.floor(
                  (difference % (1000 * 60 * 60)) / (1000 * 60)
               ),
               seconds: Math.floor((difference % (1000 * 60)) / 1000),
            };

            // Only update if values actually changed
            setTimeLeft((prev) => {
               if (
                  prev.days !== newTimeLeft.days ||
                  prev.hours !== newTimeLeft.hours ||
                  prev.minutes !== newTimeLeft.minutes ||
                  prev.seconds !== newTimeLeft.seconds
               ) {
                  return newTimeLeft;
               }
               return prev;
            });
         }
      };

      updateCountdown();
      const interval = setInterval(updateCountdown, 1000);
      return () => clearInterval(interval);
   }, []);

   const scrollToRegistration = () => {
      const element = document.querySelector("#registration");
      if (element) {
         element.scrollIntoView({ behavior: "smooth" });
      }
   };

   return (
      <section
         id="hero"
         className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
         style={{ transform: "translate3d(0, 0, 0)" }}
      >
         {/* Ultra-optimized static background - no blur for 300fps */}
         <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 left-1/4 w-80 md:w-96 h-80 md:h-96 bg-green-500/15 rounded-full opacity-50" />
            <div className="absolute bottom-1/4 right-1/4 w-80 md:w-96 h-80 md:h-96 bg-purple-500/15 rounded-full opacity-50" />
            <div className="absolute top-1/2 right-1/3 w-80 md:w-96 h-80 md:h-96 bg-blue-500/15 rounded-full opacity-30" />
         </div>

         <div className="container mx-auto px-4 relative z-10">
            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.6 }}
               className="text-center space-y-6 md:space-y-8 max-w-5xl mx-auto"
            >
               {/* Logo/Image */}
               <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="flex justify-center mb-4 md:mb-8"
               >
                  <img
                     src="RESPAWN_UF_LAN_med_neonljus.png"
                     alt=""
                     className="w-32 md:w-48"
                  />
               </motion.div>
               {/* Main Title */}
               <div>
                  <h1
                     className="text-4xl md:text-7xl text-white mb-4"
                     style={{
                        fontFamily: "Orbitron, sans-serif",
                        textShadow:
                           "0 0 20px rgba(34, 197, 94, 0.5), 0 0 40px rgba(34, 197, 94, 0.3)",
                     }}
                  >
                     {heroSection.title}
                     <span className="text-green-400">
                        {heroSection.titleHighlight}
                     </span>{" "}
                     {heroSection.titleSuffix}
                  </h1>
                  <div
                     className="text-xl md:text-4xl text-purple-400"
                     style={{
                        fontFamily: "Orbitron, sans-serif",
                        textShadow: "0 0 15px rgba(168, 85, 247, 0.5)",
                     }}
                  >
                     {heroSection.subtitle}
                  </div>
               </div>

               {/* Event Details */}
               <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6 text-gray-300">
                  <div className="flex items-center gap-2">
                     <Calendar className="text-green-400" size={20} />
                     <span className="text-sm md:text-lg">
                        {eventInfo.startDateDisplay}
                     </span>
                  </div>
                  <div className="flex items-center gap-2">
                     <MapPin className="text-blue-400" size={20} />
                     <span className="text-sm md:text-lg">
                        {eventInfo.venue}
                     </span>
                  </div>
                  <div className="flex items-center gap-2">
                     <Users className="text-purple-400" size={20} />
                     <span className="text-sm md:text-lg">
                        {eventInfo.totalSlots}
                     </span>
                  </div>
               </div>

               {/* Registrations Stats */}
               <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8 max-w-2xl mx-auto"
               >
                  <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 md:p-4">
                     <div className="flex items-center gap-2 mb-1">
                        <LogIn size={16} className="text-green-400" />
                        <span className="text-xs md:text-sm text-gray-400">
                           Anmälda
                        </span>
                     </div>
                     <div
                        className="text-xl md:text-2xl font-bold text-green-400"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                     >
                        {participantCount}
                     </div>
                  </div>
                  <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3 md:p-4">
                     <div className="flex items-center gap-2 mb-1">
                        <Users size={16} className="text-blue-400" />
                        <span className="text-xs md:text-sm text-gray-400">
                           Totalt
                        </span>
                     </div>
                     <div
                        className="text-xl md:text-2xl font-bold text-blue-400"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                     >
                        {eventInfo.maxParticipants}
                     </div>
                  </div>
                  <div className="bg-purple-500/10 border border-purple-500/30 rounded-lg p-3 md:p-4 col-span-2 md:col-span-1">
                     <div className="flex items-center gap-2 mb-1">
                        <Users size={16} className="text-purple-400" />
                        <span className="text-xs md:text-sm text-gray-400">
                           Lediga
                        </span>
                     </div>
                     <div
                        className="text-xl md:text-2xl font-bold text-purple-400"
                        style={{ fontFamily: "Orbitron, sans-serif" }}
                     >
                        {Math.max(
                           0,
                           eventInfo.maxParticipants - participantCount
                        )}
                     </div>
                  </div>
               </motion.div>

               {/* Countdown Timer */}
               <div className="mt-8 md:mt-12">
                  <p className="text-gray-400 mb-4 md:text-lg">
                     {heroSection.countdownText}
                  </p>
                  <CountdownTimer timeLeft={timeLeft} />
               </div>

               {/* CTA Button */}
               <div className="mt-8 md:mt-12">
                  <Button
                     onClick={scrollToRegistration}
                     className="bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-400 hover:via-blue-400 hover:to-purple-500 text-white px-6 md:px-8 py-5 md:py-6 text-base md:text-xl rounded-lg shadow-lg hover:shadow-green-500/50 transition-all duration-300"
                     style={{ fontFamily: "Orbitron, sans-serif" }}
                  >
                     {heroSection.ctaButton}
                  </Button>
               </div>
            </motion.div>
         </div>
      </section>
   );
}
