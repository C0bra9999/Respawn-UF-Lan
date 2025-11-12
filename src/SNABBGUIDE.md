# 🚀 SNABBGUIDE - Ändra innehåll på webbsidan

## 📍 Var ändrar jag saker?

**EN FIL:** `/config/siteConfig.ts`

---

## ⚡ Vanliga ändringar

### ✏️ Ändra eventnamn
```typescript
// Rad 16 i siteConfig.ts
name: "DITT NYA NAMN",
```

### 📅 Ändra datum
```typescript
// Rad 22 i siteConfig.ts
startDateDisplay: "25–27 December 2025",
```

### 💰 Ändra pris
```typescript
// Rad 29 i siteConfig.ts
price: "100 kr per deltagare",
```

### 📧 Ändra e-post
```typescript
// Rad 33 i siteConfig.ts
email: "din@nyaemail.com",
```

### 🎮 Ändra turnering
```typescript
// Rad 171-180 i siteConfig.ts
{
  id: "cs2",
  name: "Counter-Strike 2",  // ← Ändra spelets namn här
  prize: "200 kr",           // ← Ändra priset här
  slots: "32 lag",           // ← Ändra antal platser här
},
```

### 🕐 Ändra schema
```typescript
// Rad 235-238 i siteConfig.ts
{ 
  time: "19:00",                    // ← Ändra tiden här
  title: "Dörrar öppnar",           // ← Ändra aktiviteten här
  description: "Incheckning börjar" // ← Ändra beskrivningen här
},
```

### 📱 Ändra sociala medier
```typescript
// Rad 54-57 i siteConfig.ts
instagram: {
  handle: "@dittnyahandle",
  url: "https://www.instagram.com/dittnyahandle/",
},
```

---

## 🛑 VIKTIGT att komma ihåg

✅ **Behåll alltid:**
- Citattecken runt text: `"text"`
- Kommatecken i slutet: `,`
- Måsvingar: `{ }`
- Hakparenteser: `[ ]`

❌ **Ta INTE bort:**
- Kommatecken
- Citattecken
- Måsvingar eller hakparenteser

---

## 💡 Tips

1. **Sök efter text:** Tryck `Ctrl+F` och sök efter den text du vill ändra
2. **Läs kommentarerna:** Rad 1-11 förklarar vad filen gör
3. **Spara ofta:** Tryck `Ctrl+S` för att spara
4. **Ångra misstag:** Tryck `Ctrl+Z` för att ångra

---

## 📖 Mer hjälp?

Läs den **fullständiga guiden** i: `/README_CONFIG.md`

---

**Lycka till! 🎮**
