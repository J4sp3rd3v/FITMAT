import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, ShoppingCart, BookOpen, ChevronDown, CheckCircle2, Circle, Search, Flame, ChefHat, Zap, Clock, Scale, Pill } from 'lucide-react';
import { generateSmartWeeklyPlan, getCurrentSeason, generateShoppingList, getRecommendedSupplements, DailyMenu, ShoppingItem } from '../utils/dietEngine';
import { RECIPE_DB, Recipe, Supplement } from '../data/recipeData';
import { useUser } from '../context/UserContext';

// --- Components ---

interface TabButtonProps {
    active: boolean;
    onClick: () => void;
    icon: React.ElementType;
    label: string;
}

const TabButton = ({ active, onClick, icon: Icon, label }: TabButtonProps) => (
  <button
    onClick={onClick}
    className={`flex-1 py-3 flex flex-col items-center justify-center gap-1 text-[10px] font-medium rounded-xl transition-all ${
      active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/50' : 'text-slate-400 hover:bg-slate-800'
    }`}
  >
    <Icon size={18} />
    {label}
  </button>
);

// --- Logo Components ---
const BrandLogo = ({ brand }: { brand?: 'ninja' | 'bimby' }) => {
  if (brand === 'ninja') {
    return (
      <div className="flex items-center justify-center w-12 h-12 bg-black rounded-full border border-slate-700 shadow-lg">
        <svg viewBox="0 0 100 100" className="w-8 h-8 fill-white">
          <path d="M20,50 L50,20 L80,50 L50,80 Z M45,45 L55,45 L55,55 L45,55 Z" />
          <text x="50" y="95" fontSize="14" fontWeight="bold" textAnchor="middle" fill="white">NINJA</text>
        </svg>
      </div>
    );
  }
  if (brand === 'bimby') {
    return (
      <div className="flex items-center justify-center w-12 h-12 bg-white rounded-full border border-slate-200 shadow-lg">
        <svg viewBox="0 0 100 100" className="w-8 h-8">
           <circle cx="50" cy="50" r="45" fill="#009A3D" />
           <path d="M50 20 C 65 20 80 35 80 50 C 80 65 65 80 50 80 C 35 80 20 65 20 50 C 20 35 35 20 50 20 Z" fill="white" opacity="0.2"/>
           <text x="50" y="55" fontSize="16" fontWeight="bold" textAnchor="middle" fill="white" fontFamily="Arial">Bimby</text>
        </svg>
      </div>
    );
  }
  return null;
};

// Recipe Detail Modal / View
const RecipeDetail = ({ recipe, onClose }: { recipe: Recipe; onClose: () => void }) => (
  <motion.div 
    initial={{ opacity: 0, x: '100%' }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '100%' }}
    transition={{ type: "spring", damping: 25, stiffness: 200 }}
    className="fixed inset-0 z-[100] bg-slate-950 flex flex-col overflow-y-auto pb-safe"
  >
    {/* Floating Header Actions */}
    <div className="absolute top-4 left-4 z-20">
      <button 
          onClick={onClose}
          className="w-10 h-10 bg-slate-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-slate-700 shadow-lg active:scale-95 transition-transform"
      >
          <ChevronDown className="rotate-90" size={24} />
      </button>
    </div>

    <div className="relative h-72 bg-slate-800 flex items-center justify-center overflow-hidden shrink-0">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
        <div className={`absolute inset-0 opacity-30 bg-gradient-to-br ${
             recipe.category === 'Michelin' ? 'from-amber-500 to-orange-600' :
             recipe.category === 'Athlete' ? 'from-blue-500 to-indigo-600' :
             recipe.category === 'Smoothie' ? 'from-purple-500 to-pink-600' :
             recipe.category === 'Extract' ? 'from-orange-500 to-yellow-600' :
             recipe.category === 'Detox' ? 'from-emerald-400 to-yellow-400' :
             'from-indigo-500 to-purple-600'
        }`} />
        <ChefHat size={80} className="text-white/20 relative z-10" />
        
        {/* Brand Logo Overlay */}
        {recipe.brand && (
          <div className="absolute bottom-4 right-4 z-30">
            <BrandLogo brand={recipe.brand} />
          </div>
        )}
    </div>

    <div className="p-6 -mt-12 relative z-10 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-2">
            <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
              {recipe.category}
            </span>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-4 leading-tight">{recipe.title}</h2>

        <div className="flex gap-4 mb-8 text-sm text-slate-300 bg-slate-900/50 p-4 rounded-2xl border border-slate-800">
            <div className="flex items-center gap-2"><Clock size={18} className="text-indigo-400" /> {recipe.prepTime} min</div>
            <div className="flex items-center gap-2"><Flame size={18} className="text-orange-400" /> {recipe.macros.cal} kcal</div>
            {recipe.device !== 'None' && (
                <div className="flex items-center gap-2 text-pink-400"><Zap size={18} /> {recipe.device}</div>
            )}
        </div>

        <div className="bg-slate-900 rounded-2xl p-5 mb-6 border border-slate-800">
            <h3 className="text-white font-bold mb-4 flex items-center gap-2 text-lg">
              <Scale size={20} className="text-green-400" /> Ingredienti
            </h3>
            <ul className="space-y-3">
                {recipe.ingredients.map((ing, i) => (
                    <li key={i} className="flex justify-between text-sm items-center pb-2 border-b border-slate-800/50 last:border-0 last:pb-0">
                        <div className="flex items-center gap-2">
                             <span 
                                className={`font-medium transition-colors ${
                                    ing.bimbyQuery 
                                    ? "text-emerald-400 cursor-pointer hover:text-emerald-300 underline decoration-dotted underline-offset-4" 
                                    : "text-slate-200"
                                }`}
                                onClick={() => ing.bimbyQuery && window.open(`https://cookidoo.it/search/it-IT?q=${encodeURIComponent(ing.bimbyQuery)}`, '_blank')}
                             >
                                {ing.name}
                             </span>
                             {ing.bimbyQuery && (
                                <button 
                                    onClick={() => window.open(`https://cookidoo.it/search/it-IT?q=${encodeURIComponent(ing.bimbyQuery || '')}`, '_blank')}
                                    className="bg-emerald-500/10 p-1 rounded hover:bg-emerald-500/20 transition-colors"
                                    title="Apri ricetta su Bimby/Cookidoo"
                                >
                                    <ChefHat size={12} className="text-emerald-500" />
                                </button>
                             )}
                        </div>
                        <span className="text-indigo-300 font-mono bg-indigo-500/10 px-2 py-0.5 rounded">{ing.qty} {ing.unit}</span>
                    </li>
                ))}
            </ul>
        </div>

        <div className="space-y-8 mb-8">
            <h3 className="text-white font-bold text-xl">Preparazione</h3>
            {recipe.steps.map((step, i) => (
                <div key={i} className="flex gap-4 relative">
                    <div className="flex flex-col items-center">
                        <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center text-sm font-bold shrink-0 shadow-lg shadow-indigo-900/50 z-10">
                            {i + 1}
                        </div>
                        {i !== recipe.steps.length - 1 && (
                          <div className="w-0.5 h-full bg-slate-800 absolute top-8" />
                        )}
                    </div>
                    <p className="text-slate-300 text-base leading-relaxed pt-1 pb-4">{step}</p>
                </div>
            ))}
        </div>

        <button 
          onClick={onClose}
          className="w-full py-4 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-2xl transition-colors mt-auto mb-6 border border-slate-700"
        >
          Chiudi Ricetta
        </button>
    </div>
  </motion.div>
);

const MealCard = ({ title, recipe, onClick }: { title: string, recipe: Recipe, onClick: () => void }) => (
  <div onClick={onClick} className="mb-4 last:mb-0 cursor-pointer group">
    <div className="flex justify-between items-end mb-1">
        <p className="text-xs text-indigo-400 font-bold uppercase tracking-wider">{title}</p>
        <span className="text-[10px] text-slate-500 bg-slate-800 px-2 py-0.5 rounded-full">{recipe.macros.cal} kcal</span>
    </div>
    <div className="bg-slate-800/50 group-hover:bg-slate-800 transition-colors rounded-xl p-3 border border-slate-700/50 flex gap-3 items-center">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${
          recipe.category === 'Michelin' ? 'bg-amber-500/20 text-amber-500' :
          recipe.category === 'Athlete' ? 'bg-blue-500/20 text-blue-500' :
          recipe.category === 'Smoothie' ? 'bg-green-500/20 text-green-500' :
          'bg-indigo-500/20 text-indigo-500'
      }`}>
        <ChefHat size={20} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white font-medium text-sm truncate">{recipe.title}</p>
        <p className="text-xs text-slate-400 truncate">{recipe.tags.join(' • ')}</p>
      </div>
      <ChevronDown size={16} className="-rotate-90 text-slate-500" />
    </div>
  </div>
);

const DayAccordion = ({ dayData, isOpen, toggle, onRecipeClick }: { dayData: DailyMenu, isOpen: boolean, toggle: () => void, onRecipeClick: (r: Recipe) => void }) => {
  return (
    <div className="bg-slate-900/50 rounded-2xl overflow-hidden border border-slate-800 mb-3">
      <button 
        onClick={toggle}
        className="w-full p-4 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
      >
        <div>
            <span className="font-bold text-white block text-left">{dayData.day}</span>
            <div className="flex gap-2 text-[10px] text-slate-500 mt-1">
                <span>🔥 {dayData.totalMacros.cal} kcal</span>
                <span>💪 {dayData.totalMacros.protein}g pro</span>
            </div>
        </div>
        <ChevronDown size={20} className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-4 pt-0 border-t border-slate-800/50">
              <div className="mt-4">
                <MealCard title="Colazione" recipe={dayData.meals.breakfast} onClick={() => onRecipeClick(dayData.meals.breakfast)} />
                <MealCard title="Pranzo" recipe={dayData.meals.lunch} onClick={() => onRecipeClick(dayData.meals.lunch)} />
                <MealCard title="Spuntino" recipe={dayData.meals.snack} onClick={() => onRecipeClick(dayData.meals.snack)} />
                <MealCard title="Cena" recipe={dayData.meals.dinner} onClick={() => onRecipeClick(dayData.meals.dinner)} />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const RecipeBrowser = ({ onSelect }: { onSelect: (r: Recipe) => void }) => {
    const [filter, setFilter] = useState<'All' | 'Bimby' | 'Ninja' | 'Michelin' | 'Detox' | 'Drinks'>('All');
    const [search, setSearch] = useState('');

    const filtered = RECIPE_DB.filter(r => {
        const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
        if (!matchesSearch) return false;
        if (filter === 'All') return true;
        if (filter === 'Bimby') return r.device === 'Bimby TM5';
        if (filter === 'Ninja') return r.device.includes('Ninja');
        if (filter === 'Michelin') return r.category === 'Michelin';
        if (filter === 'Detox') return r.category === 'Detox' || r.tags.includes('Detox');
        if (filter === 'Drinks') return r.category === 'Smoothie' || r.category === 'Extract';
        return true;
    });

    return (
        <div className="space-y-4">
            <div className="relative">
                <Search className="absolute left-3 top-3 text-slate-500" size={18} />
                <input 
                    type="text" 
                    placeholder="Cerca ricetta..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-slate-800 border border-slate-700 rounded-xl py-2.5 pl-10 pr-4 text-white text-sm focus:outline-none focus:border-indigo-500"
                />
            </div>
            
            <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
                {['All', 'Drinks', 'Detox', 'Bimby', 'Ninja', 'Michelin'].map(f => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f as typeof filter)}
                        className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap border transition-colors ${
                            filter === f 
                            ? 'bg-indigo-600 border-indigo-600 text-white' 
                            : 'bg-slate-800 border-slate-700 text-slate-400'
                        }`}
                    >
                        {f === 'All' ? 'Tutte' : f === 'Drinks' ? 'Smoothie & Estratti' : f}
                    </button>
                ))}
            </div>

            <div className="grid grid-cols-1 gap-3">
                {filtered.map(recipe => (
                    <div 
                        key={recipe.id} 
                        onClick={() => onSelect(recipe)}
                        className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex gap-3 cursor-pointer hover:bg-slate-700 transition-colors"
                    >
                        <div className={`w-16 h-16 rounded-lg shrink-0 flex items-center justify-center ${
                            recipe.category === 'Detox' ? 'bg-green-500/20' : 
                            recipe.category === 'Extract' ? 'bg-orange-500/20' :
                            recipe.category === 'Smoothie' ? 'bg-purple-500/20' :
                            'bg-slate-700'
                        }`}>
                            <ChefHat className={
                                recipe.category === 'Detox' ? 'text-green-500' :
                                recipe.category === 'Extract' ? 'text-orange-500' :
                                recipe.category === 'Smoothie' ? 'text-purple-500' :
                                'text-slate-500'
                            } />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h4 className="text-white font-bold text-sm truncate">{recipe.title}</h4>
                            <div className="flex gap-2 mt-1 text-xs text-slate-400">
                                <span>{recipe.macros.cal} kcal</span>
                                <span>• {recipe.prepTime} min</span>
                            </div>
                            <div className="flex gap-2 mt-1 flex-wrap">
                                {recipe.device !== 'None' && (
                                    <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded inline-block">
                                        {recipe.device}
                                    </span>
                                )}
                                {recipe.category === 'Detox' && (
                                    <span className="text-[10px] text-green-400 bg-green-500/10 px-1.5 py-0.5 rounded inline-block">
                                        Detox
                                    </span>
                                )}
                                {(recipe.category === 'Smoothie' || recipe.category === 'Extract') && (
                                    <span className="text-[10px] text-purple-400 bg-purple-500/10 px-1.5 py-0.5 rounded inline-block">
                                        Drink
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

// --- New Views ---

const ShoppingListView = ({ items }: { items: ShoppingItem[] }) => {
  const [checked, setChecked] = useState<Record<string, boolean>>({});

  const toggleCheck = (name: string) => {
    setChecked(prev => ({ ...prev, [name]: !prev[name] }));
  };

  const categories = Array.from(new Set(items.map(i => i.category))).sort();

  return (
    <div className="space-y-6">
      {categories.map(cat => (
        <div key={cat} className="bg-slate-900/50 rounded-2xl p-4 border border-slate-800">
          <h3 className="text-indigo-400 font-bold text-xs uppercase tracking-wider mb-3">{cat}</h3>
          <div className="space-y-2">
            {items.filter(i => i.category === cat).map((item, idx) => (
              <div 
                key={idx} 
                onClick={() => toggleCheck(item.name)}
                className="flex items-center justify-between group cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  {checked[item.name] ? (
                    <CheckCircle2 size={18} className="text-emerald-500" />
                  ) : (
                    <Circle size={18} className="text-slate-600 group-hover:text-indigo-500" />
                  )}
                  <span className={`text-sm ${checked[item.name] ? 'text-slate-600 line-through' : 'text-slate-200'}`}>
                    {item.name}
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-500 bg-slate-800 px-2 py-0.5 rounded">
                  {item.amount} {item.unit}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
      {items.length === 0 && (
         <div className="text-center py-10">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShoppingCart className="text-slate-500" />
            </div>
            <p className="text-slate-400">Nessun ingrediente trovato nel piano.</p>
        </div>
      )}
    </div>
  );
};

const SupplementView = ({ supplements }: { supplements: Supplement[] }) => {
  return (
    <div className="space-y-4">
      <div className="bg-indigo-600/10 border border-indigo-500/30 p-4 rounded-xl mb-6">
        <h3 className="text-indigo-400 font-bold text-sm mb-1 flex items-center gap-2">
          <Zap size={16} /> Piano Integrazione Smart
        </h3>
        <p className="text-xs text-indigo-200/70 leading-relaxed">
          Protocollo ottimizzato per il tuo obiettivo "Fat Loss Visceral". 
          Ricorda: gli integratori sono un supporto, non un sostituto.
        </p>
      </div>

      {supplements.map(sup => (
        <div key={sup.id} className="bg-slate-800 p-4 rounded-xl border border-slate-700">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-white font-bold">{sup.name}</h4>
            <span className="text-[10px] bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
              {sup.timing}
            </span>
          </div>
          <p className="text-slate-400 text-sm mb-3">{sup.description}</p>
          <div className="flex gap-2 text-xs">
            <div className="bg-slate-900 px-2 py-1 rounded text-slate-300">
              <span className="text-slate-500">Dosaggio:</span> {sup.dosage}
            </div>
            {sup.warning && (
               <div className="bg-red-500/10 px-2 py-1 rounded text-red-300 border border-red-500/20">
                 ⚠️ {sup.warning}
               </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

// --- Main Page ---

export default function Diet() {
  const { calculatedMacros } = useUser();
  const [activeTab, setActiveTab] = useState<'plan' | 'recipes' | 'shop' | 'supplements'>('plan');
  const [openDay, setOpenDay] = useState<string | null>('Lunedì');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  
  const weeklyPlan = useMemo(() => generateSmartWeeklyPlan(), []);
  const shoppingList = useMemo(() => generateShoppingList(weeklyPlan), [weeklyPlan]);
  const supplements = useMemo(() => getRecommendedSupplements(), []);
  const season = getCurrentSeason();

  return (
    <div className="p-6 pb-24 max-w-md mx-auto min-h-screen">
      <AnimatePresence>
        {selectedRecipe && <RecipeDetail recipe={selectedRecipe} onClose={() => setSelectedRecipe(null)} />}
      </AnimatePresence>

      <header className="mb-6">
        <div className="flex justify-between items-end">
            <div>
                <h1 className="text-2xl font-bold text-white">Diet Coach</h1>
                <p className="text-xs text-slate-400 mt-1">Stagione: <span className="text-emerald-400 font-bold">{season}</span></p>
            </div>
            <div className="flex flex-col items-end gap-1">
                 <div className="bg-slate-800 px-3 py-1 rounded-lg border border-slate-700 flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] text-slate-400 uppercase tracking-wider">Daily Target</span>
                        <span className="text-sm font-bold text-white">{calculatedMacros.calories} kcal</span>
                    </div>
                    <div className="flex gap-2 text-[10px] font-mono">
                        <span className="text-indigo-400">P:{calculatedMacros.protein}g</span>
                        <span className="text-emerald-400">C:{calculatedMacros.carbs}g</span>
                        <span className="text-orange-400">F:{calculatedMacros.fat}g</span>
                    </div>
                </div>
            </div>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 bg-slate-900 p-1 rounded-2xl border border-slate-800 sticky top-4 z-40 backdrop-blur-md bg-opacity-80 shadow-xl">
        <TabButton 
          active={activeTab === 'plan'} 
          onClick={() => setActiveTab('plan')} 
          icon={Calendar} 
          label="Piano" 
        />
        <TabButton 
          active={activeTab === 'recipes'} 
          onClick={() => setActiveTab('recipes')} 
          icon={BookOpen} 
          label="Ricette" 
        />
        <TabButton 
          active={activeTab === 'shop'} 
          onClick={() => setActiveTab('shop')} 
          icon={ShoppingCart} 
          label="Spesa" 
        />
        <TabButton 
          active={activeTab === 'supplements'} 
          onClick={() => setActiveTab('supplements')} 
          icon={Pill} 
          label="Integr." 
        />
      </div>

      {/* Content */}
      <div className="min-h-[400px]">
        {activeTab === 'plan' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {weeklyPlan.map(day => (
              <DayAccordion 
                key={day.day} 
                dayData={day} 
                isOpen={openDay === day.day} 
                toggle={() => setOpenDay(openDay === day.day ? null : day.day)} 
                onRecipeClick={setSelectedRecipe}
              />
            ))}
          </motion.div>
        )}

        {activeTab === 'recipes' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <RecipeBrowser onSelect={setSelectedRecipe} />
          </motion.div>
        )}

        {activeTab === 'shop' && (
           <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
               <ShoppingListView items={shoppingList} />
           </motion.div>
        )}

        {activeTab === 'supplements' && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <SupplementView supplements={supplements} />
            </motion.div>
        )}
      </div>
    </div>
  );
}
