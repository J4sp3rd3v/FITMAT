export type FoodCategory = 'protein' | 'carb' | 'fat' | 'veg' | 'fruit';

export interface FoodItem {
  id: string;
  name: string;
  category: FoodCategory;
  season: number[]; // Mesi (0-11) in cui è di stagione
  benefits: string[]; // Es: "anti-estrogen", "visceral-fat-burn", "high-fiber"
  unit: string;
  defaultQty: number; // Quantità media per persona
  supermarketSection: string; // Per ordinare la lista della spesa
}

export const FOOD_DATABASE: FoodItem[] = [
  // --- PROTEINE (Focus: Magre, Zinco per testosterone, Omega-3) ---
  {
    id: 'p1', name: 'Petto di Pollo', category: 'protein', season: [0,1,2,3,4,5,6,7,8,9,10,11],
    benefits: ['high-protein', 'leucine'], unit: 'g', defaultQty: 200, supermarketSection: 'Macelleria'
  },
  {
    id: 'p2', name: 'Salmone Selvaggio', category: 'protein', season: [0,1,2,3,4,5,6,7,8,9,10,11],
    benefits: ['omega-3', 'anti-inflammatory'], unit: 'g', defaultQty: 150, supermarketSection: 'Pescheria'
  },
  {
    id: 'p3', name: 'Uova Bio', category: 'protein', season: [0,1,2,3,4,5,6,7,8,9,10,11],
    benefits: ['choline', 'healthy-fats'], unit: 'pz', defaultQty: 2, supermarketSection: 'Uova & Latticini'
  },
  {
    id: 'p4', name: 'Merluzzo', category: 'protein', season: [0,1,2,9,10,11], // Inverno/Autunno
    benefits: ['low-fat', 'iodine'], unit: 'g', defaultQty: 200, supermarketSection: 'Pescheria'
  },
  {
    id: 'p5', name: 'Tacchino', category: 'protein', season: [0,1,2,3,4,5,6,7,8,9,10,11],
    benefits: ['lean-protein'], unit: 'g', defaultQty: 180, supermarketSection: 'Macelleria'
  },

  // --- VERDURE (Focus: Crocifere per anti-estrogeno, Fibre per grasso viscerale) ---
  {
    id: 'v1', name: 'Broccoli', category: 'veg', season: [0,1,2,3,9,10,11], // Inverno/Primavera
    benefits: ['anti-estrogen', 'indole-3-carbinol', 'fiber'], unit: 'g', defaultQty: 200, supermarketSection: 'Ortofrutta'
  },
  {
    id: 'v2', name: 'Spinaci', category: 'veg', season: [0,1,2,3,4,9,10,11],
    benefits: ['iron', 'magnesium'], unit: 'g', defaultQty: 150, supermarketSection: 'Ortofrutta'
  },
  {
    id: 'v3', name: 'Asparagi', category: 'veg', season: [2,3,4,5], // Primavera
    benefits: ['diuretic', 'fiber'], unit: 'mazzo', defaultQty: 1, supermarketSection: 'Ortofrutta'
  },
  {
    id: 'v4', name: 'Zucchine', category: 'veg', season: [5,6,7,8], // Estate
    benefits: ['low-cal', 'potassium'], unit: 'g', defaultQty: 200, supermarketSection: 'Ortofrutta'
  },
  {
    id: 'v5', name: 'Cavolfiore', category: 'veg', season: [0,1,2,9,10,11],
    benefits: ['anti-estrogen', 'fiber'], unit: 'g', defaultQty: 200, supermarketSection: 'Ortofrutta'
  },
  {
    id: 'v6', name: 'Finocchi', category: 'veg', season: [0,1,2,3,9,10,11],
    benefits: ['digestive', 'diuretic'], unit: 'pz', defaultQty: 1, supermarketSection: 'Ortofrutta'
  },

  // --- CARBOIDRATI (Focus: Basso indice glicemico) ---
  {
    id: 'c1', name: 'Avena', category: 'carb', season: [0,1,2,3,4,5,6,7,8,9,10,11],
    benefits: ['beta-glucan', 'satiety'], unit: 'g', defaultQty: 60, supermarketSection: 'Cereali & Colazione'
  },
  {
    id: 'c2', name: 'Quinoa', category: 'carb', season: [0,1,2,3,4,5,6,7,8,9,10,11],
    benefits: ['complete-protein', 'fiber'], unit: 'g', defaultQty: 70, supermarketSection: 'Pasta & Riso'
  },
  {
    id: 'c3', name: 'Riso Basmati/Venere', category: 'carb', season: [0,1,2,3,4,5,6,7,8,9,10,11],
    benefits: ['digestible'], unit: 'g', defaultQty: 80, supermarketSection: 'Pasta & Riso'
  },
  {
    id: 'c4', name: 'Patate Dolci', category: 'carb', season: [8,9,10,11,0,1],
    benefits: ['vitamin-a', 'fiber'], unit: 'g', defaultQty: 200, supermarketSection: 'Ortofrutta'
  },

  // --- GRASSI SANI (Focus: Ormoni e antinfiammatori) ---
  {
    id: 'f1', name: 'Olio EVO', category: 'fat', season: [0,1,2,3,4,5,6,7,8,9,10,11],
    benefits: ['healthy-fats'], unit: 'ml', defaultQty: 15, supermarketSection: 'Condimenti'
  },
  {
    id: 'f2', name: 'Avocado', category: 'fat', season: [0,1,2,3,10,11], // Inverno/Primavera
    benefits: ['potassium', 'fiber'], unit: 'frutto', defaultQty: 0.5, supermarketSection: 'Ortofrutta'
  },
  {
    id: 'f3', name: 'Noci/Mandorle', category: 'fat', season: [8,9,10,11,0,1],
    benefits: ['omega-3', 'zinc'], unit: 'g', defaultQty: 30, supermarketSection: 'Frutta Secca'
  },
  {
    id: 'f4', name: 'Semi di Zucca', category: 'fat', season: [0,1,2,3,4,5,6,7,8,9,10,11],
    benefits: ['zinc', 'prostate-health', 'testosterone-support'], unit: 'g', defaultQty: 20, supermarketSection: 'Frutta Secca'
  },

  // --- FRUTTA (Focus: Antiossidanti, Basso fruttosio) ---
  {
    id: 'fr1', name: 'Frutti di Bosco', category: 'fruit', season: [5,6,7,8],
    benefits: ['antioxidant', 'low-sugar'], unit: 'g', defaultQty: 100, supermarketSection: 'Ortofrutta'
  },
  {
    id: 'fr2', name: 'Mele', category: 'fruit', season: [8,9,10,11,0,1,2],
    benefits: ['fiber', 'pectin'], unit: 'pz', defaultQty: 1, supermarketSection: 'Ortofrutta'
  },
  {
    id: 'fr3', name: 'Arance/Agrumi', category: 'fruit', season: [10,11,0,1,2,3],
    benefits: ['vitamin-c'], unit: 'pz', defaultQty: 1, supermarketSection: 'Ortofrutta'
  },
  {
    id: 'fr4', name: 'Kiwi', category: 'fruit', season: [10,11,0,1,2,3,4],
    benefits: ['vitamin-c', 'fiber'], unit: 'pz', defaultQty: 2, supermarketSection: 'Ortofrutta'
  }
];
