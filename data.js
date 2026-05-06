// =================== DATA ===================
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
      { id: 'sl_rdl', name: 'Single Leg RDL', target: '3×10-12', defaultUnit: 'db', note: 'Stabilitate + ham unilateral.' },
      { id: 'calf_raise_d2', name: 'Calf Raises', target: '4×15-20', defaultUnit: 'db', note: 'Full ROM. Stretch 2s, squeeze 2s.' },
      { id: 'glute_bridge', name: 'Glute Bridge', target: '3×15-20', defaultUnit: 'side', note: 'High reps. Contracție 2s.' }
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

window.PROGRAM = PROGRAM;
window.DAY_ORDER = DAY_ORDER;
