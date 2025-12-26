export type DeviceType = 'None' | 'Bimby TM5' | 'Ninja Creami' | 'Ninja Estrattore' | 'Forno' | 'Padella';
export type RecipeCategory = 'Smoothie' | 'Extract' | 'Quick' | 'Michelin' | 'Nourish' | 'Athlete' | 'Dessert Fit' | 'Detox';
export type MealType = 'breakfast' | 'lunch' | 'snack' | 'dinner';

export interface Ingredient {
  name: string;
  qty: number; // Quantità base per 1 persona
  unit: string;
  category: string; // Per la lista della spesa
  bimbyQuery?: string; // Query per cercare la ricetta su Bimby/Cookidoo
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  category: RecipeCategory;
  device: DeviceType;
  brand?: 'ninja' | 'bimby';
  prepTime: number; // minuti
  mealType: MealType[];
  ingredients: Ingredient[];
  steps: string[];
  macros: { cal: number; protein: number; carb: number; fat: number };
  tags: string[]; // es. "Anti-Ginecomastia", "Detox", "High-Protein"
  seasons: string[]; // 'Winter', 'Spring', 'Summer', 'Autumn' or 'All'
}

export interface Supplement {
  id: string;
  name: string;
  description: string;
  dosage: string;
  timing: string;
  goal: string;
  warning?: string;
}

export const SUPPLEMENTS_DB: Supplement[] = [
  {
    id: 's1',
    name: 'Proteine Whey Isolate',
    description: 'Proteine a rapido assorbimento per il recupero muscolare.',
    dosage: '30g',
    timing: 'Post-workout o a colazione',
    goal: 'Muscle Recovery'
  },
  {
    id: 's2',
    name: 'Caffeina Anidra / Termogenico',
    description: 'Stimolante metabolico per aumentare il dispendio calorico.',
    dosage: '200mg',
    timing: 'Pre-workout (non dopo le 16:00)',
    goal: 'Fat Loss',
    warning: 'Evitare in caso di ipertensione o ansia.'
  },
  {
    id: 's3',
    name: 'Omega-3 (Olio di Pesce)',
    description: 'Acidi grassi essenziali per la salute cardiovascolare e antinfiammatoria.',
    dosage: '2g',
    timing: 'Ai pasti principali',
    goal: 'General Health'
  },
  {
    id: 's4',
    name: 'Multivitaminico Sport',
    description: 'Micro-nutrienti essenziali per supportare il metabolismo attivo.',
    dosage: '1 compressa',
    timing: 'Colazione',
    goal: 'General Health'
  },
  {
    id: 's5',
    name: 'EAA (Aminoacidi Essenziali)',
    description: 'Mattoni fondamentali per la sintesi proteica.',
    dosage: '10g',
    timing: 'Intra-workout',
    goal: 'Muscle Preservation'
  },
  {
    id: 's6',
    name: 'Zinco Picolinato + DIM',
    description: 'Supporto ormonale chiave per ottimizzare il testosterone e metabolizzare gli estrogeni in eccesso.',
    dosage: '30mg Zinco / 200mg DIM',
    timing: 'Prima di dormire',
    goal: 'Hormonal Balance',
    warning: 'Non superare le dosi consigliate.'
  }
];

export const RECIPE_DB: Recipe[] = [
  // --- BIMBY RECIPES ---
  {
    id: 'bi1',
    title: 'Pancake Proteico Bimby',
    description: 'Pancake soffici e proteici preparati in un attimo con il Bimby. Perfetti per una colazione fit.',
    category: 'Quick',
    device: 'Bimby TM5',
    brand: 'bimby',
    prepTime: 10,
    mealType: ['breakfast'],
    ingredients: [
      { name: 'Albumi', qty: 200, unit: 'ml', category: 'Dairy' },
      { name: 'Farina d\'avena', qty: 80, unit: 'g', category: 'Grains' },
      { name: 'Yogurt Greco 0%', qty: 50, unit: 'g', category: 'Dairy' },
      { name: 'Lievito per dolci', qty: 0.5, unit: 'bustina', category: 'Baking' }
    ],
    steps: [
      'Inserire nel boccale tutti gli ingredienti: albumi, farina d\'avena, yogurt greco e lievito.',
      'Frullare 30 sec. vel. 5.',
      'Raccogliere sul fondo con la spatola e frullare ancora 10 sec. vel. 5.',
      'Scaldare una padella antiaderente e cuocere i pancake 2 minuti per lato finché dorati.'
    ],
    macros: { cal: 450, protein: 35, carb: 60, fat: 5 },
    tags: ['High-Protein', 'Breakfast', 'Bimby'],
    seasons: ['All']
  },
  {
    id: 'bi2',
    title: 'Vellutata Detox di Verdure',
    description: 'Un classico Bimby: vellutata leggera e depurativa, ideale per cene invernali o post-abbuffata.',
    category: 'Detox',
    device: 'Bimby TM5',
    brand: 'bimby',
    prepTime: 30,
    mealType: ['dinner'],
    ingredients: [
      { name: 'Verdure Miste (Zucchine, Carote, Sedano)', qty: 400, unit: 'g', category: 'Vegetables' },
      { name: 'Cipolla', qty: 1, unit: 'pz', category: 'Vegetables' },
      { name: 'Olio EVO', qty: 10, unit: 'g', category: 'Pantry' },
      { name: 'Acqua', qty: 400, unit: 'ml', category: 'Beverages' }
    ],
    steps: [
      'Mettere nel boccale le verdure a pezzi e la cipolla: tritare 5 sec. vel. 5.',
      'Aggiungere l\'olio e insaporire: 3 min. 100° vel. 1.',
      'Aggiungere l\'acqua e un pizzico di sale (o dado vegetale bimby): cuocere 20 min. 100° vel. 1.',
      'A cottura ultimata, attendere qualche istante e omogeneizzare: 1 min. vel. progressiva 5-10.',
      'Servire calda con un filo d\'olio a crudo.'
    ],
    macros: { cal: 250, protein: 5, carb: 30, fat: 12 },
    tags: ['Detox', 'Vegan', 'Dinner', 'Bimby'],
    seasons: ['Winter', 'Autumn']
  },
  {
    id: 'bi3',
    title: 'Hummus di Ceci Light',
    description: 'Crema di ceci speziata e gustosa, pronta in pochi secondi. Ottima fonte di proteine vegetali.',
    category: 'Nourish',
    device: 'Bimby TM5',
    brand: 'bimby',
    prepTime: 5,
    mealType: ['snack', 'dinner'],
    ingredients: [
      { name: 'Ceci precotti (scolati)', qty: 250, unit: 'g', category: 'Pantry' },
      { name: 'Tahina (pasta di sesamo)', qty: 30, unit: 'g', category: 'Pantry' },
      { name: 'Succo di Limone', qty: 0.5, unit: 'pz', category: 'Produce' },
      { name: 'Aglio', qty: 0.5, unit: 'spicchio', category: 'Vegetables' },
      { name: 'Olio EVO', qty: 10, unit: 'g', category: 'Pantry' },
      { name: 'Cumino', qty: 1, unit: 'pizzico', category: 'Spices' }
    ],
    steps: [
      'Inserire nel boccale l\'aglio e tritare: 3 sec. vel. 7.',
      'Aggiungere ceci, tahina, succo di limone, olio, cumino e un pizzico di sale.',
      'Frullare 30 sec. vel. 5.',
      'Se necessario, aggiungere un cucchiaio di acqua ghiacciata per rendere più cremoso e frullare altri 20 sec. vel. 5-7.',
      'Servire con verdure crude o pane integrale.'
    ],
    macros: { cal: 380, protein: 15, carb: 35, fat: 20 },
    tags: ['Vegan', 'High-Protein', 'Snack', 'Bimby'],
    seasons: ['All']
  },
  // --- NINJA CREAMI (Ice Cream) ---
  {
    id: 'nc1',
    title: 'Oreo Protein Blast',
    description: 'Gelato proteico gusto Cookies & Cream, cremoso e con 40g+ di proteine. Perfetto post-workout o come dessert serale.',
    category: 'Dessert Fit',
    device: 'Ninja Creami',
    brand: 'ninja',
    prepTime: 5,
    mealType: ['snack'],
    ingredients: [
      { name: 'Latte Proteico (es. Fairlife/Carb Killa)', qty: 400, unit: 'ml', category: 'Latticini' },
      { name: 'Proteine in polvere (Vaniglia/Cookies)', qty: 30, unit: 'g', category: 'Integratori' },
      { name: 'Budino istantaneo senza zucchero (Vaniglia)', qty: 10, unit: 'g', category: 'Dolci' },
      { name: 'Oreo (o simili)', qty: 2, unit: 'biscotti', category: 'Dolci' }
    ],
    steps: [
      'Mescolare latte, proteine e budino in polvere nel barattolo Creami.',
      'Congelare per 24 ore.',
      'Processare con funzione "Lite Ice Cream".',
      'Se farinoso, aggiungere un goccio di latte e fare "Re-Spin".',
      'Creare un buco al centro, aggiungere i biscotti sbriciolati e usare funzione "Mix-In".'
    ],
    macros: { cal: 350, protein: 45, carb: 25, fat: 8 },
    tags: ['High-Protein', 'Post-Workout', 'Sweet-Tooth'],
    seasons: ['All']
  },
  {
    id: 'nc2',
    title: 'Strawberry Cheesecake Fit',
    description: 'Gelato ricco di proteine grazie ai fiocchi di latte (Cottage Cheese), gusto cheesecake alla fragola.',
    category: 'Dessert Fit',
    device: 'Ninja Creami',
    prepTime: 5,
    mealType: ['snack', 'breakfast'],
    ingredients: [
      { name: 'Fiocchi di Latte (Cottage Cheese)', qty: 200, unit: 'g', category: 'Latticini' },
      { name: 'Fragole congelate', qty: 150, unit: 'g', category: 'Frutta' },
      { name: 'Miele o Dolcificante', qty: 1, unit: 'tbsp', category: 'Condimenti' },
      { name: 'Latte di Mandorla', qty: 50, unit: 'ml', category: 'Latticini' }
    ],
    steps: [
      'Frullare fiocchi di latte, dolcificante e fragole finché liscio.',
      'Versare nel barattolo Creami e congelare per 24 ore.',
      'Processare con funzione "Lite Ice Cream".',
      'Opzionale: aggiungere biscotti integrali sbriciolati come Mix-In.'
    ],
    macros: { cal: 280, protein: 25, carb: 30, fat: 6 },
    tags: ['High-Protein', 'Cheesecake', 'Fruit'],
    seasons: ['Spring', 'Summer']
  },
  {
    id: 'nc3',
    title: 'Mango Lime Sorbet',
    description: 'Sorbetto rinfrescante e leggerissimo, solo frutta e zero grassi.',
    category: 'Dessert Fit',
    device: 'Ninja Creami',
    prepTime: 5,
    mealType: ['snack'],
    ingredients: [
      { name: 'Mango (fresco o in scatola al naturale)', qty: 300, unit: 'g', category: 'Frutta' },
      { name: 'Succo di Lime', qty: 1, unit: 'lime', category: 'Frutta' },
      { name: 'Acqua di Cocco (o acqua)', qty: 50, unit: 'ml', category: 'Bevande' }
    ],
    steps: [
      'Frullare il mango con il lime e l\'acqua.',
      'Versare nel barattolo Creami e congelare per 24 ore.',
      'Processare con funzione "Sorbet".'
    ],
    macros: { cal: 180, protein: 2, carb: 45, fat: 0 },
    tags: ['Vegan', 'Low-Fat', 'Refreshing'],
    seasons: ['Summer']
  },

  // --- NINJA ESTRATTORE (Juice/Smoothie) ---
  {
    id: 'ne1',
    title: 'Ultimate Green Detox',
    description: 'Il succo verde definitivo per depurare e sgonfiare. Ricco di antiossidanti e povero di zuccheri.',
    category: 'Detox',
    device: 'Ninja Estrattore',
    brand: 'ninja',
    prepTime: 5,
    mealType: ['breakfast', 'snack'],
    ingredients: [
      { name: 'Spinaci freschi', qty: 50, unit: 'g', category: 'Verdura' },
      { name: 'Mela Verde', qty: 1, unit: 'pz', category: 'Frutta' },
      { name: 'Cetriolo', qty: 0.5, unit: 'pz', category: 'Verdura' },
      { name: 'Sedano', qty: 1, unit: 'gambo', category: 'Verdura' },
      { name: 'Limone (pelato)', qty: 0.5, unit: 'pz', category: 'Frutta' },
      { name: 'Zenzero fresco', qty: 2, unit: 'cm', category: 'Verdura' }
    ],
    steps: [
      'Lavare bene tutti gli ingredienti.',
      'Tagliare la mela e il cetriolo a pezzi adatti all\'imbocco.',
      'Inserire nell\'estrattore alternando foglie e pezzi duri.',
      'Bere immediatamente per massimizzare le vitamine.'
    ],
    macros: { cal: 120, protein: 3, carb: 25, fat: 0 },
    tags: ['Detox', 'Vegan', 'Immunity'],
    seasons: ['All']
  },
  {
    id: 'ne2',
    title: 'Metabolic Fire Shot',
    description: 'Un estratto potente per attivare il metabolismo e la termogenesi. Gusto intenso e speziato.',
    category: 'Extract',
    device: 'Ninja Estrattore',
    prepTime: 5,
    mealType: ['breakfast'],
    ingredients: [
      { name: 'Carote', qty: 2, unit: 'pz', category: 'Verdura' },
      { name: 'Arancia (pelata)', qty: 1, unit: 'pz', category: 'Frutta' },
      { name: 'Curcuma fresca', qty: 2, unit: 'cm', category: 'Verdura' },
      { name: 'Pepe nero', qty: 1, unit: 'pizzico', category: 'Condimenti' },
      { name: 'Limone', qty: 0.5, unit: 'pz', category: 'Frutta' }
    ],
    steps: [
      'Inserire carote, arancia, curcuma e limone nell\'estrattore.',
      'Aggiungere un pizzico di pepe nero al succo finale (aumenta l\'assorbimento della curcumina).'
    ],
    macros: { cal: 90, protein: 2, carb: 20, fat: 0 },
    tags: ['Fat-Burner', 'Anti-Inflammatory', 'Morning-Kick'],
    seasons: ['Winter', 'Autumn']
  },
  {
    id: 'ne3',
    title: 'PB&J Power Smoothie',
    description: 'Un frullato completo che sa di pane, burro di arachidi e marmellata. Ottimo per massa pulita.',
    category: 'Nourish',
    device: 'Ninja Estrattore', // Usato come Blender in questo caso
    prepTime: 3,
    mealType: ['breakfast', 'snack'],
    ingredients: [
      { name: 'Latte (o bevanda vegetale)', qty: 250, unit: 'ml', category: 'Bevande' },
      { name: 'Frutti di bosco congelati', qty: 100, unit: 'g', category: 'Frutta' },
      { name: 'Burro di Arachidi', qty: 1, unit: 'tbsp', category: 'Condimenti' },
      { name: 'Avena istantanea', qty: 30, unit: 'g', category: 'Cereali' },
      { name: 'Proteine Vaniglia', qty: 30, unit: 'g', category: 'Integratori' }
    ],
    steps: [
      'Inserire tutti gli ingredienti nel bicchiere del frullatore Ninja.',
      'Frullare con funzione "Smoothie" o "Blend" per 45-60 secondi.',
      'Servire freddo.'
    ],
    macros: { cal: 450, protein: 35, carb: 40, fat: 15 },
    tags: ['Bulking', 'Tasty', 'Breakfast'],
    seasons: ['All']
  },

  // --- SPECIALI (Hormonal) ---
  {
    id: 'h1',
    title: 'Broccoli & Beef "Testo-Booster"',
    description: 'Pasto strategico: i broccoli contengono Indolo-3-Carbinolo che aiuta a eliminare gli estrogeni, il manzo fornisce zinco e grassi saturi per il testosterone.',
    category: 'Athlete',
    device: 'Padella',
    prepTime: 15,
    mealType: ['lunch', 'dinner'],
    ingredients: [
      { name: 'Macinato Magro Manzo', qty: 200, unit: 'g', category: 'Carne' },
      { name: 'Broccoli', qty: 200, unit: 'g', category: 'Verdura' },
      { name: 'Aglio', qty: 1, unit: 'spicchio', category: 'Verdura' },
      { name: 'Olio EVO', qty: 10, unit: 'g', category: 'Condimenti' }
    ],
    steps: [
      'Sbollentare i broccoli per 3-4 minuti.',
      'Rosolare il manzo in padella con aglio finché ben cotto.',
      'Unire i broccoli e saltare per altri 2 minuti.',
      'Condire a crudo con olio EVO.'
    ],
    macros: { cal: 550, protein: 45, carb: 10, fat: 35 },
    tags: ['Anti-Estrogen', 'High-Protein', 'Keto-Friendly'],
    seasons: ['All']
  },
  // --- COLAZIONE (CR7 & Nourish) ---
  {
    id: 'b1',
    title: 'Colazione del Campione (CR7 Style)',
    description: 'La classica colazione salata ad alto valore biologico usata dagli atleti d\'élite.',
    category: 'Athlete',
    device: 'Padella',
    prepTime: 10,
    mealType: ['breakfast'],
    ingredients: [
      { name: 'Uova Bio', qty: 2, unit: 'pz', category: 'Uova & Latticini' },
      { name: 'Albume', qty: 100, unit: 'ml', category: 'Uova & Latticini' },
      { name: 'Avocado', qty: 50, unit: 'g', category: 'Ortofrutta' },
      { name: 'Pane di Segale', qty: 50, unit: 'g', category: 'Panetteria' }
    ],
    steps: [
      'Scaldare una padella antiaderente senza grassi aggiunti.',
      'Versare gli albumi e cuocere per 2 minuti finché bianchi.',
      'Aggiungere le uova intere al centro e cuocere all\'occhio di bue (o strapazzate se preferisci).',
      'Tostare il pane di segale e spalmare l\'avocado schiacciato con un pizzico di sale e limone.',
      'Servire le uova sopra il pane.'
    ],
    macros: { cal: 420, protein: 28, carb: 25, fat: 22 },
    tags: ['High-Protein', 'Testosterone-Support'],
    seasons: ['All']
  },
  {
    id: 'b2',
    title: 'Porridge "Michelin" alla Cannella',
    description: 'Avena cotta come un risotto per una cremosità superiore, senza zuccheri.',
    category: 'Michelin',
    device: 'Padella',
    prepTime: 15,
    mealType: ['breakfast'],
    ingredients: [
      { name: 'Fiocchi d\'Avena', qty: 60, unit: 'g', category: 'Cereali' },
      { name: 'Latte di Mandorla (0 zuccheri)', qty: 200, unit: 'ml', category: 'Bevande' },
      { name: 'Proteine in polvere (Vaniglia)', qty: 30, unit: 'g', category: 'Integratori' },
      { name: 'Frutti di Bosco', qty: 100, unit: 'g', category: 'Ortofrutta' },
      { name: 'Cannella', qty: 1, unit: 'pizzico', category: 'Spezie' }
    ],
    steps: [
      'Tostare l\'avena a secco in un pentolino per 2 minuti per sprigionare l\'aroma (tecnica risottata).',
      'Aggiungere il latte di mandorla poco alla volta, mescolando continuamente.',
      'A fuoco spento, mantecare con le proteine in polvere sciolte in un goccio d\'acqua.',
      'Impiattare decorando con frutti di bosco freschi e una spolverata di cannella.'
    ],
    macros: { cal: 380, protein: 32, carb: 45, fat: 8 },
    tags: ['Gourmet', 'Fibre'],
    seasons: ['Winter', 'Autumn', 'Spring']
  },

  // --- PRANZO (Quick & Bimby) ---
  {
    id: 'l1',
    title: 'Risotto di Quinoa e Zafferano',
    description: 'Un "finto" risotto iper-proteico e a basso indice glicemico.',
    category: 'Quick', // Adattabile
    device: 'Bimby TM5',
    prepTime: 25,
    mealType: ['lunch'],
    ingredients: [
      { name: 'Quinoa', qty: 80, unit: 'g', category: 'Cereali' },
      { name: 'Zucchine', qty: 150, unit: 'g', category: 'Ortofrutta' },
      { name: 'Gamberetti', qty: 150, unit: 'g', category: 'Pescheria' },
      { name: 'Zafferano', qty: 1, unit: 'bustina', category: 'Spezie' },
      { name: 'Brodo Vegetale', qty: 300, unit: 'ml', category: 'Dispensa' }
    ],
    steps: [
      'Inserire nel boccale le zucchine: 5 sec, vel 4. Mettere da parte.',
      'Inserire 500g acqua nel boccale, posizionare cestello con quinoa: 15 min, Varoma, vel 1.',
      'Nel Varoma cuocere i gamberetti contemporaneamente.',
      'Svuotare il boccale, unire quinoa, gamberi, zucchine e zafferano sciolto in poca acqua calda.',
      'Mantecare 2 min, 100°, antiorario, vel soft.'
    ],
    macros: { cal: 450, protein: 35, carb: 55, fat: 10 },
    tags: ['Low-GI', 'Bimby'],
    seasons: ['Spring', 'Summer']
  },
  {
    id: 'l2',
    title: 'Pollo "Sous-Vide" con Verdure Croccanti',
    description: 'Petto di pollo tenerissimo cotto a bassa temperatura (simulata).',
    category: 'Michelin',
    device: 'Padella',
    prepTime: 20,
    mealType: ['lunch'],
    ingredients: [
      { name: 'Petto di Pollo', qty: 200, unit: 'g', category: 'Macelleria' },
      { name: 'Broccoli', qty: 200, unit: 'g', category: 'Ortofrutta' },
      { name: 'Olio EVO', qty: 10, unit: 'ml', category: 'Condimenti' },
      { name: 'Riso Basmati', qty: 60, unit: 'g', category: 'Cereali' }
    ],
    steps: [
      'Battere il pollo per renderlo di spessore uniforme.',
      'Cuocere in padella a fuoco bassissimo con coperchio per 12 minuti (non deve rosolare, deve rimanere bianco e succoso).',
      'Scottare i broccoli in acqua bollente per 3 minuti e passarli subito in acqua e ghiaccio (shock termico per colore verde brillante).',
      'Servire con riso basmati e un filo d\'olio a crudo.'
    ],
    macros: { cal: 550, protein: 50, carb: 50, fat: 15 },
    tags: ['Anti-Estrogen', 'Clean'],
    seasons: ['Winter', 'Autumn']
  },

  // --- SPUNTINI (Ninja & Smoothie) ---
  {
    id: 's1',
    title: 'Gelato Proteico "Creami" al Cioccolato',
    description: 'Voluminoso, saziante e perfetto per la voglia di dolce.',
    category: 'Dessert Fit',
    device: 'Ninja Creami',
    prepTime: 5, // + congelamento
    mealType: ['snack'],
    ingredients: [
      { name: 'Latte Proteico Cioccolato', qty: 250, unit: 'ml', category: 'Latticini' },
      { name: 'Cacao Amaro', qty: 10, unit: 'g', category: 'Dispensa' },
      { name: 'Dolcificante (Eritritolo)', qty: 10, unit: 'g', category: 'Dispensa' }
    ],
    steps: [
      'Mescolare gli ingredienti e congelare nel barattolo Ninja per 24h.',
      'Processare con funzione "Lite Ice Cream".',
      'Se farinoso, aggiungere un cucchiaio di latte e fare "Re-Spin".'
    ],
    macros: { cal: 180, protein: 25, carb: 10, fat: 5 },
    tags: ['Ninja', 'High-Volume'],
    seasons: ['Summer', 'Spring', 'All']
  },
  {
    id: 's2',
    title: 'Green Juice "Detox Viscerale"',
    description: 'Mix di vegetali specifici per ridurre l\'infiammazione.',
    category: 'Smoothie',
    device: 'Ninja Estrattore',
    prepTime: 5,
    mealType: ['snack'],
    ingredients: [
      { name: 'Sedano', qty: 2, unit: 'gambi', category: 'Ortofrutta' },
      { name: 'Mela Verde', qty: 1, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Zenzero', qty: 2, unit: 'cm', category: 'Ortofrutta' },
      { name: 'Limone', qty: 0.5, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Cetriolo', qty: 1, unit: 'pz', category: 'Ortofrutta' }
    ],
    steps: [
      'Lavare accuratamente tutte le verdure.',
      'Inserire nell\'estrattore alternando consistenze dure e morbide.',
      'Bere immediatamente per massimizzare gli enzimi.'
    ],
    macros: { cal: 90, protein: 2, carb: 20, fat: 0 },
    tags: ['Detox', 'Vitamins'],
    seasons: ['All']
  },

  // --- CENA (Nourish & Low Carb) ---
  {
    id: 'd1',
    title: 'Salmone "Nourish" Bowl',
    description: 'Ricca di Omega-3 e grassi sani per l\'assetto ormonale notturno.',
    category: 'Nourish',
    device: 'Forno',
    prepTime: 25,
    mealType: ['dinner'],
    ingredients: [
      { name: 'Salmone Selvaggio', qty: 200, unit: 'g', category: 'Pescheria' },
      { name: 'Asparagi', qty: 200, unit: 'g', category: 'Ortofrutta' },
      { name: 'Olio EVO', qty: 10, unit: 'ml', category: 'Condimenti' },
      { name: 'Semi di Sesamo', qty: 5, unit: 'g', category: 'Dispensa' }
    ],
    steps: [
      'Disporre il salmone e gli asparagi su una teglia con carta forno.',
      'Spennellare con olio e cospargere di sesamo.',
      'Cuocere a 180°C per 15-18 minuti.',
      'Condire con limone fresco prima di servire.'
    ],
    macros: { cal: 480, protein: 45, carb: 8, fat: 28 },
    tags: ['Omega-3', 'Keto-Friendly'],
    seasons: ['Spring']
  },
  {
    id: 'd2',
    title: 'Vellutata "Bimby" Anti-Gonfiore',
    description: 'Finocchi e Zucchine per favorire la digestione e ridurre il girovita.',
    category: 'Quick',
    device: 'Bimby TM5',
    prepTime: 25,
    mealType: ['dinner'],
    ingredients: [
      { name: 'Finocchi', qty: 300, unit: 'g', category: 'Ortofrutta' },
      { name: 'Patata', qty: 50, unit: 'g', category: 'Ortofrutta' },
      { name: 'Merluzzo (a parte)', qty: 150, unit: 'g', category: 'Pescheria' },
      { name: 'Acqua', qty: 400, unit: 'ml', category: 'Dispensa' }
    ],
    steps: [
      'Inserire verdure nel boccale: 5 sec, vel 5.',
      'Aggiungere acqua e sale: 20 min, 100°, vel 1.',
      'Nel frattempo cuocere il merluzzo al vapore (Varoma) o in padella.',
      'Omogeneizzare la vellutata: 1 min, vel 10.',
      'Servire la vellutata con il merluzzo sbriciolato dentro.'
    ],
    macros: { cal: 350, protein: 35, carb: 25, fat: 5 },
    tags: ['Digestive', 'Light'],
    seasons: ['Winter', 'Autumn']
  },

  // --- NUOVE RICETTE NOURISH & BIMBY ---
  {
    id: 'n1',
    title: 'Nourish Bowl "All-in-One" con Salmone e Riso Nero',
    description: 'Pasto completo bilanciato cotto interamente nel Bimby su 3 livelli.',
    category: 'Nourish',
    device: 'Bimby TM5',
    prepTime: 30,
    mealType: ['lunch', 'dinner'],
    ingredients: [
      { name: 'Riso Venere', qty: 70, unit: 'g', category: 'Cereali' },
      { name: 'Salmone Fresco', qty: 150, unit: 'g', category: 'Pescheria' },
      { name: 'Zucchine', qty: 100, unit: 'g', category: 'Ortofrutta' },
      { name: 'Carote', qty: 100, unit: 'g', category: 'Ortofrutta' },
      { name: 'Acqua', qty: 1000, unit: 'ml', category: 'Dispensa' }
    ],
    steps: [
      'Inserire 1L di acqua nel boccale.',
      'Mettere il riso venere nel cestello e inserirlo nel boccale.',
      'Posizionare il Varoma con le verdure tagliate a bastoncino nel recipiente inferiore.',
      'Posizionare il vassoio Varoma superiore con il salmone condito con limone.',
      'Cuocere: 25 min, Varoma, Vel 1.',
      'Servire componendo la bowl con un filo d\'olio a crudo.'
    ],
    macros: { cal: 520, protein: 35, carb: 55, fat: 18 },
    tags: ['Bimby-Varoma', 'Omega-3', 'Complete'],
    seasons: ['All']
  },
  {
    id: 'n2',
    title: 'Golden Hummus Bowl con Pollo Grigliato',
    description: 'Bowl nutriente con hummus fatto in casa (Bimby) e pollo speziato.',
    category: 'Nourish',
    device: 'Bimby TM5',
    prepTime: 20,
    mealType: ['lunch', 'dinner'],
    ingredients: [
      { name: 'Hummus di Ceci', qty: 80, unit: 'g', category: 'Dispensa', bimbyQuery: 'hummus di ceci' },
      { name: 'Petto di Pollo', qty: 150, unit: 'g', category: 'Macelleria' },
      { name: 'Carote', qty: 100, unit: 'g', category: 'Ortofrutta' },
      { name: 'Cetrioli', qty: 100, unit: 'g', category: 'Ortofrutta' },
      { name: 'Pane Pita Integrale', qty: 1, unit: 'pz', category: 'Dispensa' }
    ],
    steps: [
      'Preparare l\'hummus nel Bimby (vedi link ingrediente) o usare quello pronto.',
      'Grigliare il petto di pollo tagliato a striscioline con paprika e curcuma.',
      'Tagliare le verdure a bastoncino.',
      'Comporre la bowl con l\'hummus al centro, il pollo e le verdure intorno.',
      'Servire con la pita tostata.'
    ],
    macros: { cal: 550, protein: 40, carb: 45, fat: 20 },
    tags: ['High-Protein', 'Bimby-Sauce', 'Nourish'],
    seasons: ['Spring', 'Summer', 'Autumn']
  },
  {
    id: 'n3',
    title: 'Polpette al Sugo Bimby con Purè Light',
    description: 'Un classico comfort food rivisitato in chiave bilanciata.',
    category: 'Nourish',
    device: 'Bimby TM5',
    prepTime: 40,
    mealType: ['dinner', 'lunch'],
    ingredients: [
      { name: 'Carne Macinata Magra', qty: 150, unit: 'g', category: 'Macelleria' },
      { name: 'Sugo di Pomodoro', qty: 150, unit: 'g', category: 'Dispensa', bimbyQuery: 'sugo al pomodoro basilico' },
      { name: 'Patate', qty: 200, unit: 'g', category: 'Ortofrutta', bimbyQuery: 'pure di patate' },
      { name: 'Latte Scremato', qty: 50, unit: 'ml', category: 'Frigo' },
      { name: 'Parmigiano', qty: 10, unit: 'g', category: 'Frigo' }
    ],
    steps: [
      'Preparare il sugo nel boccale (vedi link).',
      'Nel frattempo formare le polpette e cuocerle nel Varoma mentre il sugo cuoce (20 min, Varoma, Vel 1).',
      'A parte, preparare il purè (vedi link) o cuocere le patate al vapore nel cestello se ci stanno.',
      'Unire le polpette al sugo e servire con il purè.'
    ],
    macros: { cal: 580, protein: 38, carb: 50, fat: 22 },
    tags: ['Comfort-Food', 'Bimby-Complete', 'Family'],
    seasons: ['Winter', 'Autumn']
  },
  {
    id: 'n4',
    title: 'Fusilli Integrali con Pesto di Zucchine e Gamberi',
    description: 'Primo piatto fresco e leggero con pesto alternativo fatto al Bimby.',
    category: 'Nourish',
    device: 'Bimby TM5',
    prepTime: 25,
    mealType: ['lunch'],
    ingredients: [
      { name: 'Fusilli Integrali', qty: 80, unit: 'g', category: 'Cereali' },
      { name: 'Gamberi Sgusciati', qty: 150, unit: 'g', category: 'Pescheria' },
      { name: 'Pesto di Zucchine', qty: 60, unit: 'g', category: 'Condimenti', bimbyQuery: 'pesto di zucchine' },
      { name: 'Pomodorini', qty: 100, unit: 'g', category: 'Ortofrutta' },
      { name: 'Pinoli', qty: 5, unit: 'g', category: 'Dispensa' }
    ],
    steps: [
      'Preparare il pesto di zucchine nel Bimby (vedi link). Tenere da parte.',
      'Nel boccale pulito (o senza lavare troppo) mettere acqua per la pasta: 10 min, 100°, Vel 1.',
      'Buttare la pasta e cuocere tempo indicato.',
      'Nel frattempo saltare i gamberi in padella o cuocerli nel Varoma mentre bolle l\'acqua.',
      'Scolare la pasta e condire con pesto e gamberi.'
    ],
    macros: { cal: 510, protein: 30, carb: 65, fat: 12 },
    tags: ['Light-Pasta', 'Bimby-Sauce', 'Summer'],
    seasons: ['Spring', 'Summer']
  },
  {
    id: 'n5',
    title: 'Hummus "Golden" alla Curcuma (Snack)',
    description: 'Potente antinfiammatorio naturale, perfetto come snack o accompagnamento.',
    category: 'Nourish',
    device: 'Bimby TM5',
    prepTime: 5,
    mealType: ['snack', 'lunch'],
    ingredients: [
      { name: 'Ceci Cotti', qty: 240, unit: 'g', category: 'Legumi' },
      { name: 'Tahina', qty: 30, unit: 'g', category: 'Condimenti' },
      { name: 'Curcuma', qty: 1, unit: 'cucchiaino', category: 'Spezie' },
      { name: 'Limone', qty: 0.5, unit: 'succo', category: 'Ortofrutta' },
      { name: 'Aglio', qty: 1, unit: 'spicchio', category: 'Ortofrutta' }
    ],
    steps: [
      'Inserire lo spicchio d\'aglio nel boccale: 3 sec, Vel 7. Riunire sul fondo.',
      'Aggiungere ceci, tahina, succo di limone, curcuma, sale e pepe.',
      'Frullare: 1 min, Vel 5 aumentando fino a Vel 10.',
      'Se troppo denso, aggiungere un goccio d\'acqua e emulsionare 10 sec, Vel 4.',
      'Servire con verdure crude in pinzimonio.'
    ],
    macros: { cal: 320, protein: 12, carb: 35, fat: 14 },
    tags: ['Anti-Inflammatory', 'Plant-Based'],
    seasons: ['All']
  },
  {
    id: 'n3',
    title: 'Polpette di Tacchino e Zucchine al Varoma',
    description: 'Secondo piatto leggerissimo, senza frittura, che rimane succoso grazie alla cottura a vapore.',
    category: 'Nourish',
    device: 'Bimby TM5',
    prepTime: 25,
    mealType: ['lunch', 'dinner'],
    ingredients: [
      { name: 'Petto di Tacchino', qty: 300, unit: 'g', category: 'Macelleria' },
      { name: 'Zucchine', qty: 150, unit: 'g', category: 'Ortofrutta' },
      { name: 'Albume', qty: 30, unit: 'g', category: 'Uova' },
      { name: 'Erbe Aromatiche', qty: 1, unit: 'mazzetto', category: 'Ortofrutta' }
    ],
    steps: [
      'Inserire tacchino a cubetti e zucchine nel boccale: 10 sec, Vel 7.',
      'Aggiungere albume, sale, erbe: 10 sec, Vel 4 Antiorario.',
      'Formare le polpette e disporle nel Varoma unto leggermente.',
      'Mettere 500g acqua nel boccale (o approfittarne per cuocere una zuppa sotto).',
      'Cuocere: 20 min, Varoma, Vel 1.',
      'Servire con una salsa allo yogurt.'
    ],
    macros: { cal: 380, protein: 65, carb: 5, fat: 8 },
    tags: ['High-Protein', 'Low-Carb', 'Bimby-Varoma'],
    seasons: ['All']
  },
  {
    id: 'n4',
    title: 'Dahl di Lenticchie Rosse e Spinaci',
    description: 'Comfort food ricco di fibre e ferro, cremoso senza panna.',
    category: 'Nourish',
    device: 'Bimby TM5',
    prepTime: 20,
    mealType: ['lunch', 'dinner'],
    ingredients: [
      { name: 'Lenticchie Rosse Decorticate', qty: 150, unit: 'g', category: 'Legumi' },
      { name: 'Latte di Cocco Light', qty: 100, unit: 'ml', category: 'Dispensa' },
      { name: 'Spinaci Freschi', qty: 100, unit: 'g', category: 'Ortofrutta' },
      { name: 'Pomodori Pelati', qty: 200, unit: 'g', category: 'Dispensa' },
      { name: 'Curry', qty: 1, unit: 'cucchiaino', category: 'Spezie' }
    ],
    steps: [
      'Tritare cipolla/aglio (opzionali): 3 sec, Vel 7. Rosolare 3 min, 100°, Vel 1.',
      'Aggiungere lenticchie (sciacquate), pelati, latte di cocco e curry.',
      'Cuocere: 15 min, 100°, Vel Soft Antiorario.',
      'Aggiungere gli spinaci dal foro del coperchio.',
      'Cuocere ancora: 3 min, 100°, Vel Soft Antiorario.',
      'Lasciare riposare 2 minuti prima di servire.'
    ],
    macros: { cal: 450, protein: 22, carb: 55, fat: 12 },
    tags: ['Vegan', 'Fiber-Rich', 'Comfort-Food'],
    seasons: ['Winter', 'Autumn']
  },
  {
    id: 'n5',
    title: 'Vellutata Super-Green Detox',
    description: 'Un concentrato di clorofilla e vitamine per depurare l\'organismo.',
    category: 'Nourish',
    device: 'Bimby TM5',
    prepTime: 20,
    mealType: ['dinner'],
    ingredients: [
      { name: 'Piselli Surgelati', qty: 200, unit: 'g', category: 'Surgelati' },
      { name: 'Zucchine', qty: 200, unit: 'g', category: 'Ortofrutta' },
      { name: 'Menta Fresca', qty: 5, unit: 'foglie', category: 'Ortofrutta' },
      { name: 'Yogurt Greco', qty: 50, unit: 'g', category: 'Latticini' },
      { name: 'Brodo Vegetale', qty: 400, unit: 'ml', category: 'Dispensa' }
    ],
    steps: [
      'Inserire piselli, zucchine a pezzi e brodo nel boccale.',
      'Cuocere: 18 min, 100°, Vel 1.',
      'Aggiungere la menta fresca.',
      'Omogeneizzare: 1 min, portando gradualmente a Vel 10.',
      'Servire con un cucchiaio di yogurt greco al centro per cremosità e proteine extra.'
    ],
    macros: { cal: 280, protein: 18, carb: 35, fat: 2 },
    tags: ['Detox', 'Low-Cal', 'Vitamin-Boost'],
    seasons: ['Spring', 'Summer']
  },
  {
    id: 'n6',
    title: 'Risotto "Viola" al Cavolo Cappuccio',
    description: 'Ricco di antociani e antiossidanti, con un colore spettacolare.',
    category: 'Nourish',
    device: 'Bimby TM5',
    prepTime: 20,
    mealType: ['lunch'],
    ingredients: [
      { name: 'Riso Carnaroli', qty: 80, unit: 'g', category: 'Cereali' },
      { name: 'Cavolo Cappuccio Viola', qty: 150, unit: 'g', category: 'Ortofrutta' },
      { name: 'Parmigiano', qty: 20, unit: 'g', category: 'Latticini' },
      { name: 'Vino Bianco', qty: 30, unit: 'ml', category: 'Bevande' },
      { name: 'Brodo Vegetale', qty: 300, unit: 'ml', category: 'Dispensa' }
    ],
    steps: [
      'Tritare il cavolo viola: 5 sec, Vel 5. Mettere da parte metà.',
      'Rosolare metà cavolo con un filo d\'olio: 3 min, 100°, Vel 1.',
      'Aggiungere il riso e tostare: 3 min, 100°, Vel 1 Antiorario (senza misurino).',
      'Sfumare col vino: 1 min, 100°, Vel 1 Antiorario.',
      'Aggiungere brodo e l\'altra metà del cavolo: Cuocere per il tempo indicato sulla confezione (ca 13-14 min), 100°, Vel 1 Antiorario.',
      'Mantecare con parmigiano a fuoco spento.'
    ],
    macros: { cal: 480, protein: 14, carb: 75, fat: 10 },
    tags: ['Antioxidant', 'Gourmet'],
    seasons: ['Winter', 'Autumn']
  },

  // --- DETOX & BRUCIA GRASSI ---
  {
    id: 'dx1',
    title: 'Golden Milk "Thermogenic"',
    description: 'Bevanda antica potenziata per attivare il metabolismo e ridurre l\'infiammazione.',
    category: 'Detox',
    device: 'Padella',
    prepTime: 5,
    mealType: ['snack', 'breakfast'],
    ingredients: [
      { name: 'Latte di Cocco (light)', qty: 200, unit: 'ml', category: 'Bevande' },
      { name: 'Curcuma in polvere', qty: 1, unit: 'cucchiaino', category: 'Spezie' },
      { name: 'Zenzero fresco', qty: 1, unit: 'cm', category: 'Ortofrutta' },
      { name: 'Pepe Nero', qty: 1, unit: 'pizzico', category: 'Spezie' },
      { name: 'Olio di Cocco', qty: 0.5, unit: 'cucchiaino', category: 'Condimenti' }
    ],
    steps: [
      'Scaldare il latte in un pentolino senza portarlo a bollore.',
      'Aggiungere curcuma, pepe nero (fondamentale per l\'assorbimento) e zenzero grattugiato.',
      'Unire l\'olio di cocco e mescolare energicamente.',
      'Bere caldo, preferibilmente al mattino a digiuno o prima di dormire.'
    ],
    macros: { cal: 120, protein: 1, carb: 4, fat: 10 },
    tags: ['Anti-Inflammatory', 'Fat-Burner', 'Immunity'],
    seasons: ['Winter', 'Autumn']
  },
  {
    id: 'dx2',
    title: 'Insalata "Metabolism Booster"',
    description: 'Mix di ingredienti amari e acidi per stimolare fegato e metabolismo.',
    category: 'Detox',
    device: 'None',
    prepTime: 10,
    mealType: ['lunch', 'dinner'],
    ingredients: [
      { name: 'Pompelmo Rosa', qty: 0.5, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Finocchio', qty: 1, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Rucola', qty: 50, unit: 'g', category: 'Ortofrutta' },
      { name: 'Noci', qty: 15, unit: 'g', category: 'Frutta Secca' },
      { name: 'Aceto di Mele', qty: 1, unit: 'cucchiaio', category: 'Condimenti' }
    ],
    steps: [
      'Pelare il pompelmo a vivo e tagliarlo a spicchi.',
      'Affettare il finocchio sottilissimo (usare mandolina se possibile).',
      'Unire rucola, pompelmo e finocchio in una bowl.',
      'Condire con aceto di mele (stabilizza la glicemia) e un filo d\'olio.',
      'Guarnire con le noci spezzettate.'
    ],
    macros: { cal: 210, protein: 4, carb: 15, fat: 14 },
    tags: ['Liver-Support', 'Fat-Burner', 'Low-Cal'],
    seasons: ['Winter', 'Spring']
  },
  {
    id: 'dx3',
    title: 'Zuppa "Spicy" alla Zucca e Zenzero',
    description: 'L\'effetto termogenico del peperoncino unito alle fibre della zucca.',
    category: 'Detox',
    device: 'Bimby TM5',
    prepTime: 25,
    mealType: ['dinner'],
    ingredients: [
      { name: 'Zucca Delica', qty: 300, unit: 'g', category: 'Ortofrutta' },
      { name: 'Zenzero', qty: 3, unit: 'cm', category: 'Ortofrutta' },
      { name: 'Peperoncino', qty: 1, unit: 'pizzico', category: 'Spezie' },
      { name: 'Brodo Vegetale', qty: 300, unit: 'ml', category: 'Dispensa' },
      { name: 'Semi di Zucca', qty: 10, unit: 'g', category: 'Dispensa' }
    ],
    steps: [
      'Inserire zenzero nel boccale: 3 sec, Vel 7.',
      'Aggiungere zucca a cubetti e brodo.',
      'Cuocere: 20 min, 100°, Vel 1.',
      'Aggiungere peperoncino e frullare: 1 min, Vel 10.',
      'Servire con semi di zucca tostati per la parte croccante.'
    ],
    macros: { cal: 180, protein: 5, carb: 30, fat: 6 },
    tags: ['Thermogenic', 'Satiety', 'Vegan'],
    seasons: ['Autumn', 'Winter']
  },
  {
    id: 'dx4',
    title: 'Smoothie "Belly-Melt" all\'Ananas',
    description: 'La bromelina dell\'ananas aiuta a digerire le proteine e ridurre il gonfiore.',
    category: 'Detox',
    device: 'Ninja Estrattore',
    prepTime: 5,
    mealType: ['snack'],
    ingredients: [
      { name: 'Ananas Fresco', qty: 150, unit: 'g', category: 'Ortofrutta' },
      { name: 'Cetriolo', qty: 0.5, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Limone', qty: 0.5, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Acqua di Cocco', qty: 100, unit: 'ml', category: 'Bevande' },
      { name: 'Pepe di Cayenna', qty: 1, unit: 'pizzico', category: 'Spezie' }
    ],
    steps: [
      'Pulire l\'ananas (tenere il cuore centrale che è ricco di bromelina).',
      'Inserire tutto nel bicchiere del Ninja.',
      'Frullare fino a ottenere una consistenza liscia.',
      'Il pizzico di cayenna attiva il metabolismo senza alterare troppo il gusto.'
    ],
    macros: { cal: 110, protein: 1, carb: 25, fat: 0 },
    tags: ['Digestive', 'Anti-Bloat', 'Enzymatic'],
    seasons: ['Spring', 'Summer', 'All']
  },

  // --- SMOOTHIES & ESTRATTI POTENZIATI ---
  {
    id: 'sm1',
    title: 'Matcha "Metabolism" Bomb',
    description: 'Il tè Matcha è il re degli antiossidanti e stimola la termogenesi.',
    category: 'Smoothie',
    device: 'Bimby TM5', // O frullatore
    prepTime: 5,
    mealType: ['snack', 'breakfast'],
    ingredients: [
      { name: 'Latte di Mandorla', qty: 200, unit: 'ml', category: 'Bevande' },
      { name: 'Tè Matcha in polvere', qty: 1, unit: 'cucchiaino', category: 'Dispensa' },
      { name: 'Spinaci Baby', qty: 30, unit: 'g', category: 'Ortofrutta' },
      { name: 'Banana Congelata', qty: 0.5, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Proteine Vaniglia', qty: 20, unit: 'g', category: 'Integratori' }
    ],
    steps: [
      'Inserire tutti gli ingredienti nel boccale.',
      'Frullare: 30 sec, Vel 10.',
      'La banana congelata dona una consistenza cremosa tipo gelato.'
    ],
    macros: { cal: 180, protein: 22, carb: 18, fat: 4 },
    tags: ['Thermogenic', 'Antioxidant', 'Energy'],
    seasons: ['All']
  },
  {
    id: 'sm2',
    title: 'Caffè "Ketogenico" Brucia Grassi',
    description: 'Perfetto pre-workout per dare energia e mobilizzare i grassi.',
    category: 'Smoothie',
    device: 'None', // Shaker o Frullino
    prepTime: 2,
    mealType: ['breakfast', 'snack'],
    ingredients: [
      { name: 'Caffè Espresso Lungo', qty: 1, unit: 'tazza', category: 'Bevande' },
      { name: 'Olio MCT o Cocco', qty: 1, unit: 'cucchiaino', category: 'Condimenti' },
      { name: 'Cannella', qty: 1, unit: 'pizzico', category: 'Spezie' },
      { name: 'Ghiaccio', qty: 3, unit: 'cubetti', category: 'Surgelati' },
      { name: 'Proteine Cioccolato', qty: 25, unit: 'g', category: 'Integratori' }
    ],
    steps: [
      'Preparare il caffè e lasciarlo intiepidire leggermente.',
      'Frullare con ghiaccio, proteine e olio MCT.',
      'L\'olio MCT viene convertito rapidamente in chetoni per energia immediata.'
    ],
    macros: { cal: 160, protein: 20, carb: 2, fat: 8 },
    tags: ['Pre-Workout', 'Keto', 'Focus'],
    seasons: ['All']
  },
  {
    id: 'ex1',
    title: 'Estratto "Sgonfia Pancia" al Sedano',
    description: 'Il segreto delle star per un addome piatto. Drenante potentissimo.',
    category: 'Extract',
    device: 'Ninja Estrattore',
    prepTime: 5,
    mealType: ['snack'],
    ingredients: [
      { name: 'Sedano', qty: 4, unit: 'gambi', category: 'Ortofrutta' },
      { name: 'Limone (con buccia se bio)', qty: 0.5, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Cetriolo', qty: 1, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Prezzemolo', qty: 1, unit: 'mazzetto', category: 'Ortofrutta' }
    ],
    steps: [
      'Lavare bene le verdure.',
      'Tagliare a pezzi adatti all\'estrattore.',
      'Estrarre il succo e bere immediatamente a stomaco vuoto.'
    ],
    macros: { cal: 45, protein: 2, carb: 8, fat: 0 },
    tags: ['Diuretic', 'Flat-Belly', 'Detox'],
    seasons: ['All']
  },
  {
    id: 'ex2',
    title: 'Red "Nitric Oxide" Booster',
    description: 'Migliora la circolazione e l\'ossigenazione dei tessuti grazie alla barbabietola.',
    category: 'Extract',
    device: 'Ninja Estrattore',
    prepTime: 8,
    mealType: ['snack'],
    ingredients: [
      { name: 'Barbabietola Cruda', qty: 1, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Carota', qty: 2, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Mela Verde', qty: 1, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Zenzero', qty: 2, unit: 'cm', category: 'Ortofrutta' }
    ],
    steps: [
      'Pelare la barbabietola e le carote.',
      'Inserire nell\'estrattore alternando con la mela.',
      'Ottimo prima dell\'allenamento per il "pump" muscolare naturale.'
    ],
    macros: { cal: 110, protein: 2, carb: 26, fat: 0 },
    tags: ['Performance', 'Circulation', 'Vitamins'],
    seasons: ['Autumn', 'Winter']
  },
  {
    id: 'ex3',
    title: 'Shot "Immuno-Fire" Zenzero e Limone',
    description: 'Un concentrato piccante per svegliare il metabolismo e alzare le difese.',
    category: 'Extract',
    device: 'Ninja Estrattore',
    prepTime: 5,
    mealType: ['breakfast'],
    ingredients: [
      { name: 'Zenzero Fresco', qty: 50, unit: 'g', category: 'Ortofrutta' },
      { name: 'Limone', qty: 1, unit: 'pz', category: 'Ortofrutta' },
      { name: 'Pepe di Cayenna', qty: 1, unit: 'pizzico', category: 'Spezie' }
    ],
    steps: [
      'Rimuovere la buccia del limone ma lasciare quella bianca (albedo) ricca di fibre.',
      'Estrarre il succo di zenzero e limone.',
      'Aggiungere il pepe di cayenna e bere tutto d\'un fiato (è forte!).'
    ],
    macros: { cal: 30, protein: 0, carb: 7, fat: 0 },
    tags: ['Immunity', 'Metabolism', 'Shot'],
    seasons: ['Winter', 'Autumn']
  }
];
