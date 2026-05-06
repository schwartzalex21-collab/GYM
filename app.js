// =================== STATE ===================
let state = {
  profile: {
    name: 'Alex',
    photo: null,
    age: '',
    weight: '',
    height: '',
    goals: []
  },
  workouts: {},      // { 'YYYY-MM-DD': { dayKey, exercises: { exId: { sets: [{kg, reps, unit}], notes } } } }
  customExercises: {}, // { exId: { name, target, defaultUnit } }
  system: {
    xp: 0,
    level: 1,
    perfectStreak: 0,
    lastPerfectDate: null
  },
  habits: {}, // { 'YYYY-MM-DD': { wim_hof, prayer_am, affirmations, prayer_pm, workout_xp_claimed, perfect_claimed } }
  settings: {
    barWeight: 20
  }
};

let currentPage = 'home';
let currentWorkoutDate = null;
let currentDayKey = null;

// =================== STORAGE ===================
const STORAGE_KEY = 'gym_app_v1';

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      state = { 
        ...state, 
        ...parsed, 
        profile: { ...state.profile, ...(parsed.profile || {}) },
        system: { ...state.system, ...(parsed.system || {}) } 
      };
      if (!state.customExercises) state.customExercises = {};
      if (!state.habits) state.habits = {};
    }
  } catch (e) {
    console.error('Load error:', e);
  }
}

function saveState() {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (e) {
    console.error('Save error:', e);
    if (e.name === 'QuotaExceededError') {
      showToast('❌ Spațiu insuficient! Șterge backup-uri sau folosește poze mai mici.');
    } else {
      showToast('❌ Eroare la salvare!');
    }
  }
}

// =================== HELPERS ===================
function escapeHtml(unsafe) {
  if (unsafe === null || unsafe === undefined) return '';
  return unsafe.toString()
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const QUESTS = {
  wim_hof: { 
    id: 'wim_hof', 
    name: 'Respirație Wim Hof', 
    xp: 30, 
    img: 'q-wimhof.png',
    instruction: 'Efectuează 3 runde de respirație profundă (30-40 inspirații) urmate de retenție și o inspirație de recuperare.' 
  },
  prayer_am: { 
    id: 'prayer_am', 
    name: 'Rugăciune AM (Tatăl Nostru)', 
    xp: 20, 
    img: 'q-prayer-am.png',
    text: 'Tatăl nostru, Care ești în ceruri, sfințească-Se numele Tău, vie împărăția Ta, facă-se voia Ta, precum în cer, așa și pe pământ. Pâinea noastră cea de toate zilele dă-ne-o nouă astăzi și ne iartă nouă greșelile noastre, precum și noi iertăm greșiților noștri. Și nu ne duce pe noi în ispită, ci ne izbăvește de cel rău. Amin.'
  },
  affirmations: { 
    id: 'affirmations', 
    name: 'Afirmații de Putere', 
    xp: 20, 
    img: 'q-affirmations.png',
    text: 'Sunt puternic. Sunt disciplinat. În fiecare zi devin o versiune mai bună. Corpul meu este templul meu. Mintea mea este calmă și concentrată. Merit succesul și fericirea.'
  },
  prayer_pm: { 
    id: 'prayer_pm', 
    name: 'Recunoștință PM', 
    xp: 20, 
    img: 'q-prayer-pm.png',
    instruction: 'Gândește-te la 3 lucruri bune care s-au întâmplat astăzi și mulțumește-i lui Dumnezeu pentru ele.'
  },
  workout: { id: 'workout', name: 'Antrenament Fizic', xp: 100, img: 'q-workout.png', auto: true }
};

function getRequiredXP(level) {
  // Formula ajustată: Nivelul 100 se atinge în aprox 6 luni de Perfect Days (aprox 38,000 XP total)
  // Devine progresiv mai greu după nivelul 50.
  const base = 80;
  const growth = Math.floor(Math.pow(level, 1.2) * 2.5);
  return Math.floor((base + growth) / 5) * 5;
}

function getRank(level) {
  if (level < 10) return { name: 'E-Rank Novice', color: '#a0a0a0', bg: 'rgba(160,160,160,0.1)' };
  if (level < 20) return { name: 'D-Rank Fighter', color: '#5cb85c', bg: 'rgba(92,184,92,0.1)' };
  if (level < 35) return { name: 'C-Rank Elite', color: '#5bc0de', bg: 'rgba(91,192,222,0.1)' };
  if (level < 50) return { name: 'B-Rank Veteran', color: '#337ab7', bg: 'rgba(51,122,183,0.1)' };
  if (level < 70) return { name: 'A-Rank Champion', color: '#f0ad4e', bg: 'rgba(240,173,78,0.1)' };
  if (level < 85) return { name: 'S-Rank Hero', color: '#d9534f', bg: 'rgba(217,83,79,0.1)' };
  if (level < 100) return { name: 'National Level', color: '#9c27b0', bg: 'rgba(156,39,176,0.1)' };
  if (level < 125) return { name: 'Shadow Monarch', color: '#00f0ff', bg: 'rgba(0,240,255,0.1)', glow: '0 0 15px #00f0ff' };
  if (level < 150) return { name: 'Death Angel', color: '#ff0000', bg: 'rgba(255,0,0,0.1)', glow: '0 0 20px #ff0000' };
  return { name: 'God Mode', color: '#ffffff', bg: 'rgba(255,255,255,0.1)', glow: '0 0 25px #ffffff', textStyle: 'color: #000; text-shadow: 0 0 5px #fff' };
}

function addXP(amount, reason) {
  const oldLevel = state.system.level;
  state.system.xp += amount;
  
  
  // Prevenim XP negativ sub nivelul curent
  if (state.system.xp < 0) {
    state.system.xp = 0;
  }
  
  let levelsGained = 0;
  while (state.system.xp >= getRequiredXP(state.system.level)) {
    state.system.xp -= getRequiredXP(state.system.level);
    state.system.level++;
    levelsGained++;
  }
  
  if (levelsGained > 0) {
    showLevelUpModal(state.system.level, levelsGained);
  }
  
  saveState();
  updateGlobalXPBar();
  
  const prefix = amount >= 0 ? '+' : '';
  showToast(`${prefix}${amount} XP (${reason})`);
}

function toggleHabit(date, habitId) {
  if (navigator.vibrate) navigator.vibrate(10);
  if (!state.habits[date]) state.habits[date] = {};
  
  const isDone = !state.habits[date][habitId];
  state.habits[date][habitId] = isDone;
  
  if (isDone) {
    addXP(QUESTS[habitId].xp, QUESTS[habitId].name);
    checkPerfectDay(date);
  } else {
    state.system.xp = Math.max(0, state.system.xp - QUESTS[habitId].xp);
    saveState();
    updateGlobalXPBar();
  }
  render();
}

function checkPerfectDay(date) {
  const h = state.habits[date];
  if (h && h.wim_hof && h.prayer_am && h.affirmations && h.prayer_pm && h.workout_xp_claimed) {
    if (!h.perfect_claimed) {
      h.perfect_claimed = true;
      addXP(50, 'Misiune Completă Zilnică!');
      
      const todayDate = new Date(date);
      const lastDateStr = state.system.lastPerfectDate;
      
      if (lastDateStr) {
         const lastDate = new Date(lastDateStr);
         const diffTime = Math.abs(todayDate - lastDate);
         const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
         if (diffDays === 1) {
            state.system.perfectStreak++;
         } else if (diffDays > 1) {
            state.system.perfectStreak = 1;
         }
      } else {
         state.system.perfectStreak = 1;
      }
      state.system.lastPerfectDate = date;
      
      const milestones = { 7: 150, 30: 500, 60: 1000, 90: 2000, 120: 3000 };
      const s = state.system.perfectStreak;
      if (milestones[s]) {
         setTimeout(() => addXP(milestones[s], `🏆 ${s} ZILE PERFECT STREAK!`), 1500);
      }
      saveState();
    }
  }
}

function todayKey() {
  const d = new Date();
  const pad = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth()+1)}-${pad(d.getDate())}`;
}

function formatDate(dateStr) {
  const [y, m, d_val] = dateStr.split('-').map(Number);
  const d = new Date(y, m - 1, d_val);
  const days = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sâm'];
  const months = ['Ian', 'Feb', 'Mar', 'Apr', 'Mai', 'Iun', 'Iul', 'Aug', 'Sep', 'Oct', 'Noi', 'Dec'];
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]}`;
}

function formatDateShort(dateStr) {
  const d = new Date(dateStr);
  return `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getFullYear()).slice(2)}`;
}

function showToast(msg) {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}

function getExerciseMeta(exId) {
  let found = null;
  Object.values(window.PROGRAM).forEach(day => {
    const ex = day.exercises.find(e => e.id === exId);
    if (ex) found = ex;
  });
  if (found) return found;
  if (state.customExercises[exId]) return { id: exId, ...state.customExercises[exId] };
  return { id: exId, name: exId, target: 'N/A', defaultUnit: 'total', note: '' };
}

// Compute total weight from a set entry based on unit
function computeTotalKg(set) {
  const kg = parseFloat(set.kg) || 0;
  if (set.unit === 'side') return state.settings.barWeight + kg * 2;
  if (set.unit === 'db') return kg * 2; // total volume two dumbbells
  return kg; // total
}

// Display weight string
function displayKg(set) {
  const kg = parseFloat(set.kg) || 0;
  if (kg === 0) return '—';
  if (set.unit === 'side') return `${kg}×2 + ${state.settings.barWeight}`;
  if (set.unit === 'db') return `${kg} db`;
  return `${kg}`;
}

// Find last entry for a specific exercise
function findLastExerciseEntry(exId, excludeDate) {
  const dates = Object.keys(state.workouts)
    .filter(d => d !== excludeDate && state.workouts[d].exercises[exId])
    .sort()
    .reverse();
  for (const date of dates) {
    const ex = state.workouts[date].exercises[exId];
    if (ex && ex.sets && ex.sets.some(s => s.kg || s.reps)) {
      return { date, sets: ex.sets };
    }
  }
  return null;
}

function updateGlobalXPBar() {
  const bar = document.getElementById('global-xp-fill');
  const hRank = document.getElementById('header-rank');
  const hLevel = document.getElementById('header-level');
  const hXpText = document.getElementById('global-xp-text');
  if (!bar) return;
  
  const currentLevel = state.system.level;
  const currentXp = state.system.xp;
  const reqXp = getRequiredXP(currentLevel);
  const rank = getRank(currentLevel);
  
  const pct = Math.min(100, Math.max(0, (currentXp / reqXp) * 100));
  bar.style.width = pct + '%';
  bar.style.background = `linear-gradient(90deg, ${rank.color}, #fff)`;
  bar.style.boxShadow = `0 0 15px ${rank.color}`;
  
  if (hRank) {
    hRank.textContent = rank.name;
    hRank.style.color = rank.color;
    hRank.style.textShadow = rank.glow || 'none';
  }
  if (hLevel) {
    hLevel.textContent = `LVL ${currentLevel}`;
  }
  if (hXpText) {
    hXpText.textContent = `${currentXp} / ${reqXp} XP`;
  }
}

function showLevelUpModal(newLevel, levelsGained) {
  if (navigator.vibrate) navigator.vibrate([100, 50, 100]);
  const modal = document.getElementById('levelup-modal');
  if (!modal) return;
  const rank = getRank(newLevel);
  
  document.getElementById('levelup-level-text').textContent = `Nivel ${newLevel}`;
  document.getElementById('levelup-rank-text').textContent = rank.name;
  document.getElementById('levelup-rank-text').style.color = rank.color;
  document.getElementById('levelup-rank-text').style.borderColor = rank.color;
  document.getElementById('levelup-rank-text').style.boxShadow = rank.glow || 'none';
  document.getElementById('levelup-rank-text').style.textShadow = rank.textStyle ? 'none' : (rank.glow || 'none');
  
  modal.classList.add('active');
}

function closeLevelUpModal() {
  const modal = document.getElementById('levelup-modal');
  if (modal) modal.classList.remove('active');
}

let activeQuestId = null;

function openQuestModal(id) {
  const q = QUESTS[id];
  if (!q) return;
  activeQuestId = id;
  
  document.getElementById('quest-modal-title').textContent = q.name;
  document.getElementById('quest-modal-body').innerHTML = `
    <div style="font-style: italic; color: var(--accent); margin-bottom: 15px;">Misiune: ${q.instruction || 'Citește cu atenție:'}</div>
    ${q.text || q.instruction}
  `;
  document.getElementById('quest-modal').classList.add('active');
}

function closeQuestModal() {
  document.getElementById('quest-modal').classList.remove('active');
}

function completeQuestFromModal() {
  if (activeQuestId) {
    toggleHabit(todayKey(), activeQuestId);
    closeQuestModal();
  }
}

// =================== NAVIGATION ===================
function navigate(page) {
  currentPage = page;
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.page === page);
  });
  render();
}

function render() {
  const pageEl = document.getElementById('page-content');
  document.getElementById('date-pill').textContent = formatDate(todayKey()).toUpperCase();
  updateGlobalXPBar();
  pageEl.className = 'fade-in';
  
  // force reflow to trigger animation
  void pageEl.offsetWidth;

  if (currentPage === 'home') renderHome(pageEl);
  else if (currentPage === 'workout') renderWorkout(pageEl);
  else if (currentPage === 'progress') renderProgress(pageEl);
  else if (currentPage === 'history') renderHistory(pageEl);
  else if (currentPage === 'profile') renderProfile(pageEl);
  
  window.scrollTo(0, 0);
}

// =================== HOME PAGE ===================
function renderHome(el) {
  const today = todayKey();
  const habits = state.habits[today] || {};
  const todayWorkout = state.workouts[today];
  const isWorkoutFinished = habits.workout_xp_claimed;
  
  const totalWorkouts = Object.keys(state.workouts).filter(d => 
    state.workouts[d].dayKey !== 'recovery' && (hasAnyData(state.workouts[d]) || state.habits[d]?.workout_xp_claimed)
  ).length;
  
  const questsHtml = Object.values(QUESTS).map(q => {
    const isDone = habits[q.id];
    if (q.id === 'workout') {
       return `
         <div class="quest-item ${isWorkoutFinished ? 'done' : ''}" style="cursor: default;">
           <div class="quest-icon"><img src="${q.img}" style="width:100%; height:100%; object-fit: cover; border-radius: 4px; box-shadow: 0 0 5px var(--accent);"></div>
           <div class="quest-info">
             <div class="quest-name">${q.name}</div>
             <div class="quest-xp">+${q.xp} XP</div>
           </div>
           <div class="quest-checkbox">
             <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7"/></svg>
           </div>
         </div>
       `;
    }
    
    return `
      <div class="quest-item ${isDone ? 'done' : ''}" onclick="openQuestModal('${q.id}')">
        <div class="quest-icon"><img src="${q.img}" style="width:100%; height:100%; object-fit: cover; border-radius: 4px; box-shadow: 0 0 5px var(--accent);"></div>
        <div class="quest-info">
          <div class="quest-name">${q.name}</div>
          <div class="quest-xp">+${q.xp} XP</div>
        </div>
        <div class="quest-checkbox" onclick="event.stopPropagation(); toggleHabit('${today}', '${q.id}')">
          <svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7"/></svg>
        </div>
      </div>
    `;
  }).join('');
  
  el.innerHTML = `
    <div class="greeting-card">
      <div class="greeting">SISTEMUL TE SALUTĂ,</div>
      <div class="greeting-name">${escapeHtml(state.profile.name || 'Jucător').toUpperCase()}</div>
      <div class="greeting-stats">
        <span><strong>${totalWorkouts}</strong> antrenamente</span>
        <span><strong>${state.system.perfectStreak}</strong> zile perfecte</span>
      </div>
    </div>

    <div class="quests-container">
      <div class="section-subtitle" style="color: var(--accent); margin-bottom: 12px;">Misiuni Zilnice</div>
      ${questsHtml}
    </div>

    ${(todayWorkout && !isWorkoutFinished) ? `
      <div class="card" style="border-color: var(--accent); background: linear-gradient(135deg, var(--bg-surface), rgba(0,240,255,0.05)); cursor: pointer;" onclick="openWorkout('${today}', '${todayWorkout.dayKey}')">
        <div class="section-subtitle" style="color: var(--accent); margin-bottom: 4px;">⚡ Antrenament în curs azi</div>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 6px;">
          <div>
            <div style="font-family: 'Bebas Neue'; font-size: 28px; letter-spacing: 1.5px; color: var(--text-primary);">${window.PROGRAM[todayWorkout.dayKey]?.name || 'Custom'}</div>
            <div style="font-size: 13px; color: var(--text-secondary); margin-top: 2px;">Apasă pentru a continua</div>
          </div>
          <div style="color: var(--accent);">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="32" height="32" stroke-width="2"><path d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
          </div>
        </div>
      </div>
    ` : ''}

    <div class="section-title">Alege antrenamentul</div>
    <div class="day-grid">
      ${window.DAY_ORDER.map((key, idx) => {
        const day = window.PROGRAM[key];
        const isRecovery = key === 'recovery';
        return `
          <button class="day-btn ${isRecovery ? 'recovery' : ''}" onclick="startWorkout('${key}')">
            <div class="day-btn-num">${isRecovery ? 'ZIUA 7' : 'ZIUA ' + (idx + 1)}</div>
            <div class="day-btn-name">${day.name}</div>
            <div class="day-btn-focus">${day.focus}</div>
          </button>
        `;
      }).join('')}
    </div>
  `;
}

function hasAnyData(workout) {
  if (!workout || !workout.exercises) return false;
  return Object.values(workout.exercises).some(ex => {
    if (!ex || !ex.sets) return false;
    return ex.sets.some(s => {
      const k = String(s.kg || '').trim();
      const r = String(s.reps || '').trim();
      return k !== '' || r !== '';
    });
  });
}

function computeStreak() {
  const dates = Object.keys(state.workouts)
    .filter(d => hasAnyData(state.workouts[d]))
    .sort()
    .reverse();
  if (dates.length === 0) return 0;
  
  let streak = 0;
  let cursor = new Date();
  cursor.setHours(0, 0, 0, 0);
  
  for (let i = 0; i < 60; i++) {
    const key = cursor.toISOString().split('T')[0];
    if (dates.includes(key)) {
      streak++;
    } else if (streak > 0 && i > 1) {
      break;
    }
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function startWorkout(dayKey) {
  const today = todayKey();
  if (!state.workouts[today]) {
    state.workouts[today] = { dayKey, exercises: {} };
  } else if (state.workouts[today].dayKey !== dayKey) {
    if (!confirm(`Astăzi ai început deja ${window.PROGRAM[state.workouts[today].dayKey]?.name || 'un antrenament'}. Vrei să schimbi cu ${window.PROGRAM[dayKey].name}? (datele actuale se vor pierde)`)) {
      return;
    }
    state.workouts[today] = { dayKey, exercises: {} };
  }
  saveState();
  openWorkout(today, dayKey);
}

function openWorkout(dateKey, dayKey) {
  currentWorkoutDate = dateKey;
  currentDayKey = dayKey;
  currentPage = 'workout';
  render();
}

// =================== WORKOUT PAGE ===================
function renderWorkout(el) {
  const day = window.PROGRAM[currentDayKey];
  const workout = state.workouts[currentWorkoutDate] || { dayKey: currentDayKey, exercises: {} };
  
  // Combine PROGRAM exercises and any custom exercises added to this workout session
  const programmedExIds = day.exercises.map(e => e.id);
  const customExIds = Object.keys(workout.exercises).filter(id => !programmedExIds.includes(id));
  
  const allExercisesToRender = [
    ...day.exercises,
    ...customExIds.map(id => getExerciseMeta(id))
  ];

  el.innerHTML = `
    <button class="back-btn" onclick="navigate('home')">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="16" height="16" stroke-width="2.5"><path d="M15 19l-7-7 7-7"/></svg>
      Înapoi
    </button>

    <div class="workout-header">
      <div class="workout-title">${day.name}</div>
      <div class="workout-focus">${day.focus} • ${formatDate(currentWorkoutDate)}</div>
    </div>

    <div id="exercises-container">
      ${allExercisesToRender.map((ex, idx) => renderExerciseCard(ex, idx, workout)).join('')}
    </div>

    <button class="add-custom-exercise-btn" onclick="openCustomExerciseModal()">
      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" stroke-width="2.5"><path d="M12 4v16m8-8H4"/></svg>
      ADAUGĂ EXERCIȚIU CUSTOM
    </button>

    <button class="finish-workout" onclick="finishWorkout()">SALVEAZĂ ANTRENAMENTUL</button>
  `;
}

function renderExerciseCard(ex, idx, workout) {
  const exData = workout.exercises[ex.id] || { sets: [{ kg: '', reps: '', unit: ex.defaultUnit || 'total' }, { kg: '', reps: '', unit: ex.defaultUnit || 'total' }, { kg: '', reps: '', unit: ex.defaultUnit || 'total' }], notes: '' };
  const lastEntry = findLastExerciseEntry(ex.id, currentWorkoutDate);
  
  let lastDisplay = '';
  let overloadHint = '';
  
  if (lastEntry) {
    const validSets = lastEntry.sets.filter(s => s.kg && s.reps);
    if (validSets.length > 0) {
      const best = validSets.reduce((max, s) => {
        const t = computeTotalKg(s);
        return t > max.total ? { total: t, set: s } : max;
      }, { total: 0, set: validSets[0] });
      lastDisplay = `LAST: ${displayKg(best.set)} × ${best.set.reps}`;
      
      const totalSets = validSets.length;
      const lastKg = parseFloat(best.set.kg) || 0;
      const lastReps = parseInt(best.set.reps) || 0;
      
      overloadHint = `Data trecută: ${totalSets} seturi. Target azi: 📈 ${lastKg + 2.5}kg sau ${lastReps + 1} reps (la ${lastKg}kg)`;
    }
  }

  return `
    <div class="exercise-card" id="card-${ex.id}">
      <div class="exercise-header">
        <div style="flex: 1; min-width: 0;">
          <div class="exercise-num">#${String(idx + 1).padStart(2, '0')} • ${ex.target || 'Custom'}</div>
          <div class="exercise-name">${escapeHtml(ex.name)}</div>
          <div class="exercise-target">${escapeHtml(ex.note || 'Custom exercise')}</div>
          ${overloadHint ? `<div class="overload-hint">${overloadHint}</div>` : ''}
        </div>
        <div class="last-time-pill ${lastDisplay ? '' : 'no-data'}">
          ${lastDisplay || 'PRIMĂ DATĂ'}
        </div>
      </div>
      <div class="exercise-body">
        ${renderUnitToggle(ex.id, exData.sets[0]?.unit || ex.defaultUnit || 'total')}
        <div class="sets-table" id="sets-${ex.id}">
          <div class="sets-header">#</div>
          <div class="sets-header">KG</div>
          <div class="sets-header">REPS</div>
          <div class="sets-header">VOL</div>
          <div class="sets-header"></div>
          ${exData.sets.map((set, sIdx) => renderSetRow(ex.id, sIdx, set)).join('')}
        </div>
        <button class="add-set-btn" onclick="addSet('${ex.id}')">+ Adaugă set</button>
        
        <div class="exercise-actions">
          <button class="action-btn" onclick="toggleNotes('${ex.id}')">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M12 20h9M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z"/></svg>
            Notă
          </button>
          ${lastEntry ? `
            <button class="action-btn" onclick="copyLastSets('${ex.id}')">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2"><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2M10 8h8a2 2 0 012 2v8a2 2 0 01-2 2h-8a2 2 0 01-2-2v-8a2 2 0 012-2z"/></svg>
              Copiază
            </button>
          ` : ''}
        </div>
        <textarea class="notes-area ${exData.notes ? '' : 'hidden'}" id="notes-${ex.id}" placeholder="Notă (ex: 'Mă durea umărul...')" onchange="saveNote('${ex.id}', this.value)">${escapeHtml(exData.notes || '')}</textarea>
      </div>
    </div>
  `;
}

function renderUnitToggle(exId, currentUnit) {
  return `
    <div class="unit-toggle" id="unit-toggle-${exId}">
      <button class="${currentUnit === 'total' ? 'active' : ''}" onclick="setUnit('${exId}', 'total')">TOTAL</button>
      <button class="${currentUnit === 'side' ? 'active' : ''}" onclick="setUnit('${exId}', 'side')">/ SIDE</button>
      <button class="${currentUnit === 'db' ? 'active' : ''}" onclick="setUnit('${exId}', 'db')">DB EA</button>
    </div>
  `;
}

function renderSetRow(exId, sIdx, set) {
  const totalKg = set.kg && set.reps ? computeTotalKg(set) : 0;
  const volume = totalKg && set.reps ? Math.round(totalKg * parseFloat(set.reps)) : 0;
  const isDone = set.kg && set.reps;
  
  let ghostKg = '';
  let ghostReps = '';
  const lastEntry = findLastExerciseEntry(exId, currentWorkoutDate);
  if (lastEntry && lastEntry.sets[sIdx]) {
    ghostKg = lastEntry.sets[sIdx].kg || '';
    ghostReps = lastEntry.sets[sIdx].reps || '';
  }
  
  return `
    <div class="set-row" data-sidx="${sIdx}">
      <div class="set-num">${sIdx + 1}</div>
      <input type="number" inputmode="decimal" step="0.5" class="set-input ${isDone ? 'done' : ''}" 
             value="${set.kg || ''}" placeholder="${ghostKg || '0'}" 
             onfocus="this.select()" enterkeyhint="next"
             onchange="updateSet('${exId}', ${sIdx}, 'kg', this.value)">
      <input type="number" inputmode="numeric" class="set-input ${isDone ? 'done' : ''}" 
             value="${set.reps || ''}" placeholder="${ghostReps || '0'}" 
             onfocus="this.select()" enterkeyhint="next"
             onchange="updateSet('${exId}', ${sIdx}, 'reps', this.value)">
      <div class="set-vol">
        ${volume || '—'}
      </div>
      <button class="set-delete" onclick="deleteSet('${exId}', ${sIdx})">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" width="20" height="20" stroke-width="2"><path d="M6 18L18 6M6 6l12 12"/></svg>
      </button>
    </div>
  `;
}

function ensureExercise(exId) {
  if (!state.workouts[currentWorkoutDate]) {
    state.workouts[currentWorkoutDate] = { dayKey: currentDayKey, exercises: {} };
  }
  if (!state.workouts[currentWorkoutDate].exercises[exId]) {
    const meta = getExerciseMeta(exId);
    state.workouts[currentWorkoutDate].exercises[exId] = {
      sets: [
        { kg: '', reps: '', unit: meta.defaultUnit || 'total' },
        { kg: '', reps: '', unit: meta.defaultUnit || 'total' },
        { kg: '', reps: '', unit: meta.defaultUnit || 'total' }
      ],
      notes: ''
    };
  }
  return state.workouts[currentWorkoutDate].exercises[exId];
}

function updateSet(exId, sIdx, field, value) {
  const exData = ensureExercise(exId);
  if (!exData.sets[sIdx]) {
    const meta = getExerciseMeta(exId);
    exData.sets[sIdx] = { kg: '', reps: '', unit: meta.defaultUnit || 'total' };
  }
  exData.sets[sIdx][field] = value;
  saveState();
  
  // Sub-component re-render for performance & stability
  const container = document.getElementById(`sets-${exId}`);
  if (container) {
    const set = exData.sets[sIdx];
    const totalKg = set.kg && set.reps ? computeTotalKg(set) : 0;
    const volume = totalKg && set.reps ? Math.round(totalKg * parseFloat(set.reps)) : 0;
    const isDone = set.kg && set.reps;
    
    // Find the inputs and vol element for this specific row using attribute selector
    const rowInputs = container.querySelectorAll(`[data-sidx="${sIdx}"] .set-input`);
    const volEl = container.querySelector(`[data-sidx="${sIdx}"] .set-vol`);
    
    rowInputs.forEach(inp => inp.classList.toggle('done', isDone));
    if (volEl) volEl.textContent = volume || '—';

    // Highlight card if fully completed
    const card = document.getElementById(`card-${exId}`);
    if (card && exData.sets.every(s => s.kg && s.reps)) {
        card.classList.add('active-exercise');
        setTimeout(() => card.classList.remove('active-exercise'), 500);
    }
  }
}

function setUnit(exId, unit) {
  const exData = ensureExercise(exId);
  if (exData.sets.length === 0) {
    exData.sets = [{ kg: '', reps: '', unit }, { kg: '', reps: '', unit }, { kg: '', reps: '', unit }];
  } else {
    exData.sets.forEach(s => s.unit = unit);
  }
  saveState();
  // Re-render only the sets table and unit toggle
  const container = document.getElementById(`sets-${exId}`);
  const toggle = document.getElementById(`unit-toggle-${exId}`);
  if (container && toggle) {
      container.innerHTML = `
        <div class="sets-header">#</div>
        <div class="sets-header">KG</div>
        <div class="sets-header">REPS</div>
        <div class="sets-header">VOL</div>
        <div class="sets-header"></div>
        ${exData.sets.map((set, sIdx) => renderSetRow(exId, sIdx, set)).join('')}
      `;
      toggle.innerHTML = `
        <button class="${unit === 'total' ? 'active' : ''}" onclick="setUnit('${exId}', 'total')">TOTAL</button>
        <button class="${unit === 'side' ? 'active' : ''}" onclick="setUnit('${exId}', 'side')">/ SIDE</button>
        <button class="${unit === 'db' ? 'active' : ''}" onclick="setUnit('${exId}', 'db')">DB EA</button>
      `;
  }
}

function addSet(exId) {
  if (navigator.vibrate) navigator.vibrate(10);
  const exData = ensureExercise(exId);
  const meta = getExerciseMeta(exId);
  const lastUnit = exData.sets[exData.sets.length - 1]?.unit || meta.defaultUnit || 'total';
  exData.sets.push({ kg: '', reps: '', unit: lastUnit });
  saveState();
  
  const container = document.getElementById(`sets-${exId}`);
  if (container) {
     const sIdx = exData.sets.length - 1;
     // Append new row markup
     container.insertAdjacentHTML('beforeend', renderSetRow(exId, sIdx, exData.sets[sIdx]));
  }
}

function deleteSet(exId, sIdx) {
  if (navigator.vibrate) navigator.vibrate(10);
  const exData = ensureExercise(exId);
  exData.sets.splice(sIdx, 1);
  saveState();
  // Re-render sets table completely
  const container = document.getElementById(`sets-${exId}`);
  if (container) {
      container.innerHTML = `
        <div class="sets-header">#</div>
        <div class="sets-header">KG</div>
        <div class="sets-header">REPS</div>
        <div class="sets-header">VOL</div>
        <div class="sets-header"></div>
        ${exData.sets.map((set, idx) => renderSetRow(exId, idx, set)).join('')}
      `;
  }
}

function toggleNotes(exId) {
  const ta = document.getElementById('notes-' + exId);
  if (ta) {
    ta.classList.toggle('hidden');
    if (!ta.classList.contains('hidden')) ta.focus();
  }
}

function saveNote(exId, value) {
  const exData = ensureExercise(exId);
  exData.notes = value;
  saveState();
}

function copyLastSets(exId) {
  const last = findLastExerciseEntry(exId, currentWorkoutDate);
  if (!last) return;
  const exData = ensureExercise(exId);
  exData.sets = last.sets.map(s => ({ kg: s.kg, reps: s.reps, unit: s.unit }));
  saveState();
  showToast('✅ Seturi copiate. Acum progresează!');
  render(); // complete re-render for simplicity here
}

function finishWorkout() {
  if (navigator.vibrate) navigator.vibrate([20, 50, 20]);
  
  const today = todayKey();
  if (!state.habits[today]) state.habits[today] = {};
  if (!state.habits[today].workout_xp_claimed) {
     state.habits[today].workout_xp_claimed = true;
     addXP(QUESTS.workout.xp, 'Antrenament Finalizat');
     checkPerfectDay(today);
  }
  
  saveState();
  showToast('💪 Antrenament salvat cu succes!');
  setTimeout(() => navigate('home'), 1000);
}

// Custom Exercises
function openCustomExerciseModal() {
  document.getElementById('custom-ex-modal').classList.add('active');
  document.getElementById('custom-ex-name').focus();
}

function closeCustomExerciseModal() {
  document.getElementById('custom-ex-modal').classList.remove('active');
  document.getElementById('custom-ex-name').value = '';
}

function addCustomExercise() {
  if (navigator.vibrate) navigator.vibrate(15);
  const name = document.getElementById('custom-ex-name').value.trim();
  if (!name) {
    showToast('❌ Numele este obligatoriu');
    return;
  }
  
  let existingId = Object.keys(state.customExercises).find(
    id => state.customExercises[id].name.toLowerCase() === name.toLowerCase()
  );
  
  const unit = document.getElementById('custom-ex-unit').value;
  const id = existingId || 'custom_' + Date.now();
  
  if (!existingId) {
    state.customExercises[id] = {
      name: name,
      target: 'Custom',
      defaultUnit: unit,
      note: ''
    };
  }
  
  ensureExercise(id);
  if (!state.workouts[currentWorkoutDate].exercises[id].sets || state.workouts[currentWorkoutDate].exercises[id].sets.length === 0) {
    state.workouts[currentWorkoutDate].exercises[id].sets = [
      { kg: '', reps: '', unit: unit },
      { kg: '', reps: '', unit: unit },
      { kg: '', reps: '', unit: unit }
    ];
  }
  
  saveState();
  closeCustomExerciseModal();
  render();
  showToast('✅ Exercițiu adăugat');
}

// =================== PROGRESS PAGE ===================
let progressRange = '4w';
let progressSearch = '';

function renderProgress(el) {
  const allExercises = getAllExercises();
  const cutoff = getRangeCutoff(progressRange);
  const totals = computeTotals(cutoff);

  const ranges = [
    { key: '1w', label: '7 zile' },
    { key: '2w', label: '2 săpt' },
    { key: '4w', label: '4 săpt' },
    { key: '8w', label: '8 săpt' },
    { key: '3m', label: '3 luni' },
    { key: '6m', label: '6 luni' },
    { key: 'all', label: 'Total' }
  ];

  el.innerHTML = `
    <div class="section-title">Progres</div>
    <div class="range-selector">
      ${ranges.map(r => `
        <button class="range-btn ${progressRange === r.key ? 'active' : ''}" onclick="setRange('${r.key}')">${r.label}</button>
      `).join('')}
    </div>

    <div class="metric-stats">
      <div class="metric-card">
        <div class="metric-label">Antrenamente</div>
        <div class="metric-value">${totals.workouts}</div>
        <div class="metric-delta ${totals.workoutsDelta > 0 ? 'up' : totals.workoutsDelta < 0 ? 'down' : 'flat'}">
          ${totals.workoutsDelta > 0 ? '↗' : totals.workoutsDelta < 0 ? '↘' : '—'} vs anterior
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Volum (kg)</div>
        <div class="metric-value">${formatNumber(totals.volume)}</div>
        <div class="metric-delta ${totals.volumeDelta > 0 ? 'up' : totals.volumeDelta < 0 ? 'down' : 'flat'}">
          ${totals.volumeDelta > 0 ? '+' : ''}${formatNumber(totals.volumeDelta)}
        </div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Total seturi</div>
        <div class="metric-value">${totals.sets}</div>
      </div>
      <div class="metric-card">
        <div class="metric-label">Total reps</div>
        <div class="metric-value">${formatNumber(totals.reps)}</div>
      </div>
    </div>

    <div class="section-subtitle">EVOLUȚIE PE EXERCIȚII</div>
    <input type="text" class="exercise-search" placeholder="🔍 Caută exercițiu..." 
           value="${escapeHtml(progressSearch)}" oninput="setProgressSearch(this.value)">

    <div id="progress-list">
      ${renderProgressList(allExercises, cutoff)}
    </div>
  `;
}

function setRange(key) {
  progressRange = key;
  render();
}

function setProgressSearch(val) {
  progressSearch = val;
  document.getElementById('progress-list').innerHTML = renderProgressList(getAllExercises(), getRangeCutoff(progressRange));
}

function getAllExercises() {
  const all = {};
  Object.entries(state.workouts).forEach(([date, w]) => {
    Object.entries(w.exercises || {}).forEach(([exId, exData]) => {
      const validSets = (exData.sets || []).filter(s => s.kg && s.reps);
      if (validSets.length === 0) return;
      if (!all[exId]) all[exId] = { entries: [] };
      all[exId].entries.push({ date, sets: validSets });
    });
  });
  Object.keys(all).forEach(exId => {
    const meta = getExerciseMeta(exId);
    all[exId].name = meta.name;
    all[exId].target = meta.target;
  });
  return all;
}

function renderProgressList(allExercises, cutoff) {
  const filtered = Object.entries(allExercises)
    .filter(([id, data]) => {
      if (progressSearch && !data.name.toLowerCase().includes(progressSearch.toLowerCase())) return false;
      return data.entries.some(e => !cutoff || e.date >= cutoff);
    })
    .sort((a, b) => a[1].name.localeCompare(b[1].name));

  if (filtered.length === 0) {
    return `
      <div class="empty-state">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
        </svg>
        <div style="font-size: 16px; color: var(--text-primary); margin-bottom: 8px;">Niciun exercițiu găsit</div>
        <div style="font-size: 12px;">Începe un antrenament și revino aici.</div>
      </div>
    `;
  }

  return filtered.map(([exId, data]) => {
    const inRange = data.entries.filter(e => !cutoff || e.date >= cutoff).sort((a, b) => a.date.localeCompare(b.date));
    if (inRange.length === 0) return '';

    const sessionStats = inRange.map(entry => {
      const maxKg = Math.max(...entry.sets.map(s => computeTotalKg(s)));
      const maxReps = Math.max(...entry.sets.map(s => parseFloat(s.reps) || 0));
      const volume = entry.sets.reduce((sum, s) => sum + computeTotalKg(s) * (parseFloat(s.reps) || 0), 0);
      return { date: entry.date, maxKg, maxReps, volume };
    });

    const first = sessionStats[0];
    const last = sessionStats[sessionStats.length - 1];
    const kgDelta = last.maxKg - first.maxKg;
    const volDelta = last.volume - first.volume;
    
    const bestKg = Math.max(...sessionStats.map(s => s.maxKg));

    return `
      <div class="progress-exercise">
        <div class="progress-exercise-header">
          <div class="progress-exercise-name">${escapeHtml(data.name)}</div>
          <div style="font-family: 'JetBrains Mono'; font-size: 11px; color: var(--text-tertiary);">${inRange.length} sesiuni</div>
        </div>
        <div class="progress-stats">
          <div class="progress-stat ${kgDelta > 0 ? 'delta-up' : kgDelta < 0 ? 'delta-down' : ''}">
            <div class="progress-stat-label">Greutate</div>
            <div class="progress-stat-value">${kgDelta >= 0 ? '+' : ''}${kgDelta.toFixed(1)}kg</div>
          </div>
          <div class="progress-stat ${volDelta > 0 ? 'delta-up' : volDelta < 0 ? 'delta-down' : ''}">
            <div class="progress-stat-label">Volum</div>
            <div class="progress-stat-value">${volDelta >= 0 ? '+' : ''}${formatNumber(volDelta)}</div>
          </div>
          <div class="progress-stat">
            <div class="progress-stat-label">PR Greutate</div>
            <div class="progress-stat-value">${bestKg.toFixed(0)}kg</div>
          </div>
        </div>
        <div class="chart-container">
          ${renderChart(sessionStats)}
        </div>
      </div>
    `;
  }).join('');
}

function renderChart(stats) {
  if (stats.length < 2) {
    return `<div style="text-align:center; color: var(--text-tertiary); font-size: 12px; padding-top: 45px;">Mai e nevoie de 1 sesiune pentru grafic</div>`;
  }

  const W = 320, H = 120, P = 16;
  const maxVol = Math.max(...stats.map(s => s.volume));
  const minVol = Math.min(...stats.map(s => s.volume));
  const range = maxVol - minVol || 1;

  const points = stats.map((s, i) => {
    const x = P + (i / (stats.length - 1)) * (W - P * 2);
    const y = H - P - ((s.volume - minVol) / range) * (H - P * 2);
    return { x, y, ...s };
  });

  const pathD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ');
  const areaD = `${pathD} L ${points[points.length - 1].x} ${H - P} L ${points[0].x} ${H - P} Z`;

  // Use accent color from CSS variables logic
  const color = '#00f0ff';

  return `
    <svg viewBox="0 0 ${W} ${H}" style="width: 100%; height: 100%;" preserveAspectRatio="none">
      <defs>
        <linearGradient id="grad-${Math.random().toString(36).substr(2,9)}" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${areaD}" fill="url(#grad-${Math.random().toString(36).substr(2,9)})"/>
      <path d="${pathD}" fill="none" stroke="${color}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" style="filter: drop-shadow(0 4px 6px rgba(0,240,255,0.4))"/>
      ${points.map(p => `<circle cx="${p.x}" cy="${p.y}" r="4" fill="${color}" stroke="var(--bg-surface)" stroke-width="2"/>`).join('')}
    </svg>
  `;
}

function getRangeCutoff(range) {
  if (range === 'all') return null;
  const d = new Date();
  if (range === '1w') d.setDate(d.getDate() - 7);
  else if (range === '2w') d.setDate(d.getDate() - 14);
  else if (range === '4w') d.setDate(d.getDate() - 28);
  else if (range === '8w') d.setDate(d.getDate() - 56);
  else if (range === '3m') d.setMonth(d.getMonth() - 3);
  else if (range === '6m') d.setMonth(d.getMonth() - 6);
  return d.toISOString().split('T')[0];
}

function computeTotals(cutoff) {
  let workouts = 0, volume = 0, sets = 0, reps = 0;
  let prevWorkouts = 0, prevVolume = 0;
  
  const prevCutoff = cutoff ? (() => {
    const days = Math.round((new Date(todayKey()) - new Date(cutoff)) / 86400000);
    const d = new Date(cutoff);
    d.setDate(d.getDate() - days);
    return d.toISOString().split('T')[0];
  })() : null;

  Object.entries(state.workouts).forEach(([date, w]) => {
    if (!hasAnyData(w)) return;
    const inCurrent = !cutoff || date >= cutoff;
    const inPrev = prevCutoff && date >= prevCutoff && date < cutoff;
    
    let workoutVol = 0, workoutSets = 0, workoutReps = 0;
    Object.values(w.exercises || {}).forEach(ex => {
      (ex.sets || []).forEach(s => {
        if (s.kg && s.reps) {
          const vol = computeTotalKg(s) * parseFloat(s.reps);
          workoutVol += vol;
          workoutSets++;
          workoutReps += parseFloat(s.reps);
        }
      });
    });
    
    if (inCurrent) {
      workouts++;
      volume += workoutVol;
      sets += workoutSets;
      reps += workoutReps;
    }
    if (inPrev) {
      prevWorkouts++;
      prevVolume += workoutVol;
    }
  });

  return {
    workouts, volume: Math.round(volume), sets, reps: Math.round(reps),
    workoutsDelta: workouts - prevWorkouts,
    volumeDelta: Math.round(volume - prevVolume)
  };
}

function formatNumber(n) {
  if (Math.abs(n) >= 1000) return (n / 1000).toFixed(1).replace('.0', '') + 'k';
  return Math.round(n).toString();
}

// =================== HISTORY PAGE ===================
function renderHistory(el) {
  const dates = Object.keys(state.workouts)
    .filter(d => hasAnyData(state.workouts[d]))
    .sort()
    .reverse();

  if (dates.length === 0) {
    el.innerHTML = `
      <div class="section-title">Istoric</div>
      <div class="empty-state">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="1.5">
          <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/>
        </svg>
        <div style="font-size: 16px; color: var(--text-primary); margin-bottom: 8px;">Niciun antrenament salvat încă</div>
        <div style="font-size: 12px;">Apasă "Alege antrenamentul" din meniul Acasă.</div>
      </div>
    `;
    return;
  }

  el.innerHTML = `
    <div class="section-title">Istoric</div>
    ${dates.map(date => {
      const w = state.workouts[date];
      const day = window.PROGRAM[w.dayKey];
      let totalVol = 0, totalSets = 0;
      const exerciseSummary = [];
      
      Object.entries(w.exercises || {}).forEach(([exId, exData]) => {
        const validSets = (exData.sets || []).filter(s => s.kg && s.reps);
        if (validSets.length === 0) return;
        let exVol = 0;
        validSets.forEach(s => {
          exVol += computeTotalKg(s) * parseFloat(s.reps);
          totalSets++;
        });
        totalVol += exVol;
        const exMeta = getExerciseMeta(exId);
        exerciseSummary.push({
          name: exMeta?.name || exId,
          sets: validSets.length,
          best: validSets.reduce((b, s) => computeTotalKg(s) > computeTotalKg(b) ? s : b, validSets[0])
        });
      });

      return `
        <div class="history-day" onclick="openWorkout('${date}', '${w.dayKey}')">
          <div class="history-day-header">
            <div>
              <div class="history-day-name">${day?.name || 'Custom'}</div>
              <div class="history-date">${formatDateShort(date)} • ${formatDate(date)}</div>
            </div>
            <div style="text-align: right;">
              <div class="history-volume">${formatNumber(totalVol)} kg</div>
              <div class="history-volume" style="font-size: 11px; color: var(--text-tertiary); margin-top: 2px;">${totalSets} seturi</div>
            </div>
          </div>
          <div class="history-exercises">
            ${exerciseSummary.map(ex => `
              <div class="history-exercise-row">
                <div class="history-exercise-name">${escapeHtml(ex.name)}</div>
                <div class="history-exercise-stats">
                  ${ex.sets}× ${displayKg(ex.best)} × ${ex.best.reps}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      `;
    }).join('')}
  `;
}

// =================== PROFILE / PLAYER STATUS ===================
function renderProfile(el) {
  const lvl = state.system.level;
  const rank = getRank(lvl);
  const reqXp = getRequiredXP(lvl);
  const totalWorkouts = Object.keys(state.workouts).filter(d => hasAnyData(state.workouts[d])).length;
  const p = state.profile;

  el.innerHTML = `
    <div class="section-title">STATUS JUCĂTOR</div>
    
    <div class="player-status-card">
       <div class="player-rank-badge" style="color: ${rank.color}; border-color: ${rank.color}; background: ${rank.bg}; box-shadow: ${rank.glow || 'none'}; ${rank.textStyle || ''}">
         ${rank.name}
       </div>
       <div class="player-level-big" style="color: ${rank.color}; text-shadow: ${rank.glow || 'none'}">${lvl}</div>
       <div class="player-xp-detail">${state.system.xp} / ${reqXp} XP</div>
       
       <div class="player-stats-grid">
         <div class="p-stat-box">
           <div class="p-stat-label">Zile Perfecte</div>
           <div class="p-stat-val">${state.system.perfectStreak}</div>
         </div>
         <div class="p-stat-box">
           <div class="p-stat-label">Antrenamente</div>
           <div class="p-stat-val">${totalWorkouts}</div>
         </div>
       </div>
    </div>

    <div class="section-title" style="margin-top: 32px;">SETĂRI PROFIL</div>
    <div class="card">
      <div class="profile-header">
        <div class="avatar" onclick="document.getElementById('photo-input').click()">
          ${p.photo ? `<img src="${p.photo}" alt="Avatar">` : (p.name?.[0] || 'A').toUpperCase()}
          <div class="avatar-edit">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2.5"><path d="M12 5v14M5 12h14"/></svg>
          </div>
        </div>
        <input type="file" id="photo-input" accept="image/*" style="display:none" onchange="handlePhotoUpload(event)">
        <div class="profile-name">${escapeHtml(p.name || 'ALEX').toUpperCase()}</div>
        <div class="profile-meta">${p.age ? p.age + ' ani' : ''}${p.weight ? ' • ' + p.weight + ' kg' : ''}${p.height ? ' • ' + p.height + ' cm' : ''}</div>
      </div>
    </div>

    <div class="card">
      <div class="section-subtitle">Date Personale</div>
      
      <div class="form-group">
        <label class="form-label">Nume</label>
        <input type="text" class="form-input" id="p-name" value="${escapeHtml(p.name || '')}" 
               onchange="updateProfile('name', this.value)">
      </div>

      <div class="form-row">
        <div class="form-group">
          <label class="form-label">Vârstă</label>
          <input type="number" class="form-input" value="${p.age || ''}" 
                 onchange="updateProfile('age', this.value)">
        </div>
        <div class="form-group">
          <label class="form-label">Înălțime (cm)</label>
          <input type="number" class="form-input" value="${p.height || ''}" 
                 onchange="updateProfile('height', this.value)">
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Greutate Actuală (kg)</label>
        <input type="number" step="0.1" class="form-input" value="${p.weight || ''}" 
               onchange="updateProfile('weight', this.value)">
      </div>
    </div>

    <div class="card">
      <div class="section-subtitle">Obiective</div>
      <div class="goals-list">
        ${(p.goals || []).map((g, idx) => `
          <div class="goal-item">
            <div class="goal-text">${escapeHtml(g)}</div>
            <button class="goal-delete" onclick="deleteGoal(${idx})">✕</button>
          </div>
        `).join('')}
      </div>
      <div class="add-goal-row">
        <input type="text" class="form-input" id="new-goal" placeholder="Ex: Bench 100kg..." 
               onkeypress="if(event.key==='Enter') addGoal()">
        <button class="add-goal-btn" onclick="addGoal()">ADAUGĂ</button>
      </div>
    </div>

    <div class="card">
      <div class="section-subtitle">Setări Bară</div>
      <div class="form-group">
        <label class="form-label">Greutate Bară Olimpică (kg)</label>
        <input type="number" step="0.5" class="form-input" value="${state.settings.barWeight}" 
               onchange="updateBarWeight(this.value)">
      </div>
      <div class="info-box">
        <strong>Cum funcționează unitățile:</strong><br><br>
        • <strong>TOTAL</strong> = greutate totală finală (cabluri, ganteră unică, etc.)<br><br>
        • <strong>/ SIDE</strong> = pui greutatea discurilor de pe O PARTE (ex: pui 20kg → se calculează 20x2 + bară = 60kg total)<br><br>
        • <strong>DB EA</strong> = greutate per ganteră (volumul total adună ambele gantere, kg×2)
      </div>
    </div>

    <div class="card">
      <div class="section-subtitle">Management Date</div>
      <button class="export-btn" onclick="exportData()">📤 Exportă date (backup JSON)</button>
      <button class="export-btn" onclick="document.getElementById('import-input').click()">📥 Importă date</button>
      <input type="file" id="import-input" accept=".json,application/json" style="display:none" onchange="importData(event)">
      <button class="danger-btn" onclick="resetAllData()">🗑️ Șterge TOATE datele</button>
    </div>

    <div style="text-align: center; padding: 24px 0; color: var(--text-tertiary); font-size: 12px;">
      GYM v2.0 • Premium PPL Tracker
    </div>
  `;
}

function updateProfile(field, value) {
  state.profile[field] = value;
  saveState();
  if (field === 'name') {
    const nameEl = document.querySelector('.profile-name');
    if (nameEl) nameEl.textContent = (value || 'ALEX').toUpperCase();
  }
}

function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const max = 250; // slightly smaller to save space
      let w = img.width, h = img.height;
      if (w > h && w > max) { h = h * max / w; w = max; }
      else if (h > max) { w = w * max / h; h = max; }
      canvas.width = w; canvas.height = h;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, w, h);
      
      const compressed = canvas.toDataURL('image/jpeg', 0.7); // more compression
      
      // Test if it fits in local storage
      const testState = JSON.stringify({...state, profile: {...state.profile, photo: compressed}});
      if (testState.length > 4000000) {
        showToast('❌ Imaginea este prea mare chiar și comprimată!');
        return;
      }
      
      state.profile.photo = compressed;
      saveState();
      render();
    };
    img.src = ev.target.result;
  };
  reader.readAsDataURL(file);
}

function addGoal() {
  const input = document.getElementById('new-goal');
  const val = input.value.trim();
  if (!val) return;
  if (!state.profile.goals) state.profile.goals = [];
  state.profile.goals.push(val);
  saveState();
  render();
}

function deleteGoal(idx) {
  state.profile.goals.splice(idx, 1);
  saveState();
  render();
}

function updateBarWeight(val) {
  state.settings.barWeight = parseFloat(val) || 20;
  saveState();
}

function exportData() {
  const blob = new Blob([JSON.stringify(state, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `gym-backup-${todayKey()}.json`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('💾 Backup descărcat cu succes!');
}

function importData(e) {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const data = JSON.parse(ev.target.result);
      if (!confirm('Atenție: Se vor suprascrie TOATE datele. Ești sigur?')) return;
      state = { ...state, ...data, profile: { ...state.profile, ...data.profile } };
      saveState();
      render();
      showToast('✅ Date importate cu succes!');
    } catch (err) {
      showToast('❌ Fișier invalid!');
    }
  };
  reader.readAsText(file);
}

function resetAllData() {
  if (!confirm('🚨 AVERTISMENT: Ești sigur că vrei să ștergi TOT istoricul și setările? Această acțiune este ireversibilă!')) return;
  if (!confirm('Ești 100% sigur? Ultima șansă.')) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

// =================== TIMER ===================
let timerSeconds = 120;
let timerRemaining = 120;
let timerInterval = null;
let timerRunning = false;

function openTimer() {
  document.getElementById('timer-modal').classList.remove('hidden');
  updateTimerDisplay();
  
  document.querySelectorAll('.timer-preset').forEach(btn => {
    btn.onclick = () => {
      if (timerRunning) return;
      document.querySelectorAll('.timer-preset').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      timerSeconds = parseInt(btn.dataset.sec);
      timerRemaining = timerSeconds;
      updateTimerDisplay();
    };
  });

  document.getElementById('timer-toggle').onclick = toggleTimer;
  document.getElementById('timer-reset').onclick = resetTimer;
}

function closeTimer() {
  document.getElementById('timer-modal').classList.add('hidden');
}

function toggleTimer() {
  if (timerRunning) {
    pauseTimer();
  } else {
    startTimer();
  }
}

function startTimer() {
  if (timerRemaining <= 0) timerRemaining = timerSeconds;
  timerRunning = true;
  document.getElementById('timer-toggle').textContent = 'PAUSE';
  document.getElementById('timer-fab').classList.add('running');
  
  timerInterval = setInterval(() => {
    timerRemaining--;
    updateTimerDisplay();
    if (timerRemaining <= 0) {
      timerDone();
    }
  }, 1000);
}

function pauseTimer() {
  timerRunning = false;
  clearInterval(timerInterval);
  document.getElementById('timer-toggle').textContent = 'START';
  document.getElementById('timer-fab').classList.remove('running');
}

function resetTimer() {
  pauseTimer();
  timerRemaining = timerSeconds;
  updateTimerDisplay();
}

function timerDone() {
  pauseTimer();
  if (navigator.vibrate) navigator.vibrate([300, 150, 300, 150, 500]);
  beep();
  document.getElementById('timer-display').classList.add('done');
  document.querySelector('.timer-ring-progress').classList.add('done');
  setTimeout(() => {
    document.getElementById('timer-display').classList.remove('done');
    document.querySelector('.timer-ring-progress').classList.remove('done');
  }, 2500);
}

function beep() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [0, 0.2, 0.4].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.frequency.value = 880;
      osc.type = 'sine';
      gain.gain.setValueAtTime(0.001, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + delay + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + 0.15);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + 0.15);
    });
  } catch (e) {}
}

function updateTimerDisplay() {
  const m = Math.floor(timerRemaining / 60);
  const s = timerRemaining % 60;
  const text = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  
  document.getElementById('timer-display').textContent = text;
  document.getElementById('timer-fab-text').textContent = text;
  
  // Ring logic
  const ring = document.querySelector('.timer-ring-progress');
  const circumference = 2 * Math.PI * 90; // r=90
  ring.style.strokeDasharray = `${circumference} ${circumference}`;
  const offset = circumference - (timerRemaining / timerSeconds) * circumference;
  ring.style.strokeDashoffset = offset;
  
  const display = document.getElementById('timer-display');
  display.classList.remove('warning', 'done');
  ring.classList.remove('warning', 'done');
  if (timerRemaining > 0 && timerRemaining <= 10) {
    display.classList.add('warning');
    ring.classList.add('warning');
  }
}

// =================== INIT ===================
loadState();
render();

// Prevent pull-to-refresh on iOS
document.body.addEventListener('touchmove', (e) => {
  if (e.target.closest('input, textarea, button, .timer-modal, .modal-overlay')) return;
}, { passive: true });
