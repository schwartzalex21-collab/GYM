// =================== PROGRAM (Push/Pull/Legs) ===================
const PROGRAM = {
  push1: {
    name: 'PUSH 1',
    focus: 'Piept Superior + Umeri + Triceps',
    exercises: [
      { id: 'inc_bb_press', name: 'Incline Barbell Press', target: '4×8-10', defaultUnit: 'side', note: 'Bancă 30°. Crește 2.5 kg/săpt.' },
      { id: 'seated_mil_press', name: 'Seated Military Press', target: '3×8-10', defaultUnit: 'side', note: 'Bară în fața feței. Full ROM.' },
      { id: 'inc_db_fly', name: 'Incline DB Fly', target: '3×12-15', defaultUnit: 'db', note: 'ROM complet, squeeze 2s.' },
      { id: 'lat_raise', name: 'Lateral Raises DB', target: '4×12-15', defaultUnit: 'db', note: 'Slight lean forward. Strict.' },
      { id: 'cable_chest_fly', name: 'Cable Chest Fly', target: '3×12-15', defaultUnit: 'total', note: 'Squeeze 2s la contracție.' },
      { id: 'cable_pushdown', name: 'Cable Triceps Pushdown', target: '3×10-12', defaultUnit: 'total', note: 'Coatele lipite.' },
      { id: 'cable_oh_tri', name: 'Cable OH Triceps Ext', target: '3×12-15', defaultUnit: 'total', note: 'Long head triceps. Stretch sus.' },
      { id: 'front_raise', name: 'Front Raise Cable', target: '2×12', defaultUnit: 'side', note: 'Finisher delt anterior. Opțional.' }
    ]
  },
  pull1: {
    name: 'PULL 1',
    focus: 'Spate Grosime + Biceps + Rear Delts',
    exercises: [
      { id: 'cable_row', name: 'Cable Rows V-bar', target: '3×10-12', defaultUnit: 'total', note: 'Trage spre buric. Squeeze 1s.' },
      { id: 'lat_pd_wide', name: 'Lat Pulldown Wide Grip', target: '3×8-10', defaultUnit: 'total', note: 'Spre pieptul superior. Lean 10-15°.' },
      { id: 'bb_row', name: 'Barbell Row Overhand', target: '3×8-10', defaultUnit: 'total', note: 'Spate la 45°. Coloană neutră.' },
      { id: 'face_pulls', name: 'Face Pulls', target: '4×15-20', defaultUnit: 'total', note: 'OBLIGATORIU. Rotație externă.' },
      { id: 'db_curls', name: 'DB Biceps Curls', target: '3×10-12', defaultUnit: 'db', note: 'Supinație completă. Ecc 3s.' },
      { id: 'zbar_curl', name: 'Z-Bar Curl', target: '3×10-12', defaultUnit: 'side', note: 'Brachialis focus.' },
      { id: 'pullups', name: 'Pull-ups', target: '3×Max', defaultUnit: 'total', note: 'Full ROM. La 3×8+ adaugă greutate.' },
      { id: 'db_shrugs', name: 'DB Shrugs', target: '3×12-15', defaultUnit: 'db', note: 'Pauză 2s sus.' }
    ]
  },
  legs1: {
    name: 'LEGS 1',
    focus: 'Quad + Glute + Calfs',
    exercises: [
      { id: 'bb_squat', name: 'Barbell Back Squat', target: '4×8-10', defaultUnit: 'side', note: 'ATG sau paralel. Drive din călcâie.' },
      { id: 'bulgarian', name: 'Bulgarian Split Squat', target: '3×10-12', defaultUnit: 'db', note: 'Stretch hip flexor. Genunchi peste deget.' },
      { id: 'goblet_sq', name: 'Goblet Squat', target: '3×12-15', defaultUnit: 'db', note: 'Torso vertical. La 20kg → pause reps.' },
      { id: 'pull_through', name: 'Cable Pull-Through', target: '3×12-15', defaultUnit: 'total', note: 'Hip hinge pur. Glute squeeze 2s.' },
      { id: 'calf_raise_d1', name: 'Standing Calf Raises', target: '4×15-20', defaultUnit: 'db', note: 'Stretch 2s, squeeze 2s.' },
      { id: 'hip_thrust', name: 'Hip Thrust', target: '4×12-15', defaultUnit: 'side', note: 'BARĂ. Squeeze maxim sus 2s.' }
    ]
  },
  push2: {
    name: 'PUSH 2',
    focus: 'Piept Mid/Lower + Umeri + Triceps',
    exercises: [
      { id: 'flat_bb_press', name: 'Flat Barbell Press', target: '3×8-10', defaultUnit: 'side', note: 'Coatele 45°. Full ROM.' },
      { id: 'standing_ohp', name: 'Standing OHP', target: '3×8-10', defaultUnit: 'side', note: 'Core tight. Fără lean back excesiv.' },
      { id: 'decline_db_press', name: 'Decline DB Press', target: '3×12-15', defaultUnit: 'db', note: 'Volume work. La 20kg: tempo 4-1-2.' },
      { id: 'cable_lat_raise', name: 'Cable Lateral Raises', target: '4×12-15', defaultUnit: 'side', note: 'Cross-body. Tensiune constantă.' },
      { id: 'flat_cable_fly', name: 'Flat Cable Fly', target: '3×12-15', defaultUnit: 'total', note: 'Squeeze 2s. Mid-chest.' },
      { id: 'zbar_oh_tri', name: 'Z-Bar OH Triceps Ext', target: '3×10-12', defaultUnit: 'side', note: 'Long head. Coatele fixe.' },
      { id: 'cable_kickback', name: 'Cable Triceps Kickback', target: '3×12-15', defaultUnit: 'side', note: 'Peak contraction. Pauză 1s.' },
      { id: 'rev_cable_fly', name: 'Reverse Cable Fly', target: '3×15', defaultUnit: 'side', note: 'Rear delt frequency.' }
    ]
  },
  pull2: {
    name: 'PULL 2',
    focus: 'Spate Lățime + RDL + Biceps + Rear Delts',
    exercises: [
      { id: 'lat_pd_close', name: 'Lat Pulldown Close Grip', target: '3×10-12', defaultUnit: 'total', note: 'ROM complet. Lats inferior.' },
      { id: 'rdl', name: 'Romanian Deadlift', target: '3×8-10', defaultUnit: 'side', note: 'Hip hinge. Coloană NEUTRĂ.' },
      { id: 'hammer_curls', name: 'Hammer Curls DB', target: '3×10-12', defaultUnit: 'db', note: 'Brachialis. Neutru grip.' },
      { id: 'cable_row_rev', name: 'Cable Row Reverse Grip', target: '3×10-12', defaultUnit: 'total', note: 'Lats inferior + biceps.' },
      { id: 'inc_db_curl', name: 'Incline DB Curl (45°)', target: '3×10-12', defaultUnit: 'db', note: 'Long head stretch maxim.' },
      { id: 'chinups', name: 'Chin-ups', target: '3×Max', defaultUnit: 'total', note: 'Lats + biceps compound.' },
      { id: 'face_pulls_p2', name: 'Face Pulls', target: '4×15-20', defaultUnit: 'total', note: 'OBLIGATORIU. Rear delts.' },
      { id: 'bb_shrugs', name: 'Barbell Shrugs', target: '3×12-15', defaultUnit: 'side', note: 'Grip overhand. Pauză 2s.' }
    ]
  },
  legs2: {
    name: 'LEGS 2',
    focus: 'Hamstring + Glute + Calfs',
    exercises: [
      { id: 'rdl_d2', name: 'Romanian Deadlift', target: '4×8-10', defaultUnit: 'side', note: 'PRIORITATE. SNC proaspăt.' },
      { id: 'front_squat', name: 'Front Squat', target: '3×8-10', defaultUnit: 'side', note: 'Torso vertical. Quad focus.' },
      { id: 'walking_lunges', name: 'Walking Lunges', target: '3×12/leg', defaultUnit: 'db', note: 'Pas lung = glute. Pas scurt = quad.' },
      { id: 'cable_leg_curl', name: 'Cable Leg Curl', target: '3×12-15', defaultUnit: 'total', note: 'Glezniere + bancă. Flexie genunchi.' },
      { id: 'cable_pt_d2', name: 'Cable Pull-Through (high-rep)', target: '4×15-20', defaultUnit: 'total', note: 'Tempo 4-0-2, pauză 2s la vârf. Pump finisher.' },
      { id: 'calf_raise_d2', name: 'Calf Raises', target: '4×15-20', defaultUnit: 'db', note: 'Full ROM. Stretch 2s, squeeze 2s.' }
    ]
  },
  recovery: {
    name: 'RECOVERY',
    focus: 'Active Recovery + Core',
    exercises: [
      { id: 'foam_rolling', name: 'Foam Rolling', target: '10-15 min', defaultUnit: 'total', note: 'Quads, ham, spate, IT band.' },
      { id: 'stretching', name: 'Stretching Static', target: '15-20 min', defaultUnit: 'total', note: 'Hold 30-60s/stretch.' },
      { id: 'cable_woodchops', name: 'Cable Woodchops', target: '3×12-15/parte', defaultUnit: 'total', note: 'Core rotațional. Oblici.' },
      { id: 'leg_raises', name: 'Hanging Leg Raises', target: '3×10-15', defaultUnit: 'total', note: 'Lower abs.' },
      { id: 'cable_crunch', name: 'Cable Crunch', target: '3×15-20', defaultUnit: 'total', note: 'Flexie coloană. Rectus abdominis.' },
      { id: 'pallof_press', name: 'Pallof Press', target: '3×10-12/parte', defaultUnit: 'total', note: 'Anti-rotație.' },
      { id: 'dead_hangs', name: 'Dead Hangs', target: '3×30-60s', defaultUnit: 'total', note: 'Decompresie coloană.' },
      { id: 'cardio_dogs', name: 'Plimbare', target: '20-30 min', defaultUnit: 'total', note: 'HR sub 120 BPM.' }
    ]
  }
};

const DAY_ORDER = ['push1', 'pull1', 'legs1', 'push2', 'pull2', 'legs2', 'recovery'];

// =================== BONUS MISSIONS POOL ===================
// rarity multiplier applied to base xp: common×1, rare×3, legendary×6
const BONUS_MISSION_POOL = [
  // ─── STR · forță fizică ───
  { id: 'walk_10',         title: 'Plimbare 10 min',         desc: '10 minute de mers afară, fără telefon în mână.',                                  xp: 30,  rarity: 'common',    stat: 'STR' },
  { id: 'stretch_20',      title: 'Stretching 20 min',       desc: 'Sesiune completă de stretching, full body, fără grabă.',                            xp: 30,  rarity: 'common',    stat: 'STR' },
  { id: 'squats_100',      title: '100 Genoflexiuni',        desc: 'Acumulează 100 de genoflexiuni cu greutatea corpului pe parcursul zilei.',          xp: 30,  rarity: 'common',    stat: 'STR' },
  { id: 'yoga_30',         title: 'Yoga 30 min',             desc: 'Sesiune yoga 30 minute. Flow continuu, respirație controlată.',                     xp: 35,  rarity: 'common',    stat: 'STR' },
  { id: 'cycling_30',      title: 'Bicicletă 30 min',        desc: 'Pedalează 30 minute (în oraș sau staționară).',                                     xp: 35,  rarity: 'common',    stat: 'STR' },
  { id: 'jumprope_500',    title: '500 Sărituri Coardă',     desc: 'Acumulează 500 de sărituri (cu coardă reală sau imaginară).',                       xp: 30,  rarity: 'common',    stat: 'STR' },
  { id: 'pushup_100',      title: '100 Flotări Bonus',       desc: '100 de flotări extra peste antrenamentul de azi.',                                  xp: 60,  rarity: 'rare',      stat: 'STR' },
  { id: 'plank_5min',      title: 'Plank Total 5 min',       desc: 'Acumulează 5 minute de plank total (oricâte serii).',                               xp: 50,  rarity: 'rare',      stat: 'STR' },
  { id: 'burpees_50',      title: '50 Burpees',              desc: '50 burpees pe parcursul zilei. Sus, jos, săritură.',                                xp: 60,  rarity: 'rare',      stat: 'STR' },
  { id: 'run_5k',          title: 'Aleargă 5 km',            desc: 'Aleargă 5 km continuu sau cu pauze scurte.',                                        xp: 70,  rarity: 'rare',      stat: 'STR' },
  { id: 'pullups_50',      title: '50 Tracțiuni Total',      desc: 'Acumulează 50 de tracțiuni pe parcursul zilei.',                                    xp: 70,  rarity: 'rare',      stat: 'STR' },
  { id: 'handstand_3',     title: 'Handstand 3 min total',   desc: 'Acumulează 3 minute de handstand (lângă perete dacă e nevoie).',                    xp: 60,  rarity: 'rare',      stat: 'STR' },
  { id: 'workout_double',  title: 'Antrenament Dublu',       desc: 'Efectuează un antrenament complet de forță (sală/acasă) ȘI o sesiune separată de minim 30 min cardio în aceeași zi.', xp: 120, rarity: 'legendary', stat: 'STR' },
  { id: 'hill_sprints',    title: '10 Hill Sprints',         desc: '10 sprinturi pe deal sau scări, până la pragul anaerob.',                           xp: 100, rarity: 'legendary', stat: 'STR' },
  { id: 'pushup_500',      title: '500 Flotări într-o Zi',   desc: 'Acumulează 500 flotări pe parcursul zilei. Set mic, des.',                          xp: 130, rarity: 'legendary', stat: 'STR' },

  // ─── END · rezistență ───
  { id: 'water_3l',        title: 'Hidratare 3L',            desc: 'Bea minim 3 litri de apă astăzi.',                                                 xp: 25,  rarity: 'common',    stat: 'END' },
  { id: 'sleep_8h',        title: 'Somn 8h+',                desc: 'Dormi minim 8 ore noaptea asta. Fără ecran cu 30 min înainte.',                     xp: 30,  rarity: 'common',    stat: 'END' },
  { id: 'breathing_box',   title: 'Respirație Box 10 min',   desc: '10 min respirație pătrată: 4-4-4-4. Calm și recuperare.',                           xp: 30,  rarity: 'common',    stat: 'END' },
  { id: 'nature_2h',       title: '2h în Natură',            desc: '2 ore în natură (parc, pădure, munte). Fără ecran.',                                xp: 35,  rarity: 'common',    stat: 'END' },
  { id: 'cold_shower',     title: 'Duș Rece',                desc: 'Duș rece minim 3 minute, fără pauze.',                                              xp: 40,  rarity: 'rare',      stat: 'END' },
  { id: 'fast_16h',        title: 'Post 16h',                desc: 'Post intermitent 16:8. Doar apă în fereastra de post.',                             xp: 70,  rarity: 'rare',      stat: 'END' },
  { id: 'fast_20h',        title: 'Post 20h',                desc: 'Post intermitent 20:4. Disciplina foamei.',                                         xp: 85,  rarity: 'rare',      stat: 'END' },
  { id: 'wimhof_double',   title: 'Wim Hof Dublu',           desc: '6 runde de respirație Wim Hof (în loc de 3). Recuperare profundă.',                xp: 60,  rarity: 'rare',      stat: 'END' },
  { id: 'no_caffeine',     title: '24h Fără Cofeină',        desc: 'Zero cafea, energizante, ceai negru pentru 24 ore.',                                xp: 60,  rarity: 'rare',      stat: 'END' },
  { id: 'workout_fasted',  title: 'Antrenament în Post',     desc: 'Antrenament complet pe stomacul gol (după minim 12h post).',                        xp: 75,  rarity: 'rare',      stat: 'END' },
  { id: 'zero_processed',  title: 'Zero Procesat',           desc: 'Toată ziua fără mâncare procesată. Doar real food.',                                xp: 65,  rarity: 'rare',      stat: 'END' },
  { id: 'fast_24h',        title: 'Post 24h',                desc: 'Post complet 24 ore. Doar apă, ceai neîndulcit, electroliți.',                      xp: 110, rarity: 'legendary', stat: 'END' },

  // ─── MND · mental & spiritual ───
  { id: 'read_20',         title: '20 min Lectură',          desc: 'Citește 20 minute. Carte fizică sau e-reader, NU rețele.',                          xp: 30,  rarity: 'common',    stat: 'MND' },
  { id: 'meditation_10',   title: 'Meditație 10 min',        desc: 'Meditează 10 minute neîntrerupt, ochii închiși.',                                  xp: 35,  rarity: 'common',    stat: 'MND' },
  { id: 'journal',         title: 'Journal Reflexie',        desc: 'Scrie 5-10 minute reflexii despre ziua de azi.',                                    xp: 30,  rarity: 'common',    stat: 'MND' },
  { id: 'gratitude_5',     title: '5 Lucruri Recunoștință',  desc: 'Notează 5 lucruri pentru care ești sincer recunoscător.',                           xp: 25,  rarity: 'common',    stat: 'MND' },
  { id: 'compliment_3',    title: '3 Complimente Sincere',   desc: 'Oferă 3 complimente sincere astăzi. Nu generic. Specific.',                         xp: 25,  rarity: 'common',    stat: 'MND' },
  { id: 'help_someone',    title: 'Ajută pe Cineva',         desc: 'Fă o faptă bună fără să ți se ceară. Fără să spui nimănui.',                        xp: 30,  rarity: 'common',    stat: 'MND' },
  { id: 'tomorrow_goals',  title: 'Planifică Mâine',         desc: 'Scrie 3 obiective concrete pentru mâine, în ordinea priorității.',                  xp: 25,  rarity: 'common',    stat: 'MND' },
  { id: 'learn_30',        title: 'Învață Skill Nou',        desc: '30 min învățare deliberată dintr-un skill nou (limba, instrument, cod).',           xp: 40,  rarity: 'common',    stat: 'MND' },
  { id: 'mental_math',     title: 'Calcul Mintal',           desc: 'Rezolvă 20 calcule complexe în minte, fără calculator.',                            xp: 25,  rarity: 'common',    stat: 'MND' },
  { id: 'teach_someone',   title: 'Învață pe Cineva',        desc: 'Explică-i cuiva un concept pe care îl știi bine. Cel mai bun mod de a învăța.',     xp: 30,  rarity: 'common',    stat: 'MND' },
  { id: 'call_family',     title: 'Sună un Părinte/Bunic',   desc: 'Sună un membru al familiei. 10+ minute. Întreabă-i cum sunt.',                      xp: 35,  rarity: 'common',    stat: 'MND' },
  { id: 'silent_meal',     title: 'Masa în Liniște',         desc: 'Mănâncă o masă în liniște completă. Fără ecran, fără muzică.',                      xp: 30,  rarity: 'common',    stat: 'MND' },
  { id: 'art_create',      title: 'Creează Ceva 20 min',     desc: '20 minute de creație: desen, scris, muzică, gătit. Doar creație.',                  xp: 30,  rarity: 'common',    stat: 'MND' },
  { id: 'nature_observe',  title: 'Observă Natura 15 min',   desc: '15 minute observă natura fără telefon. Doar prezență.',                             xp: 30,  rarity: 'common',    stat: 'MND' },
  { id: 'visualization',   title: 'Vizualizare Obiective',   desc: '10 min vizualizează viu cum arată viața ta cu obiectivele atinse.',                 xp: 30,  rarity: 'common',    stat: 'MND' },
  { id: 'meditation_30',   title: 'Meditație 30 min',        desc: 'Meditație profundă 30 minute neîntrerupt.',                                         xp: 65,  rarity: 'rare',      stat: 'MND' },
  { id: 'memorize_poem',   title: 'Memorează o Strofă',      desc: 'Memorează pe de rost o strofă dintr-un poem sau text spiritual.',                   xp: 50,  rarity: 'rare',      stat: 'MND' },
  { id: 'forgive',         title: 'Iartă Sincer',            desc: 'Iartă în sufletul tău pe cineva care te-a rănit. Lasă să plece.',                   xp: 80,  rarity: 'rare',      stat: 'MND' },
  { id: 'write_letter',    title: 'Scrisoare cu Sens',       desc: 'Scrie o scrisoare/email semnificativă cuiva apropiat. Trimite-o.',                  xp: 60,  rarity: 'rare',      stat: 'MND' },
  { id: 'book_finish',     title: 'Termină o Carte',         desc: 'Termină o carte pe care o citeai. Marchează finalul.',                              xp: 130, rarity: 'legendary', stat: 'MND' },

  // ─── WIL · voință & disciplină ───
  { id: 'no_sugar',        title: 'Zero Zahăr',              desc: 'Toată ziua fără zahăr adăugat. Verifică etichetele.',                               xp: 50,  rarity: 'rare',      stat: 'WIL' },
  { id: 'cold_morning',    title: 'Duș Rece la Trezire',     desc: 'Primul lucru după trezire: duș rece. Fără excuze.',                                 xp: 35,  rarity: 'common',    stat: 'WIL' },
  { id: 'early_sleep',     title: 'Culcat înainte de 23:30', desc: 'În pat, telefon deoparte, înainte de 23:30.',                                       xp: 30,  rarity: 'common',    stat: 'WIL' },
  { id: 'no_food_8pm',     title: 'Fără Mâncare după 20:00', desc: 'După ora 20:00, doar apă. Lasă digestia să se odihnească.',                         xp: 30,  rarity: 'common',    stat: 'WIL' },
  { id: 'say_no',          title: 'Spune NU la o Distrageri', desc: 'Refuză activ ceva care îți consumă timpul fără să-ți aducă valoare.',              xp: 30,  rarity: 'common',    stat: 'WIL' },
  { id: 'silent_hour',     title: '1h Liniște Absolută',     desc: '1 oră în liniște completă. Fără muzică, fără voci, fără ecrane.',                   xp: 35,  rarity: 'common',    stat: 'WIL' },
  { id: 'no_complaints',   title: '24h Fără Plângeri',       desc: 'Toată ziua fără să te plângi. Voce, gând, scris — nimic.',                          xp: 65,  rarity: 'rare',      stat: 'WIL' },
  { id: 'no_excuses',      title: '24h Fără Scuze',          desc: 'Toată ziua fără să oferi scuze. Asumare directă.',                                  xp: 65,  rarity: 'rare',      stat: 'WIL' },
  { id: 'no_lies',         title: '24h Adevăr Pur',          desc: 'Toată ziua fără minciuni, nici albe. Tăcere e permisă.',                            xp: 70,  rarity: 'rare',      stat: 'WIL' },
  { id: 'single_task',     title: '2h Mono-Task',            desc: '2 ore pe O singură sarcină. Fără switch. Fără notificări.',                         xp: 60,  rarity: 'rare',      stat: 'WIL' },
  { id: 'no_porn',         title: '24h Fără Pornografie',    desc: 'Zero pornografie sau gratificare instant 24 ore.',                                  xp: 80,  rarity: 'rare',      stat: 'WIL' },
  { id: 'no_negative_talk',title: 'Vorbire Pură 24h',        desc: 'Zero bârfă, zero negativitate verbală despre alții.',                               xp: 60,  rarity: 'rare',      stat: 'WIL' },
  { id: 'confront_call',   title: 'Confruntă un Apel Greu',  desc: 'Sună-l pe cel cu care ai amânat conversația. Astăzi.',                              xp: 80,  rarity: 'rare',      stat: 'WIL' },
  { id: 'no_social',       title: 'No Social Media 24h',     desc: 'Toată ziua fără rețele sociale. Dezinstalează aplicațiile dacă e nevoie.',          xp: 80,  rarity: 'legendary', stat: 'WIL' },
  { id: 'wake_5am',        title: 'Trezire înainte de 5 AM', desc: 'Sari din pat înainte de 5 dimineața. Fără snooze.',                                 xp: 100, rarity: 'legendary', stat: 'WIL' },
  { id: 'wake_4am',        title: 'Trezire înainte de 4 AM', desc: 'Sari din pat înainte de 4 dimineața. Monk mode.',                                   xp: 130, rarity: 'legendary', stat: 'WIL' },
  { id: 'dopamine_detox',  title: 'Dopamine Detox 12h',      desc: '12h fără social, jocuri, pornografie, mâncare procesată, muzică. Doar real.',       xp: 120, rarity: 'legendary', stat: 'WIL' },
  { id: 'confront_fear',   title: 'Confruntă o Frică',       desc: 'Fă ceva specific astăzi care îți este frică să faci. Asumă riscul.',                xp: 130, rarity: 'legendary', stat: 'WIL' }
];

// =================== BOSS DAY MISSIONS ===================
// 5x XP per boss (250 XP), apar joi/vineri/sâmbătă, una pe săptămână
const BOSS_MISSIONS = [
  { id: 'boss_perfect_day',     title: 'Zi Perfectă',             desc: 'Completează TOATE misiunile principale fără excepție, plus minim 2 bonusuri.' },
  { id: 'boss_pushup_200',      title: '200 Flotări Total',       desc: 'Acumulează 200 de flotări pe parcursul zilei.' },
  { id: 'boss_pullups_100',     title: '100 Tracțiuni Total',     desc: 'Acumulează 100 de tracțiuni stricte pe parcursul zilei.' },
  { id: 'boss_squats_300',      title: '300 Genoflexiuni',        desc: 'Acumulează 300 genoflexiuni cu greutatea corpului.' },
  { id: 'boss_burpees_100',     title: '100 Burpees',             desc: '100 burpees pe parcursul zilei. Cu săritură și flotare.' },
  { id: 'boss_run_10k',         title: 'Aleargă 10 km',           desc: 'Aleargă 10 km astăzi. Indiferent de ritm.' },
  { id: 'boss_zero_social',     title: '24h No Social Media',     desc: 'Zero rețele sociale timp de 24 ore complete.' },
  { id: 'boss_no_phone_8h',     title: '8h Fără Telefon',         desc: '8 ore consecutive fără telefon. Pune-l într-un sertar.' },
  { id: 'boss_double_workout',  title: 'Antrenament Dublu',       desc: 'Sală + 30 minute cardio acasă în aceeași zi.' },
  { id: 'boss_workout_triple',  title: 'Triple Workout',          desc: 'Sală + cardio + 20 min mobility/yoga. Toate în aceeași zi.' },
  { id: 'boss_wimhof_extreme',  title: 'Wim Hof Extreme',         desc: '5 runde de respirație Wim Hof + duș rece 5 minute.' },
  { id: 'boss_ice_bath',        title: 'Baie cu Gheață 10 min',   desc: '10 minute în apă cu gheață sub 5°C.' },
  { id: 'boss_cold_5min',       title: 'Duș Rece 10 min',         desc: '10 minute consecutive de duș rece. Fără pauze.' },
  { id: 'boss_fast_18h',        title: 'Post 18h',                desc: 'Post intermitent 18 ore consecutive.' },
  { id: 'boss_fast_24h',        title: 'Post 24h Complet',        desc: 'Post complet 24 ore. Doar apă și electroliți.' },
  { id: 'boss_wake_4am',        title: 'Trezire înainte de 4 AM', desc: 'Sari din pat înainte de 4 dimineața.' },
  { id: 'boss_meditation_30',   title: 'Meditație 30 min',        desc: 'Meditează 30 minute neîntrerupt. Doar respirația.' },
  { id: 'boss_meditation_hour', title: 'Meditație 1h',            desc: 'Meditație profundă o oră întreagă, fără mișcare.' },
  { id: 'boss_silence_4h',      title: '4h Liniște Completă',     desc: '4 ore în liniște absolută. Fără muzică, telefon, voce.' },
  { id: 'boss_no_complaints',   title: '24h Fără Plângeri',       desc: 'Toată ziua fără să te plângi. Voce, scris, gând.' },
  { id: 'boss_dopamine_detox',  title: 'Dopamine Detox 24h',      desc: '24h fără social, jocuri, pornografie, mâncare procesată, muzică.' },
  { id: 'boss_book_chapter',    title: 'Capitol Întreg',          desc: 'Citește un capitol întreg dintr-o carte serioasă, fără pauze.' },
  { id: 'boss_journal_long',    title: 'Journaling Profund 30 min',desc:'30 minute journaling profund. Tot ce simți, fără cenzură.' },
  { id: 'boss_apologize',       title: 'Cere Iertare Sincer',     desc: 'Cere iertare sincer cuiva căruia i-o datorezi. Astăzi.' },
  { id: 'boss_help_stranger',   title: 'Ajută un Străin',         desc: 'Ajută activ un străin astăzi. Mic sau mare, contează intenția.' },
  { id: 'boss_skill_2h',        title: '2h Învățare Profundă',    desc: '2 ore continue de învățare deliberată pe un skill important.' }
];

// =================== ACHIEVEMENTS ===================
const ACHIEVEMENTS = {
  // === STREAKS ===
  first_blood:     { id: 'first_blood',     title: 'First Blood',     desc: 'Prima misiune completată vreodată',          icon: '⚔️', rarity: 'bronze' },
  streak_3:        { id: 'streak_3',        title: 'Hunter Începător',desc: '3 zile streak consecutive',                  icon: '👶', rarity: 'bronze' },
  streak_7:        { id: 'streak_7',        title: 'Săptămâna de Foc',desc: '7 zile streak consecutive',                  icon: '🔥', rarity: 'bronze' },
  streak_14:       { id: 'streak_14',       title: 'Disciplină de Fier',desc: '14 zile streak consecutive',                icon: '⛓️', rarity: 'silver' },
  iron_will:       { id: 'iron_will',       title: 'Iron Will',       desc: '30 de zile streak consecutive',              icon: '🏋️', rarity: 'silver' },
  streak_60:       { id: 'streak_60',       title: 'Două Luni de Foc',desc: '60 de zile streak consecutive',              icon: '💥', rarity: 'gold' },
  streak_90:       { id: 'streak_90',       title: 'Maestru al Rutinei',desc: '90 de zile streak consecutive',            icon: '🏆', rarity: 'gold' },
  streak_100:      { id: 'streak_100',      title: 'Unstoppable',     desc: '100 zile streak consecutive',                icon: '∞', rarity: 'legendary' },
  streak_150:      { id: 'streak_150',      title: 'Jumătate de An',  desc: '150 de zile streak consecutive',             icon: '🔱', rarity: 'legendary' },
  streak_200:      { id: 'streak_200',      title: 'Spartan',         desc: '200 de zile streak consecutive',             icon: '🛡️', rarity: 'legendary' },
  streak_250:      { id: 'streak_250',      title: 'Imbatabil',       desc: '250 de zile streak consecutive',             icon: '💥', rarity: 'legendary' },
  streak_300:      { id: 'streak_300',      title: 'Legenda Vie',     desc: '300 de zile streak consecutive',             icon: '👑', rarity: 'legendary' },
  streak_365:      { id: 'streak_365',      title: 'Un An de Perfecțiune',desc: '365 de zile streak consecutive',          icon: '☀️', rarity: 'legendary' },

  // === MISIUNI ===
  missions_1:      { id: 'missions_1',      title: 'Primul Pas',      desc: '1 misiune bonus completată',                 icon: '🎯', rarity: 'bronze' },
  missions_10:     { id: 'missions_10',     title: 'Ucenic',          desc: '10 misiuni bonus completate',                icon: '📝', rarity: 'bronze' },
  missions_25:     { id: 'missions_25',     title: 'Zelos',           desc: '25 misiuni bonus completate',                icon: '📚', rarity: 'bronze' },
  bonus_hunter:    { id: 'bonus_hunter',    title: 'Bonus Hunter',    desc: '50 misiuni bonus completate',                icon: '🎯', rarity: 'silver' },
  missions_75:     { id: 'missions_75',     title: 'Vânător de Elită',desc: '75 misiuni bonus completate',                icon: '🏹', rarity: 'silver' },
  missions_100:    { id: 'missions_100',    title: 'Vânător Experimentat',desc: '100 misiuni bonus completate',            icon: '🦅', rarity: 'gold' },
  missions_150:    { id: 'missions_150',    title: 'Veteran',         desc: '150 misiuni bonus completate',               icon: '🎖️', rarity: 'gold' },
  missions_200:    { id: 'missions_200',    title: 'Războinic',       desc: '200 misiuni bonus completate',               icon: '⚔️', rarity: 'gold' },
  missions_250:    { id: 'missions_250',    title: 'Campioan',        desc: '250 misiuni bonus completate',               icon: '🏆', rarity: 'gold' },
  missions_300:    { id: 'missions_300',    title: 'Asasin de Elită', desc: '300 misiuni bonus completate',               icon: '🥷', rarity: 'legendary' },
  missions_400:    { id: 'missions_400',    title: 'Stăpânul Umbrelor',desc: '400 misiuni bonus completate',             icon: '🌑', rarity: 'legendary' },
  bonus_500:       { id: 'bonus_500',       title: 'Bonus Legend',    desc: '500 misiuni bonus completate total',         icon: '🌟', rarity: 'legendary' },
  missions_600:    { id: 'missions_600',    title: 'Alesul',          desc: '600 misiuni bonus completate',               icon: '🌌', rarity: 'legendary' },
  missions_700:    { id: 'missions_700',    title: 'Fără Limite',     desc: '700 misiuni bonus completate',               icon: '🚀', rarity: 'legendary' },
  missions_800:    { id: 'missions_800',    title: 'Titan',           desc: '800 misiuni bonus completate',               icon: '🌋', rarity: 'legendary' },
  missions_900:    { id: 'missions_900',    title: 'Semizeu',         desc: '900 misiuni bonus completate',               icon: '🔱', rarity: 'legendary' },
  missions_1000:   { id: 'missions_1000',   title: 'Zeu al Misiunilor',desc: '1000 misiuni bonus completate',             icon: '🪐', rarity: 'legendary' },

  // === ANTRENAMENTE ===
  workout_1:       { id: 'workout_1',       title: 'Primul Pas la Sală',desc: 'Primul antrenament salvat',                  icon: '👟', rarity: 'bronze' },
  workout_5:       { id: 'workout_5',       title: 'Familiarizat',    desc: '5 antrenamente salvate',                     icon: '💪', rarity: 'bronze' },
  workout_10:      { id: 'workout_10',      title: 'Rutină Formată',  desc: '10 antrenamente salvate',                    icon: '📅', rarity: 'bronze' },
  workout_20:      { id: 'workout_20',      title: 'Dedicat',         desc: '20 antrenamente salvate',                    icon: '🏋️‍♂️', rarity: 'silver' },
  workout_30:      { id: 'workout_30',      title: 'Serios',          desc: '30 antrenamente salvate',                    icon: '', rarity: 'silver' },
  workout_40:      { id: 'workout_40',      title: 'Fierar',          desc: '40 antrenamente salvate',                    icon: '🔨', rarity: 'silver' },
  workout_50:      { id: 'workout_50',      title: 'Consecvent',      desc: '50 antrenamente salvate',                    icon: '📅', rarity: 'silver' },
  workout_75:      { id: 'workout_75',      title: 'Veteran al Fierului',desc: '75 antrenamente salvate',                  icon: '🛡️', rarity: 'gold' },
  workout_100:     { id: 'workout_100',     title: 'Maestru Fierar',  desc: '100 antrenamente salvate',                   icon: '⚒️', rarity: 'gold' },
  workout_150:     { id: 'workout_150',     title: 'De Neoprit',      desc: '150 antrenamente salvate',                   icon: '🚀', rarity: 'gold' },
  workout_200:     { id: 'workout_200',     title: 'Titan al Sălii',  desc: '200 antrenamente salvate',                   icon: '🏔️', rarity: 'legendary' },
  workout_250:     { id: 'workout_250',     title: 'Legendă Urbană',  desc: '250 antrenamente salvate',                   icon: '🏙️', rarity: 'legendary' },
  workout_300:     { id: 'workout_300',     title: 'Colos',           desc: '300 antrenamente salvate',                   icon: '🌋', rarity: 'legendary' },

  // === STATS: STR ===
  str_10:          { id: 'str_10',          title: 'Forță Brută',     desc: 'STR ajunge la nivelul 10',                   icon: '✊', rarity: 'bronze' },
  str_25:          { id: 'str_25',          title: 'Rupt de Sală',    desc: 'STR ajunge la nivelul 25',                   icon: '🧱', rarity: 'silver' },
  stat_50:         { id: 'stat_50',         title: 'Munte de Mușchi', desc: 'STR ajunge la nivelul 50',                   icon: '🏔️', rarity: 'gold' },
  str_75:          { id: 'str_75',          title: 'Hercule',         desc: 'STR ajunge la nivelul 75',                   icon: '🔱', rarity: 'gold' },
  stat_100:        { id: 'stat_100',        title: 'Forță Divină',    desc: 'STR ajunge la nivelul 100',                  icon: '⚡', rarity: 'legendary' },
  str_150:         { id: 'str_150',         title: 'Titan de Fier',   desc: 'STR ajunge la nivelul 150',                  icon: '🪐', rarity: 'legendary' },
  str_200:         { id: 'str_200',         title: 'Forță Infinită',  desc: 'STR ajunge la nivelul 200',                  icon: '🌌', rarity: 'legendary' },

  // === STATS: END ===
  end_10:          { id: 'end_10',          title: 'Plămâni de Oțel', desc: 'END ajunge la nivelul 10',                   icon: '🫁', rarity: 'bronze' },
  end_25:          { id: 'end_25',          title: 'Maratonist',      desc: 'END ajunge la nivelul 25',                   icon: '🏃‍♂️', rarity: 'silver' },
  end_50:          { id: 'end_50',          title: 'Inepuizabil',     desc: 'END ajunge la nivelul 50',                   icon: '🔋', rarity: 'gold' },
  end_75:          { id: 'end_75',          title: 'Fantomă',         desc: 'END ajunge la nivelul 75',                   icon: '👻', rarity: 'gold' },
  end_100:         { id: 'end_100',         title: 'Nemuritor',       desc: 'END ajunge la nivelul 100',                  icon: '☯️', rarity: 'legendary' },
  end_150:         { id: 'end_150',         title: 'Spirit Liber',    desc: 'END ajunge la nivelul 150',                  icon: '🍃', rarity: 'legendary' },
  end_200:         { id: 'end_200',         title: 'Etern',           desc: 'END ajunge la nivelul 200',                  icon: '⏳', rarity: 'legendary' },

  // === STATS: MND ===
  mnd_10:          { id: 'mnd_10',          title: 'Calm',            desc: 'MND ajunge la nivelul 10',                   icon: '🧘‍♂️', rarity: 'bronze' },
  mnd_25:          { id: 'mnd_25',          title: 'Zen Master',      desc: 'MND ajunge la nivelul 25',                   icon: '🔮', rarity: 'silver' },
  mnd_50:          { id: 'mnd_50',          title: 'Iluminat',        desc: 'MND ajunge la nivelul 50',                   icon: '💡', rarity: 'gold' },
  mnd_75:          { id: 'mnd_75',          title: 'Telepat',         desc: 'MND ajunge la nivelul 75',                   icon: '🧠', rarity: 'gold' },
  mnd_100:         { id: 'mnd_100',         title: 'Omniscient',      desc: 'MND ajunge la nivelul 100',                  icon: '👁️', rarity: 'legendary' },
  mnd_150:         { id: 'mnd_150',         title: 'Arhitect Reality',desc: 'MND ajunge la nivelul 150',                  icon: '🌀', rarity: 'legendary' },
  mnd_200:         { id: 'mnd_200',         title: 'Conștiință Pură', desc: 'MND ajunge la nivelul 200',                  icon: '✨', rarity: 'legendary' },

  // === STATS: WIL ===
  wil_10:          { id: 'wil_10',          title: 'Hotărât',         desc: 'WIL ajunge la nivelul 10',                   icon: '🎯', rarity: 'bronze' },
  wil_25:          { id: 'wil_25',          title: 'De Neclintit',    desc: 'WIL ajunge la nivelul 25',                   icon: '🛡️', rarity: 'silver' },
  wil_50:          { id: 'wil_50',          title: 'Voință de Diamant',desc: 'WIL ajunge la nivelul 50',                   icon: '💎', rarity: 'gold' },
  wil_75:          { id: 'wil_75',          title: 'Stăpânitor',      desc: 'WIL ajunge la nivelul 75',                   icon: '🌌', rarity: 'gold' },
  wil_100:         { id: 'wil_100',         title: 'Absolut',         desc: 'WIL ajunge la nivelul 100',                  icon: '☀️', rarity: 'legendary' },
  wil_150:         { id: 'wil_150',         title: 'Creator de Destin',desc: 'WIL ajunge la nivelul 150',                 icon: '🔮', rarity: 'legendary' },
  wil_200:         { id: 'wil_200',         title: 'Voință Divină',   desc: 'WIL ajunge la nivelul 200',                  icon: '🔱', rarity: 'legendary' },

  // === ALL STATS ===
  all_stats_10:    { id: 'all_stats_10',    title: 'Echilibru',       desc: 'Toate cele 4 stats peste nivelul 10',        icon: '⚖️', rarity: 'bronze' },
  all_stats_25:    { id: 'all_stats_25',    title: 'Balanced Hunter', desc: 'Toate cele 4 stats peste nivelul 25',        icon: '⚖️', rarity: 'silver' },
  all_stats_50:    { id: 'all_stats_50',    title: 'Maestru Suprem',  desc: 'Toate cele 4 stats peste nivelul 50',        icon: '🌌', rarity: 'legendary' },
  all_stats_75:    { id: 'all_stats_75',    title: 'Semizeu',         desc: 'Toate cele 4 stats peste nivelul 75',        icon: '🔱', rarity: 'legendary' },
  all_stats_100:   { id: 'all_stats_100',   title: 'Zeu Absolut',     desc: 'Toate cele 4 stats peste nivelul 100',       icon: '🪐', rarity: 'legendary' },

  // === NIVELE GENERALE ===
  level_5:         { id: 'level_5',         title: 'Nivel 5',         desc: 'Atinge nivelul general 5',                   icon: '🔓', rarity: 'bronze' },
  level_10:        { id: 'level_10',        title: 'Nivel 10',        desc: 'Atinge nivelul general 10',                  icon: '🔓', rarity: 'bronze' },
  level_20:        { id: 'level_20',        title: 'Nivel 20',        desc: 'Atinge nivelul general 20',                  icon: '🔓', rarity: 'silver' },
  level_30:        { id: 'level_30',        title: 'Nivel 30',        desc: 'Atinge nivelul general 30',                  icon: '🔓', rarity: 'silver' },
  level_40:        { id: 'level_40',        title: 'Nivel 40',        desc: 'Atinge nivelul general 40',                  icon: '🔓', rarity: 'gold' },
  level_50:        { id: 'level_50',        title: 'Nivel 50',        desc: 'Atinge nivelul general 50',                  icon: '🔓', rarity: 'gold' },
  level_60:        { id: 'level_60',        title: 'Nivel 60',        desc: 'Atinge nivelul general 60',                  icon: '🔓', rarity: 'gold' },
  level_70:        { id: 'level_70',        title: 'Nivel 70',        desc: 'Atinge nivelul general 70',                  icon: '🔓', rarity: 'gold' },
  level_80:        { id: 'level_80',        title: 'Nivel 80',        desc: 'Atinge nivelul general 80',                  icon: '🔓', rarity: 'gold' },
  level_90:        { id: 'level_90',        title: 'Nivel 90',        desc: 'Atinge nivelul general 90',                  icon: '🔓', rarity: 'gold' },
  level_100:       { id: 'level_100',       title: 'Nivel 100',       desc: 'Atinge nivelul general 100',                 icon: '🔓', rarity: 'legendary' },
  level_125:       { id: 'level_125',       title: 'Nivel 125',       desc: 'Atinge nivelul general 125',                 icon: '🔓', rarity: 'legendary' },
  level_150:       { id: 'level_150',       title: 'Nivel 150',       desc: 'Atinge nivelul general 150',                 icon: '🔓', rarity: 'legendary' },
  level_175:       { id: 'level_175',       title: 'Nivel 175',       desc: 'Atinge nivelul general 175',                 icon: '🔓', rarity: 'legendary' },
  level_200:       { id: 'level_200',       title: 'Nivel 200',       desc: 'Atinge nivelul general 200',                 icon: '🔓', rarity: 'legendary' },

  // === SPECIAL/RANKS ===
  legendary_pull:  { id: 'legendary_pull',  title: 'Legendary Pull',  desc: 'Prima misiune legendară completată',         icon: '💎', rarity: 'gold' },
  untouchable:     { id: 'untouchable',     title: 'Untouchable',     desc: 'Prima utilizare de shield',                  icon: '🛡', rarity: 'bronze' },
  boss_slayer:     { id: 'boss_slayer',     title: 'Boss Slayer',     desc: 'Primul Boss Day câștigat',                   icon: '👑', rarity: 'gold' },
  boss_10:         { id: 'boss_10',         title: 'Boss Hunter',     desc: '10 Boss Days câștigate',                     icon: '⚔', rarity: 'gold' },
  boss_25:         { id: 'boss_25',         title: 'Boss Master',     desc: '25 Boss Days câștigate',                     icon: '💀', rarity: 'legendary' },
  boss_50:         { id: 'boss_50',         title: 'Boss Legend',     desc: '50 Boss Days câștigate',                     icon: '👹', rarity: 'legendary' },
  shadow_monarch:  { id: 'shadow_monarch',  title: 'Shadow Monarch',  desc: 'Ajunge la S-Rank sau peste',                 icon: '👁', rarity: 'legendary' },
  rank_d:          { id: 'rank_d',          title: 'D-Rank Fighter',  desc: 'Atinge rangul D',                            icon: '🥉', rarity: 'bronze' },
  rank_c:          { id: 'rank_c',          title: 'C-Rank Elite',    desc: 'Atinge rangul C',                            icon: '🥈', rarity: 'bronze' },
  rank_b:          { id: 'rank_b',          title: 'B-Rank Veteran',  desc: 'Atinge rangul B',                            icon: '⚜️', rarity: 'silver' },
  rank_a:          { id: 'rank_a',          title: 'A-Rank Champion', desc: 'Atinge rangul A',                            icon: '🏆', rarity: 'gold' },
  rank_s:          { id: 'rank_s',          title: 'S-Rank Hero',     desc: 'Atinge rangul S',                            icon: '👑', rarity: 'gold' }
};

// =================== MOTIVATIONAL QUOTES (weekly report) ===================
const QUOTES = [
  '"Cu cât e mai întuneric drumul, cu atât mai strălucitor devii." — Sung Jin-Woo',
  '"Nu evolui prin confort. Evoluezi prin disciplină." — Sistem',
  '"Slăbiciunea de azi este forța de mâine." — Sistem',
  '"Fiecare misiune e o promisiune față de tine însuți." — Sistem',
  '"Cei care nu se ridică din nou nu se vor ridica niciodată." — Sistem',
  '"Rangul nu se primește. Se câștigă. Zi de zi." — Sistem',
  '"Umbra ta urmează lumina ta. Devino lumina." — Sistem',
  '"Lupul singur învinge frigul. Haitul nu doarme." — Sistem',
  '"Disciplina e libertate. Confortul e capcană." — Sistem',
  '"O singură zi consistentă bate o sută de zile motivate." — Sistem',
  '"Dacă vrei să devii mai puternic, înfruntă-ți slăbiciunea." — Sung Jin-Woo',
  '"Cine zice că poate și cine zice că nu poate au amândoi dreptate." — Sistem',
  '"Nu cere o viață mai ușoară. Cere să devii mai puternic." — Sistem',
  '"Limita ta nu este reală. Este doar ultimul punct unde ai renunțat." — Sistem',
  '"Hunter-ul nu se compară cu nimeni. Se compară doar cu el de ieri." — Sistem'
];

window.PROGRAM = PROGRAM;
window.DAY_ORDER = DAY_ORDER;
window.BONUS_MISSION_POOL = BONUS_MISSION_POOL;
window.BOSS_MISSIONS = BOSS_MISSIONS;
window.ACHIEVEMENTS = ACHIEVEMENTS;
window.QUOTES = QUOTES;
