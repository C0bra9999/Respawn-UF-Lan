# Discord-integration - Respawn UF LAN 2025

## Översikt
Detta dokument beskriver hur Discord-integrationen fungerar i anmälningssystemet.

## Hur det fungerar

### 1. Användarflöde

När en användare fyller i anmälningsformuläret:

1. **Formulär fylls i** med Discord-användarnamn (obligatoriskt)
2. **Anmälan skickas** till Discord webhook
3. **Discord-inbjudan öppnas automatiskt** i ny flik
4. **Användaren följer länken** och går med i servern manuellt

### 2. Discord Webhook

Webhook-URL: `https://discord.com/api/webhooks/1418129642354905180/qKNdstxASbVcxFM2f_-B5HgG3JrxJc6yGAYtSPdtxTZZdiOVsEI_6SrI8emMOyfww-OQ`

#### Vad som skickas:
```json
{
  "content": "@here Ny anmälan mottagen! Kom ihåg att bjuda in [discord-användarnamn] till Discord-servern!",
  "embeds": [{
    "title": "🎮 Ny LAN-anmälan!",
    "fields": [
      {"name": "👤 Namn", "value": "..."},
      {"name": "📧 E-post", "value": "..."},
      {"name": "💬 Discord", "value": "..."},
      {"name": "🏆 Turneringar", "value": "..."},
      {"name": "💳 Betalningsmetod", "value": "..."},
      {"name": "🏷️ Roller att tilldela", "value": "..."},
      {"name": "⚠️ ÅTGÄRD KRÄVS", "value": "Bjud in användaren manuellt!"}
    ]
  }]
}
```

### 3. Automatisk Discord-inbjudan

Efter att formuläret skickas:

```typescript
// Öppna Discord-inbjudan
const discordWindow = window.open("https://discord.gg/VuCsVZnSbM", "_blank");

// Kontrollera om popup blockerades
if (!discordWindow || discordWindow.closed) {
  // Visa knapp för att öppna manuellt
  toast.success("Anmälan mottagen!", {
    description: "Klicka här för att gå med i Discord-servern",
    action: {
      label: "Öppna Discord",
      onClick: () => window.open("https://discord.gg/VuCsVZnSbM", "_blank")
    }
  });
}
```

## Viktigt att veta

### Discord Webhook-begränsningar

⚠️ **Discord webhooks kan INTE:**
- Automatiskt bjuda in användare till servern
- Tilldela roller automatiskt
- Skicka direktmeddelanden till användare

✅ **Discord webhooks kan:**
- Skicka meddelanden till en kanal
- Inkludera embeds med formaterad information
- Pinga roller (@here, @everyone, etc.)

### Manuell process krävs

**Administratör måste:**

1. **Läsa webhook-meddelandet** i Discord
2. **Hitta användaren** med Discord-användarnamnet som angivits
3. **Skicka serverinbjudan** manuellt till användaren
4. **Tilldela roller** enligt webhook-meddelandet:
   - "Anmäld till lan"
   - "Betallar på plats" eller "Swish"

### Automatisering med Discord Bot (Framtida förbättring)

För att göra processen helt automatisk behövs:

1. **Discord Bot** med följande permissions:
   - `CREATE_INSTANT_INVITE`
   - `MANAGE_ROLES`
   - `SEND_MESSAGES`

2. **Backend-tjänst** (inte möjligt med endast frontend):
   - API-endpoint för att ta emot anmälan
   - Discord Bot API-integration
   - OAuth2-flow för användarautentisering

3. **Implementation:**
```javascript
// Pseudo-kod (kräver backend)
const bot = new DiscordBot(token);

// När anmälan tas emot
async function handleRegistration(userData) {
  // Hitta användare baserat på Discord-användarnamn
  const user = await bot.users.fetch(userData.discordId);
  
  // Skapa inbjudan
  const invite = await guild.invites.create(channel, {
    maxUses: 1,
    maxAge: 86400, // 24 timmar
    unique: true
  });
  
  // Skicka DM till användare
  await user.send(`Välkommen till Respawn UF LAN 2025! ${invite.url}`);
  
  // När användare går med, tilldela roller
  bot.on('guildMemberAdd', async (member) => {
    if (member.user.id === user.id) {
      await member.roles.add(roleIds);
    }
  });
}
```

## Användarupplevelse

### För deltagare:

1. ✅ **Tydlig information** - Blå info-box förklarar Discord-krav
2. ✅ **Automatisk länk** - Discord-server öppnas automatiskt efter anmälan
3. ✅ **Backup-knapp** - Om popup blockeras, klickbar knapp i toast
4. ✅ **Tydligt meddelande** - Toast bekräftar att anmälan mottagits

### För administratörer:

1. ✅ **Notifikation** - @here ping i Discord-kanalen
2. ✅ **All information** - Namn, e-post, Discord-användarnamn, turneringar
3. ✅ **Tydlig åtgärd** - "⚠️ ÅTGÄRD KRÄVS" fält med påminnelse
4. ✅ **Roller att tilldela** - Lista över vilka roller som ska ges

## Felsökning

### Problem: Användare säger att de inte fick Discord-inbjudan

**Lösning:**
1. Kontrollera att Discord-länken är korrekt: `https://discord.gg/VuCsVZnSbM`
2. Be användaren kontrollera popup-blockerare
3. Be användaren klicka på knappen i toast-meddelandet
4. Skicka manuell inbjudan baserat på webhook-meddelandet

### Problem: Webhook-meddelanden syns inte i Discord

**Lösning:**
1. Kontrollera att webhook-URL:en är korrekt
2. Verifiera att webhook inte har raderats i Discord-serverns inställningar
3. Kontrollera nätverkskonsolen för fel

### Problem: Användare har gått med men har inga roller

**Lösning:**
1. Detta är förväntat - roller måste tilldelas manuellt av administratör
2. Följ instruktionerna i webhook-meddelandet "🏷️ Roller att tilldela"

## Discord-serverinställningar

### Rekommenderade roller:

- **Anmäld till lan** - Ges till alla som anmält sig
- **Swish** - För användare som betalat via Swish
- **Betallar på plats** - För användare som ska betala på plats
- **CS2** - För deltagare i CS2-turnering
- **Marvel Rivals** - För deltagare i Marvel Rivals-turnering
- **Valorant** - För deltagare i Valorant-turnering
- **Clash Royal** - För deltagare i Clash Royal-turnering

### Webhook-kanal:

Rekommenderat att ha en dedikerad kanal för anmälningar:
- Namn: `#anmälningar` eller `#registrations`
- Endast synlig för administratörer
- Webhook konfigurerad i denna kanal

## Säkerhet

### Webhook-säkerhet:

⚠️ **Viktigt:**
- Webhook-URL:en är publik i frontend-koden
- Någon kan teoretiskt skicka falska meddelanden
- Detta är acceptabelt för detta use case (LAN-anmälan)

💡 **Förbättringsförslag:**
- Flytta webhook-URL till backend (miljövariabel)
- Lägg till rate limiting
- Implementera CAPTCHA för att förhindra spam

---

**Datum:** November 2025  
**Discord Server:** https://discord.gg/VuCsVZnSbM  
**Status:** ✅ Fungerar (manuell inbjudan krävs)
