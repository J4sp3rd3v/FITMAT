import { RECIPE_DB, Recipe, MealType, Supplement, SUPPLEMENTS_DB } from '../data/recipeData';

// Profilo Utente: Uomo, 31 anni, 1.72m
// Stimiamo un peso di 78kg (leggermente sovrappeso/muscoloso) per calcoli realistici di deficit
const USER_PROFILE = {
  gender: 'male',
  age: 31,
  height: 172,
  weight: 78,
  goal: 'fat_loss',
  activityLevel: 'moderate'
};

// Calcolo TDEE e Target
// Mifflin-St Jeor: 10*W + 6.25*H - 5*A + 5
const BMR = 10 * USER_PROFILE.weight + 6.25 * USER_PROFILE.height - 5 * USER_PROFILE.age + 5;
const TDEE = BMR * 1.35; // Activity factor moderate
const TARGET_CALORIES = Math.round(TDEE - 500); // Deficit aggressivo ma sostenibile

// Scientific Macro Split (2025 Approach)
// High Protein (2.0g/kg) per sazietà e mantenimento massa magra
// Moderate Fat (0.9g/kg) per salute ormonale
// Carbs a riempimento per energia
const TARGET_PROTEIN = Math.round(USER_PROFILE.weight * 2.0); // ~156g
const TARGET_FAT = Math.round(USER_PROFILE.weight * 0.9);     // ~70g
const REMAINING_KCAL_FOR_CARBS = TARGET_CALORIES - (TARGET_PROTEIN * 4) - (TARGET_FAT * 9);
const TARGET_CARB = Math.max(50, Math.round(REMAINING_KCAL_FOR_CARBS / 4)); // Minimo 50g per funzione cerebrale

export interface DailyMenu {
  day: string;
  meals: {
    breakfast: Recipe;
    lunch: Recipe;
    snack: Recipe;
    dinner: Recipe;
  };
  totalMacros: { cal: number; protein: number; carb: number; fat: number };
}

export interface ShoppingItem {
  name: string;
  amount: number;
  unit: string;
  category: string;
}

export const getCurrentSeason = (): string => {
  const month = new Date().getMonth(); // 0-11
  if (month >= 2 && month <= 4) return 'Spring';
  if (month >= 5 && month <= 7) return 'Summer';
  if (month >= 8 && month <= 10) return 'Autumn';
  return 'Winter';
};

const getRandomRecipe = (type: MealType, season: string, excludeIds: string[] = []): Recipe => {
  const candidates = RECIPE_DB.filter(r => 
    r.mealType.includes(type) && 
    !excludeIds.includes(r.id) &&
    (r.seasons.includes(season) || r.seasons.includes('All'))
  );
  
  // Fallback: se non ci sono ricette stagionali, prendi tutte
  const pool = candidates.length > 0 ? candidates : RECIPE_DB.filter(r => 
    r.mealType.includes(type) && 
    (r.seasons.includes(season) || r.seasons.includes('All'))
  );
  
  // Secondo Fallback: se ancora nulla, prendi tutto ignorando la stagione (molto raro)
  const finalPool = pool.length > 0 ? pool : RECIPE_DB.filter(r => r.mealType.includes(type));
  
  return finalPool[Math.floor(Math.random() * finalPool.length)];
};

export const generateSmartWeeklyPlan = (season?: string): DailyMenu[] => {
  const currentSeason = season || getCurrentSeason();
  const days = ['Lunedì', 'Martedì', 'Mercoledì', 'Giovedì', 'Venerdì', 'Sabato', 'Domenica'];
  
  return days.map(day => {
    const breakfast = getRandomRecipe('breakfast', currentSeason);
    const lunch = getRandomRecipe('lunch', currentSeason, [breakfast.id]);
    const snack = getRandomRecipe('snack', currentSeason, [breakfast.id, lunch.id]);
    const dinner = getRandomRecipe('dinner', currentSeason, [breakfast.id, lunch.id, snack.id]);

    const totalMacros = {
      cal: breakfast.macros.cal + lunch.macros.cal + snack.macros.cal + dinner.macros.cal,
      protein: breakfast.macros.protein + lunch.macros.protein + snack.macros.protein + dinner.macros.protein,
      carb: breakfast.macros.carb + lunch.macros.carb + snack.macros.carb + dinner.macros.carb,
      fat: breakfast.macros.fat + lunch.macros.fat + snack.macros.fat + dinner.macros.fat,
    };

    return {
      day,
      meals: { breakfast, lunch, snack, dinner },
      totalMacros
    };
  });
};

export const generateShoppingList = (weeklyPlan: DailyMenu[]): ShoppingItem[] => {
  const list: Record<string, ShoppingItem> = {};

  weeklyPlan.forEach(day => {
    Object.values(day.meals).forEach(recipe => {
      recipe.ingredients.forEach(ing => {
        const key = `${ing.name.toLowerCase()}_${ing.unit}`;
        if (list[key]) {
          list[key].amount += ing.qty;
        } else {
          list[key] = {
            name: ing.name,
            amount: ing.qty,
            unit: ing.unit,
            category: ing.category
          };
        }
      });
    });
  });

  return Object.values(list).sort((a, b) => a.category.localeCompare(b.category));
};

export const getRecommendedSupplements = (): Supplement[] => {
  // In futuro, logica basata su USER_PROFILE.goal
  // Per ora restituiamo tutto il DB filtrato se necessario
  return SUPPLEMENTS_DB;
};

export const getUserStats = () => ({
  bmr: Math.round(BMR),
  tdee: Math.round(TDEE),
  target: TARGET_CALORIES,
  macroTargets: {
    protein: TARGET_PROTEIN,
    fat: TARGET_FAT,
    carb: TARGET_CARB
  },
  season: getCurrentSeason()
});
