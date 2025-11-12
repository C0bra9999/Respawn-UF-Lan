# 🎯 Centraliserad Konfiguration - Implementerad

## ✅ Vad har gjorts?

All information på Respawn UF LAN-webbsidan är nu centraliserad i en enda konfigurationsfil med tydliga kommentarer på svenska.

---

## 📁 Filstruktur

### **Huvudfil:**
- `/config/siteConfig.ts` - **Här ändrar du allt innehåll**

### **Guider:**
- `/README_CONFIG.md` - Detaljerad guide med exempel
- `/SNABBGUIDE.md` - Snabb referens för vanliga ändringar
- `/CENTRALISERAD_CONFIG.md` - Detta dokument (översikt)

### **Uppdaterade komponenter:**
Alla komponenter använder nu konfigurationsfilen:
- `/components/HeroSection.tsx`
- `/components/InfoSection.tsx`
- `/components/TournamentsSection.tsx`
- `/components/ScheduleSection.tsx`
- `/components/RegistrationSection.tsx`
- `/components/ContactSection.tsx`
- `/components/Navigation.tsx`
- `/components/Footer.tsx`

---

## 📊 Vad kan ändras från konfigurationsfilen?

### 1. **Grundläggande eventinformation** (`eventInfo`)
- Eventnamn
- År
- Startdatum (för countdown)
- Datumvisning
- Plats och adress
- Pris
- Antal platser
- E-post
- Discord-länkar
- Discord webhook URL
- Discord-roller

### 2. **Sociala medier** (`socialMedia`)
- Instagram
- Discord
- Twitch
- TikTok

### 3. **Navigation** (`navigation`)
- Menylänkar
- Menunamn

### 4. **Hero-sektion** (`heroSection`)
- Huvudrubrik
- Underrubrik
- Eventdetaljer
- Countdown-text och labels
- Call-to-action knapp

### 5. **Info-sektion** (`infoSection`)
- Rubrik
- Beskrivning
- Funktioner/fördelar (4 st kort)

### 6. **Turneringar** (`tournamentsSection`)
- Lista över alla turneringar
- Spelnamn
- Format (2v2, 5v5, etc.)
- Priser
- Antal platser
- Färggradient
- Beskrivningar
- Funktioner/regler
- Regelknapp-text

### 7. **Schema** (`scheduleSection`)
- Praktisk info (Plats, Tid, Pris)
- Detaljerat schema för varje dag
- Tidpunkter och aktiviteter
- Checklista (saker att ta med)

### 8. **Anmälan** (`registrationSection`)
- Formulärfält-labels
- Placeholder-texter
- Turneringsalternativ
- Betalningsmetoder
- Discord-infotext
- Knapptexter
- Felmeddelanden
- Bekräftelsemeddelanden

### 9. **Kontakt** (`contactSection`)
- Rubrik
- Beskrivning
- Kontaktmetoder (E-post, Discord, Instagram, Twitch, TikTok)
- Platssektion med adress
- Kartlänk

### 10. **Footer** (`footer`)
- Varumärke
- Beskrivning
- Snabblänkar
- Event-info
- Sociala medier
- Copyright-text
- Länktext för integritet/regler

### 11. **Färgtema** (`colorTheme`)
- Primär färg
- Sekundär färg
- Accentfärg
- Bakgrundsfärger

---

## 🔄 Hur fungerar det?

1. **Du ändrar:** Värde i `/config/siteConfig.ts`
2. **Komponenten läser:** Import från konfigurationsfilen
3. **Sidan uppdateras:** Automatiskt överallt där värdet används

### Exempel:
```typescript
// I /config/siteConfig.ts
export const eventInfo = {
  price: "100 kr per deltagare",  // Du ändrar här
}

// I /components/ScheduleSection.tsx
<p>{eventInfo.price}</p>  // Uppdateras automatiskt

// I /components/Footer.tsx
<li>🎟️ {eventInfo.price}</li>  // Uppdateras automatiskt
```

---

## 🎨 Kodstruktur

### Kommentarer
Alla sektioner i konfigurationsfilen har:
- **Stora rubriker** med `// ============`
- **Tydliga förklaringar** på svenska
- **Inline-kommentarer** som beskriver varje fält

### Icon Mapping
Komponenter som använder ikoner har en `iconMap` för att konvertera string-namn till React-komponenter:

```typescript
const iconMap: Record<string, any> = {
  Monitor,
  Trophy,
  Pizza,
  Heart,
};
```

Detta gör att vi kan spara ikonnamn som strings i konfigurationsfilen.

---

## 🛠️ Tekniska detaljer

### TypeScript-säkerhet
- Konfigurationsfilen är skriven i TypeScript
- Alla värden är typsäkra
- Import används i alla komponenter

### Prestanda
- Ingen påverkan på 300 fps-optimering
- Imports är statiska (byggts vid compile-time)
- Inga extra nätverksanrop

### Underhåll
- En fil att uppdatera = enklare underhåll
- Mindre risk för inkonsistens
- Tydlig struktur = lättare att hitta rätt

---

## 📝 Best Practices

### När du ändrar:
1. ✅ Läs kommentarerna först
2. ✅ Ändra endast värdena (texten mellan `"..."`)
3. ✅ Behåll alla tecken (`,`, `:`, `{}`, `[]`)
4. ✅ Spara och kontrollera att sidan fungerar
5. ✅ Testa ändringen i webbläsaren

### När du lägger till nytt:
1. ✅ Följ samma struktur som befintliga objekt
2. ✅ Lägg till kommentarer på svenska
3. ✅ Kontrollera att ID:n är unika
4. ✅ Testa noggrant

---

## 🆘 Felsökning

### Problem: Sidan visar inget
**Lösning:** Kolla att du inte har glömt ett kommatecken eller citattecken

### Problem: Röd text i konsolen
**Lösning:** Läs felmeddelandet - det pekar ofta på exakt rad och kolumn

### Problem: En sektion uppdateras inte
**Lösning:** Kontrollera att du har sparat filen och att webbläsaren har laddats om

---

## 📞 Support

- **E-post:** respawnuf@gmail.com
- **Discord:** https://discord.gg/VuCsVZnSbM

---

## 🎉 Fördelar med detta system

✅ **En fil** istället för 8+ komponenter att leta igenom  
✅ **Svenska kommentarer** - lätt att förstå  
✅ **Konsistent data** - inget dubbelarbete  
✅ **Snabba ändringar** - hitta och ändra på sekunder  
✅ **Mindre risk för fel** - en plats att uppdatera  
✅ **Lättare samarbete** - tydlig struktur för alla  

---

**Systemet är nu redo att användas! 🚀**
