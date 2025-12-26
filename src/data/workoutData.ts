export type WorkoutLevel = 'Principiante' | 'Intermedio' | 'Avanzato';
export type WorkoutCategory = 'Full Body' | 'Cardio' | 'Upper Body' | 'Lower Body' | 'Core' | 'Yoga' | 'Mobility' | 'Calisthenics';
export type Creator = 'Chris Heria' | 'Midas Movement' | 'NEXT Workout' | 'WildMoose' | 'Smart Mix';

export interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string; // "12-15" or "45 sec"
  rest: number; // seconds
  notes?: string;
  youtubeId?: string; // Video tutorial specifico per l'esercizio
}

export interface WorkoutSection {
  title: string; // e.g., "Warm Up", "Main Circuit", "Finisher"
  exercises: Exercise[];
}

export interface Workout {
  id: string;
  title: string;
  description: string;
  creator: Creator;
  duration: number; // minutes
  level: WorkoutLevel;
  category: WorkoutCategory;
  calories: number;
  imageColor: string; // CSS gradient
  icon: string;
  equipment: string[]; // e.g., "Dumbbells", "Pull-up Bar", "None"
  sections: WorkoutSection[]; // Structured workout sections
  youtubeId?: string; // Full workout video if available
  rating?: number; // 0-5 stars
  views?: string; // e.g. "1.2M"
  gamification?: {
    xp: number;
    badge?: string;
  };
}

export interface WeeklyPlanDay {
  day: string;
  workoutId: string;
  focus: string;
}

export const CHRIS_HERIA_WEEKLY_PLAN: WeeklyPlanDay[] = [
  { day: 'Lunedì', workoutId: 'ch1', focus: 'Abs Definition' },
  { day: 'Martedì', workoutId: 'ch2', focus: 'Fat Burning' },
  { day: 'Mercoledì', workoutId: 'w_gyno_focus', focus: 'Lower Chest Sculpt' },
  { day: 'Giovedì', workoutId: 'ch4', focus: 'HIIT Cardio' },
  { day: 'Venerdì', workoutId: 'ch_gyno_shred', focus: 'Anti-Gyno Video' },
  { day: 'Sabato', workoutId: 'ch6', focus: 'Intense Cardio' },
  { day: 'Domenica', workoutId: 'ch7', focus: 'Quick Abs' },
];

export const MIDAS_MVMT_WEEKLY_PLAN: WeeklyPlanDay[] = [
  { day: 'Lunedì', workoutId: 'midas1', focus: 'Full Body Tone' },
  { day: 'Martedì', workoutId: 'midas2', focus: 'Core Strength' },
  { day: 'Mercoledì', workoutId: 'midas3', focus: 'Build & Burn' },
  { day: 'Giovedì', workoutId: 'midas4', focus: 'Abs & Cardio' },
  { day: 'Venerdì', workoutId: 'midas1', focus: 'Full Body Pump' },
  { day: 'Sabato', workoutId: 'midas3', focus: 'Max Hypertrophy' },
  { day: 'Domenica', workoutId: 'midas2', focus: 'Active Recovery' },
];

export const NEXT_WORKOUT_WEEKLY_PLAN: WeeklyPlanDay[] = [
  { day: 'Lunedì', workoutId: 'next1', focus: 'Push (Petto/Spalle/Tricipiti)' },
  { day: 'Martedì', workoutId: 'next2', focus: 'Pull (Schiena/Bicipiti)' },
  { day: 'Mercoledì', workoutId: 'next3', focus: 'Legs & Core' },
  { day: 'Giovedì', workoutId: 'next4', focus: 'Full Body HIIT' },
  { day: 'Venerdì', workoutId: 'next1', focus: 'Upper Body Power' },
  { day: 'Sabato', workoutId: 'next5', focus: 'Mobility & Skills' },
  { day: 'Domenica', workoutId: 'next6', focus: 'Active Rest' },
];

export const WILDMOOSE_WEEKLY_PLAN: WeeklyPlanDay[] = [
  { day: 'Lunedì', workoutId: 'wm1', focus: 'Quest: Chest Chest' },
  { day: 'Martedì', workoutId: 'wm2', focus: 'Quest: Back Attack' },
  { day: 'Mercoledì', workoutId: 'wm3', focus: 'Quest: Leg Day Survival' },
  { day: 'Giovedì', workoutId: 'wm4', focus: 'Quest: Shoulder Boulder' },
  { day: 'Venerdì', workoutId: 'wm5', focus: 'Quest: Arms Race' },
  { day: 'Sabato', workoutId: 'wm6', focus: 'Quest: Full Body Boss' },
  { day: 'Domenica', workoutId: 'wm7', focus: 'Quest: Recovery Potion' },
];

export const MIXED_WEEKLY_PLAN: WeeklyPlanDay[] = [
  { day: 'Lunedì', workoutId: 'next1', focus: 'Upper Strength (NEXT)' },
  { day: 'Martedì', workoutId: 'wm2', focus: 'Back & Core (WildMoose)' },
  { day: 'Mercoledì', workoutId: 'midas4', focus: 'Cardio & Abs (Midas)' },
  { day: 'Giovedì', workoutId: 'wm3', focus: 'Leg Day (WildMoose)' },
  { day: 'Venerdì', workoutId: 'ch4', focus: 'HIIT Shred (Chris Heria)' },
  { day: 'Sabato', workoutId: 'midas1', focus: 'Full Body Tone (Midas)' },
  { day: 'Domenica', workoutId: 'next6', focus: 'Recovery (NEXT)' },
];

export const WORKOUT_DB: Workout[] = [
  // --- Chris Heria Workouts ---
  {
    id: 'ch1',
    title: 'Complete 15 Min Abs',
    description: 'Allenamento completo per addominali scolpiti. Risultati garantiti con costanza.',
    creator: 'Chris Heria',
    duration: 15,
    level: 'Intermedio',
    category: 'Core',
    calories: 180,
    imageColor: 'linear-gradient(to right, #000000, #434343)',
    icon: '🍫',
    equipment: ['None'],
    youtubeId: '0yZDVWab_dI',
    rating: 4.9,
    views: '15M',
    sections: []
  },
  {
    id: 'ch_gyno_shred',
    title: 'Anti-Ginecomastia Chest Sculpt',
    description: 'Protocollo specifico per definire il petto basso e bruciare il grasso localizzato.',
    creator: 'Chris Heria',
    duration: 10,
    level: 'Intermedio',
    category: 'Upper Body',
    calories: 150,
    imageColor: 'linear-gradient(to right, #243B55, #141E30)',
    icon: '🛡️',
    equipment: ['None'],
    youtubeId: 'vm1WpTAtPH0',
    rating: 4.8,
    views: '5M',
    sections: []
  },
  {
    id: 'w_gyno_focus',
    title: 'Lower Chest & Hormonal Boost',
    description: 'Esercizi multi-articolari per massimizzare il testosterone e scolpire la parte bassa del petto.',
    creator: 'Chris Heria',
    duration: 35,
    level: 'Avanzato',
    category: 'Upper Body',
    calories: 320,
    imageColor: 'linear-gradient(to right, #434343, #000000)',
    icon: '🦍',
    equipment: ['Dip Station', 'Decline Bench'],
    rating: 4.7,
    views: '2M',
    sections: [
      {
        title: 'Main Workout',
        exercises: [
          { id: 'e_dip', name: 'Dips alle Parallele', sets: 4, reps: '12-15', rest: 90, notes: 'Busto inclinato in avanti per focus petto', youtubeId: 'U7HeutDqS_w' },
          { id: 'e_dec_push', name: 'Decline Pushups', sets: 4, reps: '15-20', rest: 60, notes: 'Piedi su rialzo, mani a terra', youtubeId: '5hW08uR8gWc' },
          { id: 'e_hiit_sprint', name: 'Sprints (High Knees)', sets: 6, reps: '30 sec', rest: 30, notes: 'Max velocità per boost metabolico', youtubeId: 'h8F60yG97l8' },
          { id: 'e_fly', name: 'High-to-Low Flys', sets: 3, reps: '15', rest: 45, notes: 'Usa elastici o cavi, chiusura in basso', youtubeId: 'I5tJ7y_i6t8' }
        ]
      }
    ]
  },
  {
    id: 'ch2',
    title: '10 Min Fat Burn',
    description: 'Brucia grassi veloce ed efficace senza attrezzi.',
    creator: 'Chris Heria',
    duration: 10,
    level: 'Principiante',
    category: 'Cardio',
    calories: 200,
    imageColor: 'linear-gradient(to right, #C33764, #1D2671)',
    icon: '🔥',
    equipment: ['None'],
    youtubeId: 'UheajlsZ72E',
    rating: 4.8,
    views: '8M',
    sections: []
  },
  {
    id: 'ch3',
    title: '8 Min Abs Anywhere',
    description: 'Routine addominali da fare ovunque.',
    creator: 'Chris Heria',
    duration: 8,
    level: 'Intermedio',
    category: 'Core',
    calories: 100,
    imageColor: 'linear-gradient(to right, #20002c, #cbb4d4)',
    icon: '🏠',
    equipment: ['None'],
    youtubeId: 'PhMwhb0rsVg',
    rating: 4.7,
    views: '6M',
    sections: []
  },
  {
    id: 'ch4',
    title: '12 Min Shredded',
    description: 'Allenamento ad alta intensità per definirsi.',
    creator: 'Chris Heria',
    duration: 12,
    level: 'Avanzato',
    category: 'Full Body',
    calories: 250,
    imageColor: 'linear-gradient(to right, #F00000, #DC281E)',
    icon: '⚡',
    equipment: ['None'],
    youtubeId: 'EhY6cGS7F-c',
    rating: 4.9,
    views: '4M',
    sections: []
  },
  {
    id: 'ch5',
    title: '10 Min 6-Pack + Burn',
    description: 'Combinazione letale di esercizi addominali e cardio.',
    creator: 'Chris Heria',
    duration: 10,
    level: 'Avanzato',
    category: 'Core',
    calories: 190,
    imageColor: 'linear-gradient(to right, #3a1c71, #d76d77, #ffaf7b)',
    icon: '💣',
    equipment: ['None'],
    youtubeId: 'ofTiKY3hYdE',
    rating: 4.8,
    views: '7M',
    sections: []
  },
  {
    id: 'ch6',
    title: '10 Min HIIT Cardio',
    description: 'HIIT esplosivo per sostituire il cardio stazionario.',
    creator: 'Chris Heria',
    duration: 10,
    level: 'Intermedio',
    category: 'Cardio',
    calories: 220,
    imageColor: 'linear-gradient(to right, #11998e, #38ef7d)',
    icon: '🏃',
    equipment: ['None'],
    youtubeId: 'edIK5SZYMZo',
    rating: 4.7,
    views: '3M',
    sections: []
  },
  {
    id: 'ch7',
    title: '5 Min Abs No Rest',
    description: '5 minuti intensi senza pause.',
    creator: 'Chris Heria',
    duration: 5,
    level: 'Tutti' as WorkoutLevel,
    category: 'Core',
    calories: 80,
    imageColor: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
    icon: '⏱️',
    equipment: ['None'],
    youtubeId: 'vhcyvcbVBQQ',
    rating: 4.8,
    views: '5M',
    sections: []
  },
  {
    id: 'ch_abs_supreme',
    title: 'Supreme 6-Pack Abs',
    description: 'La guida definitiva per addominali scolpiti. Tutti i distretti muscolari in 20 minuti.',
    creator: 'Chris Heria',
    duration: 20,
    level: 'Avanzato',
    category: 'Core',
    calories: 220,
    imageColor: 'linear-gradient(to right, #000000, #434343)',
    icon: '🍫',
    equipment: ['None', 'Pull-up Bar'],
    youtubeId: '0yZDVWab_dI',
    rating: 4.9,
    views: '4.2M',
    sections: [
        {
            title: 'Warm Up',
            exercises: [
                { id: 'ch_wu1', name: 'Jumping Jacks', sets: 2, reps: '45 sec', rest: 15 },
                { id: 'ch_wu2', name: 'High Knees', sets: 2, reps: '30 sec', rest: 30 }
            ]
        },
        {
            title: '6-Pack Circuit',
            exercises: [
                { id: 'ch_a1', name: 'Hanging Leg Raises', sets: 3, reps: '12-15', rest: 45, notes: 'Focus addome basso' },
                { id: 'ch_a2', name: 'Russian Twists', sets: 3, reps: '20', rest: 30, notes: 'Obliqui' },
                { id: 'ch_a3', name: 'Weighted Crunches', sets: 3, reps: '15', rest: 45, notes: 'Usa un peso o zaino' },
                { id: 'ch_a4', name: 'Bicycle Crunches', sets: 3, reps: '20', rest: 30, notes: 'Controllo totale' },
                { id: 'ch_a5', name: 'Plank Hold', sets: 3, reps: '60 sec', rest: 60, notes: 'Stabilità' }
            ]
        },
        {
            title: 'Cool Down',
            exercises: [
                { id: 'ch_cd1', name: 'Cobra Stretch', sets: 1, reps: '60 sec', rest: 0 },
                { id: 'ch_cd2', name: 'Child Pose', sets: 1, reps: '60 sec', rest: 0 }
            ]
        }
    ]
  },

  // --- Midas Movement Workouts ---
  {
    id: 'midas1',
    title: '20 Min Full Body Dumbbell',
    description: 'Allenamento completo con manubri per forza e definizione.',
    creator: 'Midas Movement',
    duration: 20,
    level: 'Intermedio',
    category: 'Full Body',
    calories: 220,
    imageColor: 'linear-gradient(to right, #FDB931, #9f7928)',
    icon: '🏋️',
    equipment: ['Dumbbells'],
    youtubeId: 'eV-5FWDf0f8',
    rating: 4.8,
    views: '1.2M',
    sections: []
  },
  {
    id: 'midas_chest_arms',
    title: 'Perfect Chest & Arms',
    description: 'Routine focalizzata su petto massiccio e braccia definite. I migliori esercizi valutati dalla community.',
    creator: 'Midas Movement',
    duration: 35,
    level: 'Intermedio',
    category: 'Upper Body',
    calories: 300,
    imageColor: 'linear-gradient(to right, #B8860B, #FFD700)',
    icon: '💪',
    equipment: ['Dumbbells', 'Bench'],
    youtubeId: 'rPZLkqr429g',
    rating: 4.9,
    views: '850k',
    sections: [
        {
            title: 'Warm Up',
            exercises: [
                { id: 'm_wu1', name: 'Arm Circles', sets: 2, reps: '30 sec', rest: 15 },
                { id: 'm_wu2', name: 'Push-ups', sets: 2, reps: '15', rest: 30 }
            ]
        },
        {
            title: 'Chest & Arms Destruction',
            exercises: [
                { id: 'm_ca1', name: 'Dumbbell Bench Press', sets: 4, reps: '10-12', rest: 90, notes: 'Controllo eccentrico' },
                { id: 'm_ca2', name: 'Incline Dumbbell Flys', sets: 3, reps: '12-15', rest: 60, notes: 'Focus parte alta petto' },
                { id: 'm_ca3', name: 'Diamond Push-ups', sets: 3, reps: 'Max', rest: 60, notes: 'Focus tricipiti e petto interno' },
                { id: 'm_ca4', name: 'Hammer Curls', sets: 4, reps: '12', rest: 60, notes: 'Braccia possenti' },
                { id: 'm_ca5', name: 'Tricep Dips (Bench)', sets: 3, reps: '15', rest: 45, notes: 'Bruciore finale' }
            ]
        },
        {
            title: 'Cool Down',
            exercises: [
                { id: 'm_cd1', name: 'Chest Stretch', sets: 1, reps: '60 sec', rest: 0 },
                { id: 'm_cd2', name: 'Tricep Stretch', sets: 1, reps: '30 sec/arm', rest: 0 }
            ]
        }
    ]
  },
  {
    id: 'midas2',
    title: '10 Min Total Abs',
    description: "Circuito addominali intenso per un core d'acciaio.",
    creator: 'Midas Movement',
    duration: 10,
    level: 'Tutti' as WorkoutLevel,
    category: 'Core',
    calories: 120,
    imageColor: 'linear-gradient(to right, #DAA520, #B8860B)',
    icon: '🍫',
    equipment: ['None'],
    youtubeId: 'aNsCuLD07WA',
    rating: 4.7,
    views: '2.1M',
    sections: []
  },
  {
    id: 'midas3',
    title: '45 Min Build & Burn',
    description: 'Sessione lunga per costruire muscolo e bruciare grassi.',
    creator: 'Midas Movement',
    duration: 45,
    level: 'Avanzato',
    category: 'Full Body',
    calories: 450,
    imageColor: 'linear-gradient(to right, #FFD700, #E6AC00)',
    icon: '🔥',
    equipment: ['Dumbbells'],
    youtubeId: '2D1195bkPHs',
    rating: 4.6,
    views: '500k',
    sections: []
  },
  {
    id: 'midas4',
    title: '20 Min Abs & Cardio',
    description: 'Mix perfetto di cardio e addome.',
    creator: 'Midas Movement',
    duration: 20,
    level: 'Intermedio',
    category: 'Cardio',
    calories: 250,
    imageColor: 'linear-gradient(to right, #F0E68C, #BDB76B)',
    icon: '🏃',
    equipment: ['None'],
    youtubeId: 'k4ruquag5zY',
    rating: 4.8,
    views: '900k',
    sections: []
  },

  // --- NEXT Workout ---
  {
    id: 'next_abs_master',
    title: 'Ultimate 6-Pack (15 Min)',
    description: 'Routine addominale completa e scientifica. Esercizi selezionati per massima attivazione.',
    creator: 'NEXT Workout',
    duration: 15,
    level: 'Avanzato',
    category: 'Core',
    calories: 180,
    imageColor: 'linear-gradient(to right, #00c6ff, #0072ff)',
    icon: '🍫',
    equipment: ['None'],
    youtubeId: 'hdng3Cm1x_c',
    rating: 4.9,
    views: '3.5M',
    sections: [
         {
            title: 'Activation',
            exercises: [
                { id: 'n_a1', name: 'Plank', sets: 1, reps: '60 sec', rest: 15 },
                { id: 'n_a2', name: 'Dead Bug', sets: 2, reps: '10/side', rest: 30 }
            ]
         },
         {
            title: 'Core Destruction',
            exercises: [
                { id: 'n_a3', name: 'Hanging Leg Raises', sets: 3, reps: '12-15', rest: 45, notes: 'Re dell\'addome basso' },
                { id: 'n_a4', name: 'Cable Crunches (o Band)', sets: 3, reps: '15-20', rest: 45, notes: 'Focus addome alto' },
                { id: 'n_a5', name: 'Russian Twists', sets: 3, reps: '20', rest: 30, notes: 'Obliqui in fuoco' },
                { id: 'n_a6', name: 'Ab Wheel Rollout', sets: 3, reps: '10', rest: 60, notes: 'Stabilità totale' }
            ]
         }
    ]
  },
  {
    id: 'next1',
    title: 'Push Day Mastery',
    description: 'Focus su petto, spalle e tricipiti con tecnica perfetta.',
    creator: 'NEXT Workout',
    duration: 45,
    level: 'Intermedio',
    category: 'Upper Body',
    calories: 350,
    imageColor: 'linear-gradient(to right, #00c6ff, #0072ff)',
    icon: '💪',
    equipment: ['Barbell', 'Dumbbells', 'Bench'],
    rating: 4.7,
    views: '1.5M',
    sections: [
      {
        title: 'Warm Up',
        exercises: [
          { id: 'wu1', name: 'Arm Circles', sets: 2, reps: '30 sec', rest: 0 },
          { id: 'wu2', name: 'Push-ups', sets: 2, reps: '10', rest: 30 }
        ]
      },
      {
        title: 'Main Workout',
        exercises: [
          { id: 'n1', name: 'Bench Press', sets: 4, reps: '8-10', rest: 90, youtubeId: 'vcBig73ojpE' },
          { id: 'n2', name: 'Overhead Press', sets: 3, reps: '10-12', rest: 90, youtubeId: '2yjwXTZQDDI' },
          { id: 'n3', name: 'Incline Dumbbell Press', sets: 3, reps: '12', rest: 60, youtubeId: '8iPEnn-ltbc' },
          { id: 'n4', name: 'Lateral Raises', sets: 3, reps: '15', rest: 45, youtubeId: '3VcKaXpzqRo' },
          { id: 'n5', name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: 45, youtubeId: '2-LAMcpzODU' }
        ]
      }
    ]
  },
  {
    id: 'next2',
    title: 'Pull Day Power',
    description: 'Schiena spessa e bicipiti scolpiti.',
    creator: 'NEXT Workout',
    duration: 50,
    level: 'Intermedio',
    category: 'Upper Body',
    calories: 380,
    imageColor: 'linear-gradient(to right, #1fa2ff, #12d8fa, #a6ffcb)',
    icon: '🧗',
    equipment: ['Pull-up Bar', 'Barbell', 'Dumbbells'],
    sections: [
      {
        title: 'Main Workout',
        exercises: [
          { id: 'n6', name: 'Deadlift', sets: 4, reps: '5-8', rest: 120, youtubeId: 'op9kVnSso6Q' },
          { id: 'n7', name: 'Pull-ups', sets: 3, reps: 'Max', rest: 90, youtubeId: 'eGo4IYlbE5g' },
          { id: 'n8', name: 'Barbell Row', sets: 3, reps: '10-12', rest: 90, youtubeId: 'G8l_8chR5BE' },
          { id: 'n9', name: 'Face Pulls', sets: 3, reps: '15', rest: 60, youtubeId: 'rep-w6d3pD8' },
          { id: 'n10', name: 'Barbell Curls', sets: 3, reps: '10-12', rest: 60, youtubeId: 'kwG2ipFRgfo' }
        ]
      }
    ]
  },
  {
    id: 'next3',
    title: 'Legs & Core Crusher',
    description: 'Costruisci gambe forti e un core stabile.',
    creator: 'NEXT Workout',
    duration: 50,
    level: 'Avanzato',
    category: 'Lower Body',
    calories: 450,
    imageColor: 'linear-gradient(to right, #11998e, #38ef7d)',
    icon: '🦵',
    equipment: ['Barbell', 'Dumbbells'],
    sections: [
      {
        title: 'Main Workout',
        exercises: [
          { id: 'n11', name: 'Squat', sets: 4, reps: '6-10', rest: 120, youtubeId: 'SW_C1A-rejs' },
          { id: 'n12', name: 'Romanian Deadlift', sets: 3, reps: '10-12', rest: 90, youtubeId: 'JCXUYuzwNrM' },
          { id: 'n13', name: 'Lunges', sets: 3, reps: '12 per leg', rest: 60, youtubeId: 'D7KaRcUTQeE' },
          { id: 'n14', name: 'Calf Raises', sets: 4, reps: '15-20', rest: 45, youtubeId: '-M4-G8p8fmc' },
          { id: 'n15', name: 'Hanging Leg Raises', sets: 3, reps: '12-15', rest: 60, youtubeId: 'hdng3Cm1x_c' }
        ]
      }
    ]
  },
  {
    id: 'next4',
    title: 'Full Body HIIT',
    description: 'Brucia calorie e migliora la resistenza.',
    creator: 'NEXT Workout',
    duration: 30,
    level: 'Intermedio',
    category: 'Cardio',
    calories: 400,
    imageColor: 'linear-gradient(to right, #ff416c, #ff4b2b)',
    icon: '🔥',
    equipment: ['None'],
    youtubeId: 'edIK5SZYMZo',
    sections: [
      {
        title: 'HIIT Circuit',
        exercises: [
          { id: 'n16', name: 'Burpees', sets: 4, reps: '45 sec', rest: 15 },
          { id: 'n17', name: 'Jump Squats', sets: 4, reps: '45 sec', rest: 15 },
          { id: 'n18', name: 'Mountain Climbers', sets: 4, reps: '45 sec', rest: 15 },
          { id: 'n19', name: 'Plank Jacks', sets: 4, reps: '45 sec', rest: 15 }
        ]
      }
    ]
  },
  {
    id: 'next5',
    title: 'Mobility & Skills',
    description: 'Migliora la flessibilità e impara nuove skill.',
    creator: 'NEXT Workout',
    duration: 40,
    level: 'Intermedio',
    category: 'Mobility',
    calories: 200,
    imageColor: 'linear-gradient(to right, #a8ff78, #78ffd6)',
    icon: '🧘',
    equipment: ['None'],
    sections: [
      {
        title: 'Flow',
        exercises: [
          { id: 'n20', name: 'World Greatest Stretch', sets: 3, reps: '60 sec', rest: 30 },
          { id: 'n21', name: 'Cat Cow', sets: 3, reps: '60 sec', rest: 30 },
          { id: 'n22', name: 'Deep Squat Hold', sets: 3, reps: '60 sec', rest: 30 },
          { id: 'n23', name: 'Crow Pose Practice', sets: 5, reps: 'Max hold', rest: 60 }
        ]
      }
    ]
  },
  {
    id: 'next6',
    title: 'Active Rest',
    description: 'Recupero attivo per rigenerare i muscoli.',
    creator: 'NEXT Workout',
    duration: 30,
    level: 'Principiante',
    category: 'Mobility',
    calories: 150,
    imageColor: 'linear-gradient(to right, #2980b9, #6dd5fa, #ffffff)',
    icon: '🔋',
    equipment: ['None'],
    youtubeId: 'UheajlsZ72E', // Fallback to verified video (Chris Heria 10 Min Fat Burn)
    sections: [
      {
        title: 'Recovery',
        exercises: [
          { id: 'n24', name: 'Light Walk / Jog', sets: 1, reps: '20 min', rest: 0 },
          { id: 'n25', name: 'Foam Rolling', sets: 1, reps: '10 min', rest: 0 }
        ]
      }
    ]
  },

  // --- WildMoose Workouts (Gamified) ---
  {
    id: 'wm1',
    title: 'Quest: Chest Chest',
    description: 'Completa la quest per ottenere il Chest Badge.',
    creator: 'WildMoose',
    duration: 40,
    level: 'Intermedio',
    category: 'Upper Body',
    calories: 300,
    imageColor: 'linear-gradient(to right, #833ab4, #fd1d1d, #fcb045)',
    icon: '🛡️',
    equipment: ['Dumbbells', 'Bench'],
    gamification: { xp: 500, badge: 'Chest Guardian' },
    youtubeId: 'EhY6cGS7F-c',
    rating: 4.7,
    views: '150k',
    sections: [
      {
        title: 'Boss Battle',
        exercises: [
          { id: 'wm_e1', name: 'Dumbbell Bench Press', sets: 4, reps: '10', rest: 60 },
          { id: 'wm_e2', name: 'Incline Flys', sets: 3, reps: '12', rest: 60 },
          { id: 'wm_e3', name: 'Push-up Finisher', sets: 1, reps: 'Max', rest: 0 }
        ]
      }
    ]
  },
  {
    id: 'wm_hero_quest',
    title: 'Hero\'s Full Body Quest',
    description: 'Un viaggio epico attraverso tutti i gruppi muscolari. Bilanciamento perfetto tra forza e resistenza.',
    creator: 'WildMoose',
    duration: 45,
    level: 'Intermedio',
    category: 'Full Body',
    calories: 400,
    imageColor: 'linear-gradient(to right, #8E2DE2, #4A00E0)',
    icon: '⚔️',
    equipment: ['Dumbbells'],
    gamification: { xp: 800, badge: 'True Hero' },
    youtubeId: 'UheajlsZ72E',
    rating: 4.8,
    views: '300k',
    sections: [
        {
            title: 'Preparation Phase',
            exercises: [
                { id: 'wm_hq1', name: 'Dynamic Stretching', sets: 1, reps: '3 min', rest: 0 },
                { id: 'wm_hq2', name: 'Light Jog in Place', sets: 1, reps: '2 min', rest: 60 }
            ]
        },
        {
            title: 'The Adventure',
            exercises: [
                { id: 'wm_hq3', name: 'Goblet Squats', sets: 3, reps: '12', rest: 60, notes: 'Gambe potenti' },
                { id: 'wm_hq4', name: 'Push-ups', sets: 3, reps: '15', rest: 60, notes: 'Spinta' },
                { id: 'wm_hq5', name: 'Dumbbell Rows', sets: 3, reps: '12/side', rest: 60, notes: 'Trazione' },
                { id: 'wm_hq6', name: 'Overhead Press', sets: 3, reps: '10', rest: 60, notes: 'Spalle forti' },
                { id: 'wm_hq7', name: 'Walking Lunges', sets: 3, reps: '20 steps', rest: 90, notes: 'Resistenza' }
            ]
        },
        {
            title: 'Victory Rest',
            exercises: [
                { id: 'wm_hq8', name: 'Full Body Stretch', sets: 1, reps: '5 min', rest: 0 }
            ]
        }
    ]
  },
  {
    id: 'wm2',
    title: 'Quest: Back Attack',
    description: 'Sconfiggi il mal di schiena e costruisci un dorso possente.',
    creator: 'WildMoose',
    duration: 45,
    level: 'Intermedio',
    category: 'Upper Body',
    calories: 320,
    imageColor: 'linear-gradient(to right, #00b09b, #96c93d)',
    icon: '🏹',
    equipment: ['Pull-up Bar', 'Dumbbells'],
    gamification: { xp: 550, badge: 'Back Ranger' },
    youtubeId: 'eGo4IYlbE5g',
    rating: 4.6,
    views: '120k',
    sections: [
      {
        title: 'Main Quest',
        exercises: [
          { id: 'wm_e4', name: 'Pull-ups', sets: 3, reps: 'Max', rest: 90 },
          { id: 'wm_e5', name: 'Dumbbell Rows', sets: 4, reps: '10', rest: 60 },
          { id: 'wm_e6', name: 'Renegade Rows', sets: 3, reps: '10', rest: 60 }
        ]
      }
    ]
  },
  {
    id: 'wm3',
    title: 'Quest: Leg Day Survival',
    description: 'Sopravvivi al giorno delle gambe per ottenere la pozione di velocità.',
    creator: 'WildMoose',
    duration: 50,
    level: 'Avanzato',
    category: 'Lower Body',
    calories: 400,
    imageColor: 'linear-gradient(to right, #cb356b, #bd3f32)',
    icon: '🦵',
    equipment: ['Dumbbells'],
    gamification: { xp: 600, badge: 'Leg Legend' },
    youtubeId: 'SW_C1A-rejs',
    rating: 4.8,
    views: '180k',
    sections: [
      {
        title: 'The Gauntlet',
        exercises: [
          { id: 'wm_e7', name: 'Goblet Squats', sets: 4, reps: '12', rest: 90 },
          { id: 'wm_e8', name: 'Walking Lunges', sets: 3, reps: '20 steps', rest: 60 },
          { id: 'wm_e9', name: 'Bulgarian Split Squats', sets: 3, reps: '10/leg', rest: 90 }
        ]
      }
    ]
  },
  {
    id: 'wm4',
    title: 'Quest: Shoulder Boulder',
    description: 'Costruisci spalle larghe come macigni.',
    creator: 'WildMoose',
    duration: 35,
    level: 'Intermedio',
    category: 'Upper Body',
    calories: 250,
    imageColor: 'linear-gradient(to right, #360033, #0b8793)',
    icon: '🗿',
    equipment: ['Dumbbells'],
    gamification: { xp: 450, badge: 'Boulder Shoulders' },
    youtubeId: '3VcKaXpzqRo',
    rating: 4.5,
    views: '110k',
    sections: [
      {
        title: 'Summit Climb',
        exercises: [
          { id: 'wm_e10', name: 'Overhead Press', sets: 4, reps: '10', rest: 90 },
          { id: 'wm_e11', name: 'Lateral Raises', sets: 4, reps: '15', rest: 45 },
          { id: 'wm_e12', name: 'Face Pulls', sets: 3, reps: '15', rest: 60 }
        ]
      }
    ]
  },
  {
    id: 'wm5',
    title: 'Quest: Arms Race',
    description: 'Bicipiti e tricipiti pronti per la battaglia.',
    creator: 'WildMoose',
    duration: 30,
    level: 'Intermedio',
    category: 'Upper Body',
    calories: 200,
    imageColor: 'linear-gradient(to right, #e55d87, #5fc3e4)',
    icon: '💪',
    equipment: ['Dumbbells'],
    gamification: { xp: 400, badge: 'Arm Armory' },
    youtubeId: '2-LAMcpzODU',
    rating: 4.7,
    views: '140k',
    sections: [
      {
        title: 'Weapon Sharpening',
        exercises: [
          { id: 'wm_e13', name: 'Hammer Curls', sets: 3, reps: '12', rest: 60 },
          { id: 'wm_e14', name: 'Skullcrushers', sets: 3, reps: '12', rest: 60 },
          { id: 'wm_e15', name: 'Concentration Curls', sets: 2, reps: '15', rest: 45 }
        ]
      }
    ]
  },
  {
    id: 'wm6',
    title: 'Quest: Full Body Boss',
    description: 'Lo scontro finale. Tutto il corpo in un solo allenamento.',
    creator: 'WildMoose',
    duration: 60,
    level: 'Avanzato',
    category: 'Full Body',
    calories: 500,
    imageColor: 'linear-gradient(to right, #0f0c29, #302b63, #24243e)',
    icon: '👑',
    equipment: ['Dumbbells', 'Pull-up Bar'],
    gamification: { xp: 1000, badge: 'Boss Slayer' },
    youtubeId: 'EhY6cGS7F-c',
    rating: 4.9,
    views: '200k',
    sections: [
      {
        title: 'Final Boss',
        exercises: [
          { id: 'wm_e16', name: 'Man Makers', sets: 5, reps: '10', rest: 90 },
          { id: 'wm_e17', name: 'Pull-ups', sets: 4, reps: 'Max', rest: 90 },
          { id: 'wm_e18', name: 'Jump Squats', sets: 4, reps: '20', rest: 60 }
        ]
      }
    ]
  },
  {
    id: 'wm7',
    title: 'Quest: Recovery Potion',
    description: 'Rigenera i tuoi HP con stretching e mobilità.',
    creator: 'WildMoose',
    duration: 20,
    level: 'Principiante',
    category: 'Mobility',
    calories: 100,
    imageColor: 'linear-gradient(to right, #00d2ff, #3a7bd5)',
    icon: '🧪',
    equipment: ['None'],
    gamification: { xp: 200, badge: 'Zen Master' },
    youtubeId: 'vhcyvcbVBQQ',
    rating: 4.8,
    views: '105k',
    sections: [
      {
        title: 'Healing Pool',
        exercises: [
          { id: 'wm_e19', name: 'Child Pose', sets: 1, reps: '2 min', rest: 0 },
          { id: 'wm_e20', name: 'Pigeon Pose', sets: 1, reps: '2 min/leg', rest: 0 },
          { id: 'wm_e21', name: 'Downward Dog', sets: 1, reps: '2 min', rest: 0 }
        ]
      }
    ]
  }
];

export const APPROVED_CREATORS: Creator[] = ['Chris Heria', 'Midas Movement', 'NEXT Workout', 'WildMoose', 'Smart Mix'];

// Filtro di sicurezza per garantire che solo i contenuti approvati siano accessibili
export const getApprovedWorkouts = () => {
    return WORKOUT_DB.filter(w => APPROVED_CREATORS.includes(w.creator));
};

