import { Toaster } from "./components/ui/sonner";
import { Navigation } from "./components/Navigation";
import { HeroSection } from "./components/HeroSection";
import { InfoSection } from "./components/InfoSection";
import { TournamentsSection } from "./components/TournamentsSection";
import { ScheduleSection } from "./components/ScheduleSection";
import { RegistrationSection } from "./components/RegistrationSection";
import { ContactSection } from "./components/ContactSection";
import { Footer } from "./components/Footer";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      <Navigation />
      <main>
        <HeroSection />
        <InfoSection />
        <TournamentsSection />
        <ScheduleSection />
        <RegistrationSection />
        <ContactSection />
      </main>
      <Footer />
      <Toaster
        position="top-right"
        theme="dark"
        toastOptions={{
          style: {
            background: "#1f2937",
            border: "1px solid rgba(168, 85, 247, 0.3)",
            color: "#fff",
          },
        }}
      />
    </div>
  );
}