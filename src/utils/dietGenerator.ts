import { FOOD_DATABASE, FoodItem } from '../data/nutritionData';

export interface Meal {
  name: string;
  ingredients: { item: FoodItem; qty: number; unit: string }[];
  macros: { cal: number; protein: number; carb: number; fat: number };
}

export interface DailyPlan {
  day: string;
  meals: {
    breakfast: Meal;
    lunch: Meal;
    snack: Meal;
    dinner: Meal;
  };
}

const DAYS = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];

// Helper per ottenere alimenti di stagione
const getSeasonalFood = (category: string, month: number): FoodItem[] => {
  return FOOD_DATABASE.filter(f => f.category === category && f.season.includes(month));
};

// Helper per selezionare un elemento random
const getRandom = <T>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];

// Generatore di pasti
const createMeal = (type: 'breakfast' | 'main' | 'snack' | 'light_main', month: number): Meal => {
  const proteins = getSeasonalFood('protein', month);
  const carbs = getSeasonalFood('carb', month);
  const fats = getSeasonalFood('fat', month);
  const vegs = getSeasonalFood('veg', month);
  const fruits = getSeasonalFood('fruit', month);

  // Fallback se la stagione è vuota (non dovrebbe succedere col DB attuale, ma per sicurezza)
  const safeGet = (arr: FoodItem[], fallback: FoodItem[]) => arr.length > 0 ? getRandom(arr) : getRandom(fallback);

  let mealName = "";
  let ingredients = [];
  let macros = { cal: 0, protein: 0, carb: 0, fat: 0 }; // Macro placeholder, andrebbero calcolati reali

  if (type === 'breakfast') {
    const carb = safeGet(carbs, carbs); // Avena, ecc
    const protein = safeGet(proteins.filter(p => p.id === 'p3' || p.id === 'p1'), proteins); // Uova o altro
    const fruit = safeGet(fruits, fruits);
    
    mealName = `${carb.name} con ${protein.name} e ${fruit.name}`;
    ingredients = [
        { item: carb, qty: carb.defaultQty, unit: carb.unit },
        { item: protein, qty: protein.defaultQty, unit: protein.unit },
        { item: fruit, qty: fruit.defaultQty, unit: fruit.unit }
    ];
    macros = { cal: 450, protein: 25, carb: 50, fat: 15 };
  } 
  else if (type === 'snack') {
    const fruit = safeGet(fruits, fruits);
    const fat = safeGet(fats.filter(f => f.category === 'fat' && (f.id.includes('f3') || f.id.includes('f4'))), fats); // Noci/Semi
    
    mealName = `${fruit.name} e ${fat.name}`;
    ingredients = [
        { item: fruit, qty: fruit.defaultQty, unit: fruit.unit },
        { item: fat, qty: fat.defaultQty, unit: fat.unit }
    ];
    macros = { cal: 200, protein: 5, carb: 20, fat: 10 };
  }
  else { // Main (Pranzo/Cena)
    const protein = safeGet(proteins, proteins);
    const veg = safeGet(vegs, vegs);
    const carb = type === 'main' ? safeGet(carbs, carbs) : null; // Niente carb a cena/light
    const fat = safeGet(fats.filter(f => f.id === 'f1' || f.id === 'f2'), fats); // Olio/Avocado

    mealName = `${protein.name} con ${veg.name}`;
    if (carb) mealName += ` e ${carb.name}`;

    ingredients = [
        { item: protein, qty: protein.defaultQty, unit: protein.unit },
        { item: veg, qty: veg.defaultQty, unit: veg.unit },
        { item: fat, qty: fat.defaultQty, unit: fat.unit }
    ];
    if (carb) ingredients.push({ item: carb, qty: carb.defaultQty, unit: carb.unit });

    macros = type === 'main' 
        ? { cal: 600, protein: 40, carb: 60, fat: 20 }
        : { cal: 400, protein: 40, carb: 10, fat: 20 };
  }

  return { name: mealName, ingredients, macros };
};

export const generateWeeklyPlan = (): DailyPlan[] => {
  const currentMonth = new Date().getMonth();
  
  return DAYS.map(day => ({
    day,
    meals: {
      breakfast: createMeal('breakfast', currentMonth),
      lunch: createMeal('main', currentMonth),
      snack: createMeal('snack', currentMonth),
      dinner: createMeal('light_main', currentMonth),
    }
  }));
};

export const generateShoppingList = (plan: DailyPlan[]) => {
  const list: Record<string, { item: FoodItem; qty: number; checked: boolean }> = {};

  plan.forEach(day => {
    Object.values(day.meals).forEach(meal => {
      meal.ingredients.forEach(ing => {
        if (list[ing.item.id]) {
          list[ing.item.id].qty += ing.qty;
        } else {
          list[ing.item.id] = { item: ing.item, qty: ing.qty, checked: false };
        }
      });
    });
  });

  // Raggruppa per sezione supermercato
  const groupedList: Record<string, typeof list[string][]> = {};
  Object.values(list).forEach(entry => {
    const section = entry.item.supermarketSection;
    if (!groupedList[section]) groupedList[section] = [];
    groupedList[section].push(entry);
  });

  return groupedList;
};
