# SOLO HUNTER — Gamified Fitness & Wellness Tracker

Tracker personal de fitness și disciplină, în stil **Solo Leveling**. Transformi
antrenamentele și obiceiurile zilnice (sport, respirație, duș rece, lectură,
meditație, post) în XP, nivele, ranguri și achievement-uri. Totul în română,
100% local, fără cont și fără servere.

## 🎮 Concept

Ești un „Hunter" care evoluează prin disciplină. Completezi misiuni zilnice,
urci în nivel și rang (E-Rank → God Mode), îți crești cele 4 stats și
deblochezi badge-uri. „Sistemul" îți dă misiuni — tu execuți.

## 🎯 Features

- **Misiuni Principale** (6 zilnice): Respirație Wim Hof, Rugăciune AM,
  Afirmații, Recunoștință PM, Duș Rece, Antrenament Fizic
- **Misiuni Bonus** (4 zilnice, generate determinist per zi) — rarități
  `common` / `rare` / `legendary` cu XP scalat (×1 / ×3 / ×5)
- **Boss Day** săptămânal — o misiune grea cu recompensă 5× (+250 XP)
- **Sistem XP / Nivele / Ranguri** — 10 trepte de rang, de la E-Rank Novice
  la God Mode, cu glow și culori per rang
- **4 Stats** (fără plafon): `STR` forță • `END` rezistență • `MND` mental •
  `WIL` voință — fiecare cu tier-uri (Novice → Transcendent)
- **103 Achievements** pe 4 rarități (bronze / silver / gold / legendary)
- **Streak + Shields** — zile perfecte consecutive; shield-urile (max 3)
  protejează streak-ul la o zi ratată
- **Logging antrenamente** — program PPL (7 zile), seturi cu kg + reps + volum,
  switch unități per exercițiu (Total / Per side cu calculul barei / DB each),
  pill „Last Time", copiere seturi anterioare, note, exerciții custom
- **Progres** — range selectabil (7z → total), grafice de evoluție per
  exercițiu, volum agregat, PR-uri și delta vs. perioada anterioară, istoric
- **Rest Timer** — presets (1:00–4:00), vibrație + beep la final
- **Raport Săptămânal** (duminica) — zile perfecte, bonusuri, top stat, citat
- **Backup JSON** — export/import complet al datelor
- **100% local** — totul în `localStorage`, PWA offline, zero tracking

## 🗂️ Structură fișiere

```
.
├── index.html      # Shell HTML + modale (single page)
├── app.js          # Toată logica aplicației
├── data.js         # Program, pool misiuni, boss-uri, achievements, citate
├── style.css       # Stiluri + animații
├── sw.js           # Service worker (PWA, offline)
├── manifest.json   # PWA manifest
├── vercel.json     # Config Vercel (headers)
├── icon-192.png / icon-512.png / icon.svg
└── q-*.png         # Imagini pentru misiuni (wim hof, prayer, workout...)
```

## 🚀 Deploy pe Vercel

**Drag & Drop:** intră pe [vercel.com](https://vercel.com) → „Add New…" →
„Project" → trage folderul pe pagină → „Deploy". E site static, nu necesită build.

**GitHub:** push folderul într-un repo → import în Vercel → lasă setările
default → Deploy.

## 📱 Instalare pe iPhone (Home Screen)

1. Deschide URL-ul în **Safari** (necesar pentru PWA pe iOS)
2. Buton Share (pătratul cu săgeată) → „Add to Home Screen"
3. Apasă „Add" — se deschide fullscreen, fără bara de browser

## 💾 Backup

`localStorage` poate fi șters dacă schimbi telefonul, ștergi cache-ul Safari sau
faci reset. **Exportă JSON săptămânal** din Hunter → „Export backup JSON".
La import, datele se normalizează automat (stat-uri lipsă completate, streak
recalculat din istoric).

## 🔧 Customizare

- **Conținut joc** (misiuni bonus, boss-uri, achievements, exerciții): editezi
  `data.js`
- **Culori / animații**: editezi `:root` și keyframes din `style.css`
- **Greutatea barei**: setabilă în Hunter → Setări Bară (default 20 kg)

## 🛠️ Dezvoltare locală

Site static — orice server HTTP merge:

```bash
python3 -m http.server 8000
# apoi deschide http://localhost:8000
```

> Notă: e inclus și `.claude/serve.py`, un server cu `no-store` folosit doar
> pentru testare locală (ocolește cache-ul de browser). Nu afectează deploy-ul.
