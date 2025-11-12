import { useState } from "react";
import { motion } from "motion/react";
import {
  Send,
  User,
  Mail,
  MessageSquare,
  CreditCard,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import { toast } from "sonner@2.0.3";
import { eventInfo, registrationSection } from "../config/siteConfig";

export function RegistrationSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    discord: "",
    selectedTournaments: [] as string[],
    paymentMethod: "swish",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleTournamentToggle = (tournamentId: string) => {
    setFormData((prev) => ({
      ...prev,
      selectedTournaments: prev.selectedTournaments.includes(
        tournamentId,
      )
        ? prev.selectedTournaments.filter(
            (id) => id !== tournamentId,
          )
        : [...prev.selectedTournaments, tournamentId],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      toast.error(registrationSection.messages.nameEmailRequired);
      return;
    }

    if (!formData.discord) {
      toast.error(registrationSection.messages.discordRequired);
      return;
    }

    if (formData.selectedTournaments.length === 0) {
      toast.error(registrationSection.messages.tournamentRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      // Get tournament names for display
      const tournamentNames = formData.selectedTournaments
        .map(
          (id) =>
            registrationSection.tournamentOptions.find((t) => t.id === id)?.name || id,
        )
        .join(", ");

      // Determine roles to assign
      const rolesToAssign = [eventInfo.discordRoles.allParticipants];
      if (formData.paymentMethod === "onsite") {
        rolesToAssign.push(eventInfo.discordRoles.onsitePayment);
      } else if (formData.paymentMethod === "swish") {
        rolesToAssign.push(eventInfo.discordRoles.swishPayment);
      }

      const discordEmbed = {
        content: `@here Ny anmälan mottagen! **Kom ihåg att bjuda in ${formData.discord} till Discord-servern!**`,
        embeds: [
          {
            title: "🎮 Ny LAN-anmälan!",
            color: 0x22c55e, // Green color
            fields: [
              {
                name: "👤 Namn",
                value: formData.name,
                inline: true,
              },
              {
                name: "📧 E-post",
                value: formData.email,
                inline: true,
              },
              {
                name: "💬 Discord",
                value: `**${formData.discord}**`,
                inline: true,
              },
              {
                name: "🏆 Turneringar",
                value: tournamentNames,
                inline: false,
              },
              {
                name: "💳 Betalningsmetod",
                value:
                  registrationSection.paymentMethods.find(
                    (m) => m.id === formData.paymentMethod,
                  )?.name || formData.paymentMethod,
                inline: true,
              },
              {
                name: "🏷️ Roller att tilldela",
                value: rolesToAssign.map(role => `• ${role}`).join("\n"),
                inline: false,
              },
              {
                name: "⚠️ ÅTGÄRD KRÄVS",
                value: `Bjud in användaren **${formData.discord}** till Discord-servern manuellt!`,
                inline: false,
              },
            ],
            timestamp: new Date().toISOString(),
            footer: {
              text: "Respawn UF LAN 2025 - Anmälningssystem",
            },
          },
        ],
      };

      await fetch(eventInfo.discordWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(discordEmbed),
      });

      console.log("Registration submitted:", formData);

      // Try to open Discord invite immediately
      const discordWindow = window.open(eventInfo.discordInviteUrl, "_blank");
      
      // Check if popup was blocked
      if (!discordWindow || discordWindow.closed || typeof discordWindow.closed === 'undefined') {
        // Popup was blocked - show message with clickable link
        toast.success(
          registrationSection.messages.successWithBlockedPopup,
          {
            description: registrationSection.messages.successBlockedDescription,
            action: {
              label: registrationSection.messages.discordButtonLabel,
              onClick: () => window.open(eventInfo.discordInviteUrl, "_blank"),
            },
            duration: 10000,
          }
        );
      } else {
        // Popup opened successfully
        toast.success(
          registrationSection.messages.successWithPopup,
          {
            description: registrationSection.messages.successDescription,
            duration: 5000,
          }
        );
      }

      // Reset form after a short delay
      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          discord: "",
          selectedTournaments: [],
          paymentMethod: "swish",
        });
      }, 500);
    } catch (error) {
      console.error("Error submitting registration:", error);
      toast.error(registrationSection.messages.error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="registration"
      className="py-16 md:py-24 relative"
      style={{ transform: 'translate3d(0, 0, 0)' }}
    >
      {/* Ultra-optimized background - no blur for 300fps */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-96 bg-green-600/8 opacity-60" />
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
              fontFamily: "Orbitron, sans-serif",
              textShadow: "0 0 20px rgba(34, 197, 94, 0.4)",
            }}
          >
            {registrationSection.title}<span className="text-green-400">{registrationSection.titleHighlight}</span>
          </h2>
          <p className="text-gray-400 md:text-lg max-w-3xl mx-auto">
            {registrationSection.description}
          </p>
        </motion.div>

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto bg-gray-800/70 border border-gray-700 rounded-xl p-6 md:p-8"
          style={{ transform: 'translate3d(0, 0, 0)' }}
        >
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name */}
            <div>
              <Label
                htmlFor="name"
                className="text-gray-300 mb-2 flex items-center gap-2"
              >
                <User size={16} className="text-green-400" />
                {registrationSection.form.nameLabel} *
              </Label>
              <Input
                id="name"
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="bg-gray-900/50 border-gray-600 text-white focus:border-green-400"
                placeholder={registrationSection.form.namePlaceholder}
                required
              />
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="text-gray-300 mb-2 flex items-center gap-2"
              >
                <Mail size={16} className="text-blue-400" />
                {registrationSection.form.emailLabel} *
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    email: e.target.value,
                  })
                }
                className="bg-gray-900/50 border-gray-600 text-white focus:border-green-400"
                placeholder={registrationSection.form.emailPlaceholder}
                required
              />
            </div>

            {/* Discord */}
            <div>
              <Label
                htmlFor="discord"
                className="text-gray-300 mb-2 flex items-center gap-2"
              >
                <MessageSquare
                  size={16}
                  className="text-purple-400"
                />
                {registrationSection.form.discordLabel} *
              </Label>
              <Input
                id="discord"
                type="text"
                value={formData.discord}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    discord: e.target.value,
                  })
                }
                className="bg-gray-900/50 border-gray-600 text-white focus:border-green-400"
                placeholder={registrationSection.form.discordPlaceholder}
                required
              />
            </div>

            {/* Tournaments */}
            <div>
              <Label className="text-gray-300 mb-3 block">
                {registrationSection.form.tournamentsLabel} *
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {registrationSection.tournamentOptions.map((tournament) => (
                  <div
                    key={tournament.id}
                    className="flex items-center space-x-3 bg-gray-900/50 border border-gray-600 rounded-lg p-3 hover:border-green-400/50 transition-colors"
                  >
                    <Checkbox
                      id={tournament.id}
                      checked={formData.selectedTournaments.includes(
                        tournament.id,
                      )}
                      onCheckedChange={() =>
                        handleTournamentToggle(tournament.id)
                      }
                    />
                    <Label
                      htmlFor={tournament.id}
                      className="text-gray-300 cursor-pointer flex-1 text-sm"
                    >
                      {tournament.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <Label className="text-gray-300 mb-3 flex items-center gap-2">
                <CreditCard
                  size={16}
                  className="text-green-400"
                />
                {registrationSection.form.paymentMethodLabel} *
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {registrationSection.paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    type="button"
                    onClick={() =>
                      setFormData({
                        ...formData,
                        paymentMethod: method.id,
                      })
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      formData.paymentMethod === method.id
                        ? "border-green-400 bg-green-400/10 text-green-400"
                        : "border-gray-600 bg-gray-900/50 text-gray-300 hover:border-gray-500"
                    }`}
                  >
                    {method.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Discord Info Box */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <MessageSquare className="text-blue-400 mt-0.5 flex-shrink-0" size={20} />
                <div className="text-sm">
                  <p className="text-blue-300 mb-1">
                    <strong>{registrationSection.discordInfo.title}</strong>
                  </p>
                  <p className="text-gray-400">
                    {registrationSection.discordInfo.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-600 hover:from-green-400 hover:via-blue-400 hover:to-purple-500 text-white py-5 md:py-6 text-base md:text-lg disabled:opacity-50"
              style={{ fontFamily: "Orbitron, sans-serif" }}
            >
              {isSubmitting ? (
                registrationSection.submitButtonLoading
              ) : (
                <>
                  <Send size={20} className="mr-2" />
                  {registrationSection.submitButton}
                </>
              )}
            </Button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}