# 📝 Guide: Ändra innehållet på Respawn UF LAN-webbsidan

## 🎯 Översikt

All text, data och information på webbsidan kan nu ändras från **EN ENDA FIL**: `/config/siteConfig.ts`

Du behöver inte längre leta igenom flera komponenter för att ändra något. Alla ändringar görs i konfigurationsfilen och uppdateras automatiskt överallt på sidan.

---

## 📂 Var hittar jag konfigurationsfilen?

Filen heter: **`/config/siteConfig.ts`**

---

## 🔧 Hur använder jag konfigurationsfilen?

### Grundläggande ändringar

1. Öppna `/config/siteConfig.ts`
2. Leta efter den sektion du vill ändra (t.ex. "GRUNDLÄGGANDE EVENTINFORMATION")
3. Ändra värdena mellan citattecknen `"..."`
4. Spara filen
5. Klart! Ändringen syns automatiskt på webbsidan

---

## 📋 Vad kan jag ändra?

### 1️⃣ GRUNDLÄGGANDE EVENTINFORMATION (`eventInfo`)

```typescript
export const eventInfo = {
  name: "RESPAWNUF LAN",           // Evenemangets namn
  year: "2025",                     // År
  startDate: "2025-11-21T18:00:00", // Startdatum för countdown
  startDateDisplay: "21–23 November 2025", // Hur datumet visas
  venue: "Nti gymnasiet, Sundsvall", // Plats
  price: "75 kr per deltagare",     // Pris
  totalSlots: "30+ antal platser",  // Antal platser
  email: "respawnuf@gmail.com",     // Kontakt-email
  discordInviteUrl: "https://discord.gg/VuCsVZnSbM", // Discord-länk
  discordWebhookUrl: "https://discord.com/api/webhooks/...", // Webhook
}
```

**Exempel:** Vill du ändra priset från 75 kr till 100 kr?
```typescript
price: "100 kr per deltagare", // Ändra bara denna rad
```

---

### 2️⃣ SOCIALA MEDIER (`socialMedia`)

```typescript
export const socialMedia = {
  instagram: {
    handle: "@respawnuf",
    url: "https://www.instagram.com/respawnuf/",
  },
  // ... fortsätter med discord, twitch, tiktok
}
```

**Exempel:** Vill du ändra Instagram-kontot?
```typescript
instagram: {
  handle: "@nyttnamn",
  url: "https://www.instagram.com/nyttnamn/",
},
```

---

### 3️⃣ TURNERINGAR (`tournamentsSection`)

```typescript
tournaments: [
  {
    id: "cs2",                    // Unikt ID
    name: "Counter-Strike 2",     // Spelets namn
    format: "2v2",                // Format
    prize: "100,0 kr",            // Pris
    slots: "16 lag",              // Antal platser
    color: "from-orange-500 to-red-500", // Färggradient
    description: "Klassisk Wingman 2v2...", // Beskrivning
    features: [                   // Funktioner/regler
      "✓ Gruppspel följt av single elimination",
      "✓ Admins och anti-cheat",
      "✓ Live kommentator för finalen",
    ],
  },
  // ... fler turneringar
]
```

**Exempel:** Vill du lägga till en ny turnering?
```typescript
{
  id: "leagueoflegends",
  name: "League of Legends",
  format: "5v5",
  prize: "200 kr",
  slots: "8 lag",
  color: "from-yellow-500 to-amber-500",
  description: "Competitive MOBA tournament",
  features: [
    "✓ Best of 3 format",
    "✓ Draft pick mode",
    "✓ Prize for top 3 teams",
  ],
},
```

---

### 4️⃣ SCHEMA (`scheduleSection`)

```typescript
schedule: [
  {
    day: "Fredag 21 November",
    events: [
      { 
        time: "18:00", 
        title: "Dörrar öppnar", 
        description: "Incheckning och setup börjar" 
      },
      // ... fler händelser
    ],
  },
  // ... fler dagar
]
```

**Exempel:** Vill du ändra starttiden?
```typescript
{ 
  time: "17:00",  // Ändra från 18:00 till 17:00
  title: "Dörrar öppnar", 
  description: "Incheckning och setup börjar" 
},
```

---

### 5️⃣ ANMÄLNINGSFORMULÄR (`registrationSection`)

```typescript
form: {
  nameLabel: "Namn",
  namePlaceholder: "Ditt fullständiga namn",
  emailLabel: "E-post",
  emailPlaceholder: "din@email.com",
  // ... fortsätter med discord, tournaments, payment
}
```

**Exempel:** Vill du ändra placeholder-texten för email?
```typescript
emailPlaceholder: "Skriv din e-postadress här",
```

---

### 6️⃣ KONTAKTSEKTION (`contactSection`)

```typescript
contactMethods: [
  {
    icon: "Mail",
    title: "E-post",
    value: "respawnuf@gmail.com",
    link: "mailto:respawnuf@gmail.com",
    color: "text-green-400",
    // ... fortsätter
  },
  // ... fler kontaktmetoder
]
```

---

### 7️⃣ DISCORD-ROLLER (`eventInfo.discordRoles`)

```typescript
discordRoles: {
  allParticipants: "Anmäld till lan",  // Roll som alla får
  swishPayment: "Swish",                // Roll för Swish-betalare
  onsitePayment: "Betallar på plats",   // Roll för platsbetalning
},
```

---

## ⚠️ Viktiga saker att tänka på

### ✅ GÖR:
- Ändra text mellan citattecknen `"text här"`
- Ändra siffror och datum
- Lägg till eller ta bort objekt i listor (t.ex. turneringar)
- Använd svenska kommentarer för att förstå vad allt gör

### ❌ UNDVIK:
- Ta bort kommatecken `,` i slutet av rader
- Ta bort måsvingar `{ }` eller hakparenteser `[ ]`
- Ändra namn på variabler (t.ex. `eventInfo`, `name`, `title`)
- Ta bort kolon `:` mellan namn och värden

---

## 🎨 Färgteman

Om du vill ändra färger på webbsidan finns det en sektion längst ner:

```typescript
export const colorTheme = {
  primary: "green",   // Huvudfärg (grön)
  secondary: "blue",  // Sekundär färg (blå)
  accent: "purple",   // Accentfärg (lila)
}
```

**OBS:** Att ändra färgteman kräver lite mer kunskap om Tailwind CSS.

---

## 🆘 Hjälp, något gick fel!

Om något slutar fungera efter en ändring:

1. **Kolla om du har:**
   - Glömt ett kommatecken `,`
   - Glömt citattecken `"` runt text
   - Tagit bort en måsvinge `}` eller hakparentes `]`

2. **Använd Ctrl+Z (Undo)** för att ångra den senaste ändringen

3. **Felmeddelanden:** Om du ser röd text i konsolen, läs meddelandet - det pekar ofta på vilken rad felet är på

---

## 📖 Exempel: Komplett ändring

**Scenario:** Du vill ändra LAN-namnet till "Epic Gaming 2025" och priset till 100 kr.

### Före:
```typescript
export const eventInfo = {
  name: "RESPAWNUF LAN",
  year: "2025",
  price: "75 kr per deltagare",
  // ...
}
```

### Efter:
```typescript
export const eventInfo = {
  name: "EPIC GAMING",  // ✏️ Ändrat
  year: "2025",
  price: "100 kr per deltagare",  // ✏️ Ändrat
  // ...
}
```

**Resultat:** Namnet uppdateras automatiskt i navigation, hero-sektion och footer. Priset uppdateras i schema-sektionen och footer.

---

## 🚀 Tips för effektiv redigering

1. **Använd Ctrl+F (Sök)** för att hitta den text du vill ändra snabbt
2. **Läs kommentarerna** - de förklarar vad varje del gör
3. **Testa en liten ändring först** innan du gör många ändringar
4. **Spara ofta** så att du inte förlorar ditt arbete

---

## 📞 Kontakt

Om du har frågor om konfigurationsfilen eller behöver hjälp, kontakta:
- **E-post:** respawnuf@gmail.com
- **Discord:** https://discord.gg/VuCsVZnSbM

---

**Lycka till med att anpassa din webbsida! 🎮✨**
