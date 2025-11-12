// ============================================
// RESPAWN UF LAN 2025 - CENTRAL KONFIGURATION
// ============================================
// Denna fil innehåller ALL information som visas på webbsidan.
// Ändra värden här för att uppdatera innehållet överallt på sidan.

// ============================================
// GRUNDLÄGGANDE EVENTINFORMATION
// ============================================
export const eventInfo = {
  // Evenemangets namn och år
  name: "RESPAWNUF LAN",
  year: "2025",

  // Datum och tider
  startDate: "2025-11-21T18:00:00", // Format: YYYY-MM-DD HH:MM:SS (används för countdown)
  startDateDisplay: "21–23 November 2025", // Hur datumet visas på sidan
  startTime: "18:00", // Starttid som visas
  endTime: "15:00", // Sluttid som visas
  startDay: "Fredag",
  endDay: "Söndag",

  // Plats
  venue: "Nti gymnasiet, Sundsvall",
  venueShort: "NTI Gymnasiet, Sundsvall",
  address: "Kyrkogatan 21, 852 32 Sundsvall",
  mapsUrl:
    "https://www.bing.com/maps/search?name=NTI+Gymnasiet+Sundsvall&trfc=&mepi=0~~Embedded~LargeMapLink&FORM=MPSRPL&style=r&q=NTI+Gymnasiet+Sundsvall&ss=id.ypid%3AYN7995x501557885&ppois=62.39052200317383_17.305404663085938_NTI+Gymnasiet+Sundsvall&cp=62.390522~17.305405&lvl=16",

  // Pris och platser
  price: "75 kr per deltagare",
  totalSlots: "100+ antal platser",

  // Kontaktinformation
  email: "respawnuf@gmail.com",

  // Discord-integration
  discordInviteUrl: "https://discord.gg/VuCsVZnSbM",
  discordWebhookUrl:
    "https://discord.com/api/webhooks/1418129642354905180/qKNdstxASbVcxFM2f_-B5HgG3JrxJc6yGAYtSPdtxTZZdiOVsEI_6SrI8emMOyfww-OQ",

  // Roller som tilldelas i Discord baserat på betalningsmetod
  discordRoles: {
    allParticipants: "Anmäld till lan", // Roll som alla får
    swishPayment: "Swish", // Roll för Swish-betalare
    onsitePayment: "Betallar på plats", // Roll för de som betalar på plats
  },
};

// ============================================
// SOCIALA MEDIER
// ============================================
export const socialMedia = {
  instagram: {
    handle: "@respawnuf",
    url: "https://www.instagram.com/respawnuf/",
  },
  discord: {
    handle: "discord.gg/VuCsVZnSbM",
    url: "https://discord.gg/VuCsVZnSbM",
  },
  twitch: {
    handle: "@respawnuf",
    url: "https://www.twitch.tv/respawnuf",
  },
  tiktok: {
    handle: "@respawn.uf.2025",
    url: "https://www.tiktok.com/@respawn.uf.2025?is_from_webapp=1&sender_device=pc",
  },
};

// ============================================
// NAVIGATION (Menyalternativ)
// ============================================
export const navigation = [
  { label: "Hem", href: "#hero" },
  { label: "Info", href: "#info" },
  { label: "Turneringar", href: "#tournaments" },
  { label: "Schema", href: "#schedule" },
  { label: "Anmälan", href: "#registration" },
  { label: "Kontakt", href: "#contact" },
];

// ============================================
// HERO-SEKTION (Första sidan besökaren ser)
// ============================================
export const heroSection = {
  // Huvudrubrik
  title: "RESPAWN",
  titleHighlight: "UF", // Den gröna texten
  titleSuffix: "LAN",

  // Underrubrik med år
  subtitle: "2025",

  // Information under huvudrubriken
  eventDetails: [
    {
      icon: "Calendar",
      text: eventInfo.startDateDisplay,
    },
    {
      icon: "MapPin",
      text: eventInfo.venue,
    },
    {
      icon: "Users",
      text: eventInfo.totalSlots,
    },
  ],

  // Countdown-timer text
  countdownText: "LAN startar om:",
  countdownLabels: {
    days: "Dagar",
    hours: "Timmar",
    minutes: "Minuter",
    seconds: "Sekunder",
  },

  // Call-to-action knapp
  ctaButton: "Anmäl dig nu",
};

// ============================================
// INFO-SEKTION (Om LAN:et)
// ============================================
export const infoSection = {
  // Rubrik och beskrivning
  title: "Om",
  titleHighlight: "LAN:et",
  description:
    "Ta med datorn och spela hela natten! Sundsvalls största LAN med turneringar, priser och en fantastisk community.",

  // Funktioner/fördelar med att delta
  features: [
    {
      icon: "Monitor",
      title: "Eget rigg-bord",
      description:
        "Dedikerat bord med plats för ditt setup, skärm och tillbehör",
      color: "text-green-400",
      bgColor: "bg-green-500/10",
    },
    {
      icon: "Trophy",
      title: "Turneringar & priser",
      description:
        "Tävla i CS2, Marvel Rivals, Valorant och Clash Royal",
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: "Pizza",
      title: "Mat & dryck",
      description:
        "Pizza, snacks och energidryck finns att köpa på plats",
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: "Heart",
      title: "Gemenskap & gaming",
      description:
        "Träffa andra gamers och bygg nya vänskap under hela helgen",
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
    },
  ],
};

// ============================================
// TURNERINGAR (Spel och tävlingar)
// ============================================
export const tournamentsSection = {
  // Rubrik och beskrivning
  title: "Turneringar",
  titleHighlight: ".",
  description:
    "Tävla i dina favoritspel och vinn fantastiska priser!",

  // Lista över turneringar
  tournaments: [
    {
      id: "cs2",
      name: "Counter-Strike 2",
      format: "2v2",
      prize: "100,0 kr",
      slots: "16 lag",
      color: "from-orange-500 to-red-500", // Gradient-färger
      description:
        "Klassisk Wingman 2v2 tävling med best-of-3 playoff",
      features: [
        "✓ Gruppspel följt av single elimination",
        "✓ Admins och anti-cheat",
        "✓ Live kommentator för finalen",
      ],
    },
    {
      id: "valorant",
      name: "Valorant",
      format: "5v5",
      prize: "50,0 kr",
      slots: "16 lag",
      color: "from-red-500 to-pink-500",
      description: "Tactical shooter med agent bans",
      features: [
        "✓ Gruppspel följt av single elimination",
        "✓ Admins och anti-cheat",
        "✓ Live kommentator för finalen",
      ],
    },
    {
      id: "clashroyale",
      name: "Clash Royal",
      format: "1v1",
      prize: "grattis sak från kaffet",
      slots: "32 slots",
      color: "from-blue-400 to-purple-500",
      description: "Bil-fotboll med boost och freestyle",
      features: [
        "✓ Gruppspel följt av single elimination",
        "✓ Admins och anti-cheat",
        "✓ Live kommentator för finalen",
      ],
    },
  ],

  // Knapp för regler
  rulesButtonText: "Se fullständiga regler",
};

// ============================================
// SCHEMA (Tidtabell för eventet)
// ============================================
export const scheduleSection = {
  // Rubrik
  title: "Schema &",
  titleHighlight: "Info",

  // Praktisk information (kort)
  practicalInfo: [
    {
      icon: "MapPin",
      title: "Plats",
      value: eventInfo.venueShort,
    },
    {
      icon: "Clock",
      title: "Tid",
      value: `${eventInfo.startDay} ${eventInfo.startTime} - ${eventInfo.endDay} ${eventInfo.endTime}`,
    },
    {
      icon: "CheckCircle2",
      title: "Pris",
      value: eventInfo.price,
    },
  ],

  // Detaljerat schema för varje dag
  schedule: [
    {
      day: "Fredag 21 November",
      events: [
        {
          time: "18:00",
          title: "Dörrar öppnar",
          description: "Incheckning och setup börjar",
        },
        {
          time: "19:00",
          title: "Välkomstceremoni",
          description: "Information och genomgång av helgen",
        },
        {
          time: "20:00",
          title: "CS2 Turnering - Gruppspel",
          description: "Första matcherna drar igång",
        },
        {
          time: "22:00",
          title: "Fri speltid",
          description: "Casual gaming och socialisering",
        },
      ],
    },
    {
      day: "Lördag 22 November",
      events: [
        {
          time: "10:00",
          title: "Kiosk",
          description: "Pizza, snacks och dryck tillgänglig",
        },
        {
          time: "14:00",
          title: "Valorant - Gruppspel",
          description: "Valorant turnering börjar",
        },
        {
          time: "18:00",
          title: "Clash Royal - Hela turneringen",
          description: "3v3 bil-fotboll action",
        },
        {
          time: "20:00",
          title: "CS2 - Playoff",
          description: "Knockout-ronder börjar",
        },
        {
          time: "23:00",
          title: "Fri speltid",
          description: "Open play hela natten",
        },
      ],
    },
    {
      day: "Söndag 23 November",
      events: [
        {
          time: "10:00",
          title: "Valorant - Playoff",
          description: "Semifinaler och finaler",
        },
        {
          time: "13:00",
          title: "CS2 - Final",
          description: "Grand Final med live kommentator",
        },
        {
          time: "14:00",
          title: "Prisutdelning",
          description: "Vinnare koras och priser delas ut",
        },
        {
          time: "15:00",
          title: "LAN stänger",
          description: "Städning och avslut",
        },
      ],
    },
  ],

  // Checklista - saker att ta med
  checklistTitle: "Ta med dig",
  checklistTitleHighlight: ":",
  checklist: [
    "Dator / Laptop",
    "Skärm(ar)",
    "Tangentbord & Mus",
    "Headset / Hörlurar",
    "Nätverkskabel (minst 3m)",
    "Strömsladd & Grenuttag",
    "Musmatta",
    "Legitimation",
  ],
};

// ============================================
// ANMÄLAN (Registreringsformulär)
// ============================================
export const registrationSection = {
  // Rubrik och beskrivning
  title: "Anmälan",
  titleHighlight: ".",
  description:
    "Fyll i formuläret för att säkra din plats på Respawn UF LAN 2025.",

  // Formulärfält
  form: {
    nameLabel: "Namn",
    nameRequired: true,
    namePlaceholder: "Ditt fullständiga namn",

    emailLabel: "E-post",
    emailRequired: true,
    emailPlaceholder: "din@email.com",

    discordLabel: "Discord användarnamn",
    discordRequired: true,
    discordPlaceholder: "användarnamn#1234",

    tournamentsLabel: "Välj turneringar",
    tournamentsRequired: true,

    paymentMethodLabel: "Betalningsmetod",
    paymentMethodRequired: true,
  },

  // Turneringsalternativ i formuläret
  tournamentOptions: [
    { id: "cs2", name: "Counter-Strike 2" },
    { id: "valorant", name: "Valorant" },
    { id: "clashroyale", name: "Clash Royal" },
    { id: "none", name: "Ingen turnering" },
  ],

  // Betalningsmetoder
  paymentMethods: [
    { id: "swish", name: "Swish" },
    { id: "onsite", name: "Betala på plats" },
  ],

  // Discord-inforuta
  discordInfo: {
    title: "Discord är obligatoriskt!",
    description:
      "Efter anmälan öppnas en inbjudan till vår Discord-server automatiskt. Gå med för att få uppdateringar, turneringsinfo och chatta med andra deltagare!",
  },

  // Submit-knapp
  submitButton: "Skicka anmälan & Gå med i Discord",
  submitButtonLoading: "Skickar...",

  // Meddelanden (toasts)
  messages: {
    nameEmailRequired: "Vänligen fyll i namn och e-post",
    discordRequired: "Discord användarnamn är obligatoriskt",
    tournamentRequired: "Välj minst en turnering",
    successWithPopup:
      "Anmälan mottagen! Discord-servern öppnas nu...",
    successDescription:
      "Välkommen till Respawn UF LAN 2025! 🎮",
    successWithBlockedPopup: "Anmälan mottagen!",
    successBlockedDescription:
      "Klicka här för att gå med i Discord-servern",
    discordButtonLabel: "Öppna Discord",
    error:
      "Ett fel uppstod. Försök igen eller kontakta oss på respawnuf@gmail.com",
  },
};

// ============================================
// KONTAKT (Kontaktinformation)
// ============================================
export const contactSection = {
  // Rubrik och beskrivning
  title: "Kontakta",
  titleHighlight: "oss",
  description:
    "Har du frågor? Vi finns här för att hjälpa dig!",

  // Kontaktmetoder
  contactMethods: [
    {
      icon: "Mail",
      title: "E-post",
      value: eventInfo.email,
      link: `mailto:${eventInfo.email}`,
      color: "text-green-400",
      bgColor: "bg-green-500/10",
      borderColor: "border-green-500/30",
    },
    {
      icon: "MessageCircle",
      title: "Discord Server",
      value: socialMedia.discord.handle,
      link: socialMedia.discord.url,
      color: "text-blue-400",
      bgColor: "bg-blue-500/10",
      borderColor: "border-blue-500/30",
    },
    {
      icon: "Instagram",
      title: "Instagram",
      value: socialMedia.instagram.handle,
      link: socialMedia.instagram.url,
      color: "text-pink-400",
      bgColor: "bg-pink-500/10",
      borderColor: "border-pink-500/30",
    },
    {
      icon: "Twitch",
      title: "Twitch",
      value: socialMedia.twitch.handle,
      link: socialMedia.twitch.url,
      color: "text-purple-400",
      bgColor: "bg-purple-500/10",
      borderColor: "border-purple-500/30",
    },
    {
      icon: "Video",
      title: "TikTok",
      value: socialMedia.tiktok.handle,
      link: socialMedia.tiktok.url,
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/10",
      borderColor: "border-cyan-500/30",
    },
  ],

  // Platssektion
  locationSection: {
    title: "Hitta hit",
    address: {
      line1: eventInfo.venueShort,
      line2: eventInfo.address,
    },
    dates: {
      line1: eventInfo.startDateDisplay,
      line2: `${eventInfo.startDay} ${eventInfo.startTime} - ${eventInfo.endDay}`,
    },
    mapButtonText: "Google Maps",
    mapUrl: eventInfo.mapsUrl,
  },

  // Länk-text
  visitLinkText: "Besök",
};

// ============================================
// FOOTER (Sidfot)
// ============================================
export const footer = {
  // Varumärke
  brand: {
    name: "RESPAWN",
    nameHighlight: "UF",
    description:
      "Sundsvalls största LAN-party med turneringar, priser och gaming community.",
  },

  // Snabblänkar (samma som navigation)
  quickLinksTitle: "Snabblänkar",
  quickLinks: navigation,

  // Event-info
  eventInfoTitle: "Event Info",
  eventInfo: [
    `📍 ${eventInfo.venue}`,
    `📅 ${eventInfo.startDateDisplay}`,
    `🎟️ ${eventInfo.price}`,
    `✉️ ${eventInfo.email}`,
  ],

  // Sociala medier
  followUsText: "Följ oss",
  socialLinks: [
    {
      icon: "Instagram",
      href: socialMedia.instagram.url,
      label: "Instagram",
      color: "hover:text-pink-400",
    },
    {
      icon: "MessageCircle",
      href: socialMedia.discord.url,
      label: "Discord",
      color: "hover:text-blue-400",
    },
    {
      icon: "Twitch",
      href: socialMedia.twitch.url,
      label: "Twitch",
      color: "hover:text-purple-400",
    },
    {
      icon: "Video",
      href: socialMedia.tiktok.url,
      label: "TikTok",
      color: "hover:text-cyan-400",
    },
  ],

  // Copyright och länkar i botten
  copyright:
    "© 2025 Respawn UF LAN – Alla rättigheter reserverade.",
  bottomLinks: [
    { label: "Integritetspolicy", onClick: () => {} },
    { label: "Regler & Villkor", onClick: () => {} },
  ],
};

// ============================================
// FÄRGTEMA (Om du vill ändra färgerna senare)
// ============================================
export const colorTheme = {
  primary: "green", // Huvudfärg (t.ex. green-400, green-500)
  secondary: "blue", // Sekundär färg
  accent: "purple", // Accentfärg
  background: {
    main: "from-gray-900 via-black to-gray-900", // Gradient bakgrund
    card: "gray-800/70", // Kortbakgrund
    cardBorder: "gray-700", // Kantfärg på kort
  },
};

// ============================================
// TYPSNITT
// ============================================
export const fonts = {
  heading: "Orbitron, sans-serif", // Rubriker
  body: "Poppins, sans-serif", // Brödtext (används i globals.css)
};