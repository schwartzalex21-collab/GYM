# GYM — PPL Hypertrophy Tracker

Aplicație personală de tracking pentru programul PPL Hypertrophy v2 — Barbell-First Edition.

## 🚀 Deploy pe Vercel

### Metoda 1: Drag & Drop (cel mai simplu)
1. Intră pe [vercel.com](https://vercel.com) și loghează-te
2. Apasă "Add New..." → "Project"
3. Drag & drop folderul `gym-app` pe pagină
4. Vercel detectează automat că e static, apasă "Deploy"
5. Gata — primești un URL de tip `gym-tau.vercel.app`

### Metoda 2: GitHub
1. Push folderul într-un repo GitHub
2. Import repo-ul în Vercel
3. Build settings: lasă tot default (e static)
4. Deploy

## 📱 Adaugă pe iPhone (Home Screen)

1. Deschide URL-ul în **Safari** (NU Chrome — Safari e necesar pentru PWA pe iOS)
2. Apasă butonul de share (pătratul cu săgeată în sus)
3. Scroll jos → "Add to Home Screen"
4. Numele e deja "GYM", iconița e setată
5. Apasă "Add"
6. Acum ai aplicația pe home screen — se deschide fullscreen, fără browser bar

## 🎯 Features

- **Profil personal** cu poză, vârstă, greutate, înălțime, obiective
- **Toate cele 7 zile** din PPL v2 cu toate exercițiile pre-configurate
- **Logging seturi** cu kg + reps + volume calculation per set
- **Switch unități per exercițiu**: Total / Per side (cu calculul barei) / Dumbbell each
- **"Last Time" pill** pe fiecare exercițiu — vezi exact cu cât ai făcut ultima oară
- **Copy last sets** — un tap și ai seturile copiate, doar progresezi
- **Note per exercițiu** (RPE-free, doar text liber)
- **Rest Timer** manual (1:00, 1:30, 2:00, 2:30, 3:00, 4:00) — vibrație + beep când termină
- **Progress page** cu range selectabil (7z, 2s, 4s, 8s, 3l, 6l, total)
  - Grafic evoluție per exercițiu (volum)
  - Volum total agregat
  - PR-uri și delta vs perioada anterioară
- **Istoric** complet cu volume per zi, click pe orice zi pentru a o re-deschide
- **Backup JSON** export/import — datele tale, controlul tău
- **100% local** — totul în localStorage, zero servere, zero tracking

## 🗂️ Structură fișiere

```
gym-app/
├── index.html          # Aplicația completă (single file)
├── manifest.json       # PWA manifest (iconiță home screen)
├── icon-192.png        # PWA icon
├── icon-512.png        # PWA icon
├── apple-touch-icon.png
├── vercel.json         # Config Vercel
└── README.md
```

## 💾 Backup

**IMPORTANT:** localStorage poate fi șters dacă schimbi telefonul, faci hard reset al Safari, sau curăță cache-ul.
**Fă export JSON săptămânal** din Profil → Exportă date.

## 🔧 Customizare

- **Greutatea barei**: setabilă în Profil → Setări Bară (default 20kg pentru bară olimpică)
- **Adăugare exerciții**: editezi `PROGRAM` din `index.html`
- **Schimbare culori**: editezi `:root` din CSS (default accent: `#ff4500`)
