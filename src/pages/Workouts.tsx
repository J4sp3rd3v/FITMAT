import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Clock, BarChart, ChevronDown, Flame, Trophy, CalendarDays, Youtube, User, Activity, Heart } from 'lucide-react';
import { WORKOUT_DB, Workout, WorkoutCategory, CHRIS_HERIA_WEEKLY_PLAN, MIDAS_MVMT_WEEKLY_PLAN, NEXT_WORKOUT_WEEKLY_PLAN, WILDMOOSE_WEEKLY_PLAN, MIXED_WEEKLY_PLAN, Creator, getApprovedWorkouts } from '../data/workoutData';
import WorkoutPlayer from '../components/WorkoutPlayer';
import { useUserStorage } from '../utils/userStorage';
import { useUserContext } from '../context/UserContext';

// --- Components ---

const WorkoutDetail = ({ workout, onClose, onStart }: { workout: Workout; onClose: () => void; onStart: () => void }) => {
  const { profile, toggleFavorite } = useUserContext();
  const [activeExerciseVideo, setActiveExerciseVideo] = useState<string | null>(null);
  const isFavorite = (profile.favorites || []).includes(workout.id);

  const toggleVideo = (id: string) => {
    setActiveExerciseVideo(prev => prev === id ? null : id);
  };

  const hasSections = workout.sections && workout.sections.length > 0;

  return (
  <motion.div 
    initial={{ opacity: 0, x: '100%' }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: '100%' }}
    transition={{ type: "spring", damping: 25, stiffness: 200 }}
    className="fixed inset-0 z-[100] bg-slate-950 flex flex-col overflow-y-auto pb-safe"
  >
    {/* Header Actions */}
    <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
      <button 
          onClick={onClose}
          className="w-10 h-10 bg-slate-900/80 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-slate-700 shadow-lg active:scale-95 transition-transform"
      >
          <ChevronDown className="rotate-90" size={24} />
      </button>
    </div>

    <div className="absolute top-4 right-4 z-20">
      <button 
          onClick={() => toggleFavorite(workout.id)}
          className={`w-10 h-10 backdrop-blur-md rounded-full flex items-center justify-center border shadow-lg active:scale-95 transition-all ${isFavorite ? 'bg-red-500/80 border-red-500 text-white' : 'bg-slate-900/80 border-slate-700 text-slate-400'}`}
      >
          <Heart size={20} fill={isFavorite ? "currentColor" : "none"} />
      </button>
    </div>

    {/* Hero Section (Video or Image) */}
    <div className="relative w-full shrink-0 bg-black aspect-video flex items-center justify-center">
        {workout.youtubeId ? (
            <iframe 
                width="100%" 
                height="100%" 
                src={`https://www.youtube.com/embed/${workout.youtubeId}?autoplay=1&rel=0&modestbranding=1`} 
                title={workout.title}
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 z-10"
            ></iframe>
        ) : (
            <div className="relative w-full h-72 flex items-center justify-center overflow-hidden shrink-0" style={{ background: workout.imageColor }}>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950" />
                <span className="text-[100px] relative z-10 drop-shadow-2xl">{workout.icon}</span>
            </div>
        )}
    </div>

    {/* Content */}
    <div className="p-6 relative z-10 flex-1 flex flex-col bg-slate-950 -mt-4 rounded-t-3xl border-t border-slate-800/50">
        <div className="flex justify-between items-start mb-2 pt-2">
            <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-bold uppercase tracking-wider border border-slate-700">
              {workout.category}
            </span>
            <span className="flex items-center gap-1 text-slate-300 text-xs font-bold bg-slate-800 px-2 py-1 rounded border border-slate-700">
                <User size={14} /> {workout.creator}
            </span>
        </div>
        
        <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{workout.title}</h2>
        <p className="text-slate-400 text-sm mb-6 leading-relaxed">{workout.description}</p>

        {/* Gamification Badge if present */}
        {workout.gamification && (
          <div className="mb-6 bg-gradient-to-r from-yellow-600/20 to-orange-600/20 p-4 rounded-xl border border-yellow-500/30 flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-yellow-500/20 flex items-center justify-center text-2xl border border-yellow-500/50">
                🏆
             </div>
             <div>
                <p className="text-yellow-500 text-xs font-bold uppercase tracking-wider">Quest Reward</p>
                <p className="text-white font-bold">{workout.gamification.badge}</p>
                <p className="text-yellow-200/70 text-xs">+{workout.gamification.xp} XP</p>
             </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                <Clock size={20} className="text-indigo-400 mb-1" />
                <span className="text-white font-bold text-sm">{workout.duration}</span>
                <span className="text-[10px] text-slate-500">Minuti</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                <Flame size={20} className="text-orange-400 mb-1" />
                <span className="text-white font-bold text-sm">{workout.calories}</span>
                <span className="text-[10px] text-slate-500">Kcal</span>
            </div>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
                <BarChart size={20} className="text-emerald-400 mb-1" />
                <span className="text-white font-bold text-sm">{workout.level}</span>
                <span className="text-[10px] text-slate-500">Livello</span>
            </div>
        </div>

        {hasSections ? (
            <div className="space-y-8 mb-8">
                {workout.sections.map((section, sIndex) => (
                  <div key={sIndex} className="space-y-4">
                    <h3 className="text-white font-bold text-lg flex items-center gap-2 border-b border-slate-800 pb-2">
                        <Activity size={18} className="text-indigo-500" /> {section.title}
                    </h3>
                    <div className="space-y-4">
                      {section.exercises.map((ex, i) => (
                          <div key={ex.id} className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col gap-4">
                              <div className="flex gap-4">
                                  <div className="w-8 h-8 rounded-full bg-slate-800 text-indigo-400 flex items-center justify-center text-sm font-bold shrink-0 border border-slate-700">
                                      {i + 1}
                                  </div>
                                  <div className="flex-1">
                                      <div className="flex justify-between items-start mb-1">
                                          <h4 className="text-white font-bold text-sm">{ex.name}</h4>
                                          <span className="text-xs font-mono text-slate-400">{ex.sets} x {ex.reps}</span>
                                      </div>
                                      {ex.notes && <p className="text-xs text-slate-500 mb-2 italic">{ex.notes}</p>}
                                      <div className="flex justify-between items-center mt-2">
                                          <div className="flex items-center gap-2 text-[10px] text-slate-600 bg-slate-950/50 px-2 py-1 rounded w-fit">
                                              <Clock size={10} /> Recupero: {ex.rest}s
                                          </div>
                                          {ex.youtubeId && (
                                              <button 
                                                  onClick={() => toggleVideo(ex.id)}
                                                  className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-colors border ${
                                                      activeExerciseVideo === ex.id 
                                                      ? 'bg-red-600 text-white border-red-500' 
                                                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                                                  }`}
                                              >
                                                  <Youtube size={14} />
                                                  {activeExerciseVideo === ex.id ? 'Chiudi' : 'Video'}
                                              </button>
                                          )}
                                      </div>
                                  </div>
                              </div>

                              {/* Video Player */}
                              <AnimatePresence>
                                  {activeExerciseVideo === ex.id && ex.youtubeId && (
                                      <motion.div
                                          initial={{ height: 0, opacity: 0 }}
                                          animate={{ height: 'auto', opacity: 1 }}
                                          exit={{ height: 0, opacity: 0 }}
                                          className="overflow-hidden"
                                      >
                                          <div className="relative w-full aspect-video bg-black rounded-lg overflow-hidden border border-slate-700 shadow-inner mt-2">
                                              <iframe 
                                                  width="100%" 
                                                  height="100%" 
                                                  src={`https://www.youtube.com/embed/${ex.youtubeId}?autoplay=1&rel=0&modestbranding=1`} 
                                                  title={ex.name}
                                                  frameBorder="0" 
                                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                                  allowFullScreen
                                                  className="absolute inset-0 z-10"
                                              ></iframe>
                                          </div>
                                      </motion.div>
                                  )}
                              </AnimatePresence>
                          </div>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
        ) : (
             <div className="mb-8 bg-slate-900/50 p-6 rounded-2xl border border-slate-800 text-center">
                <p className="text-slate-400 text-sm mb-4">
                    Questo è un allenamento "Follow Along". Segui il video e completa gli esercizi insieme all'istruttore.
                </p>
                <div className="flex justify-center gap-4 text-xs text-slate-500">
                     <span className="flex items-center gap-1"><Play size={12} /> Video Guidato</span>
                     <span className="flex items-center gap-1"><Clock size={12} /> {workout.duration} Min</span>
                </div>
            </div>
        )}

        {!workout.youtubeId && (
            <button 
            onClick={onStart}
            className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors mt-auto mb-6 shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2"
            >
            <Play size={20} fill="currentColor" />
            Inizia Allenamento
            </button>
        )}
    </div>
  </motion.div>
  );
}

export default function Workouts() {
  const { profile, toggleFavorite } = useUserContext();
  const [filter, setFilter] = useState<'All' | WorkoutCategory>('All');
  const [showFavorites, setShowFavorites] = useState(false);
  const [selectedWorkout, setSelectedWorkout] = useState<Workout | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<Creator>('Chris Heria');
  const [isPlaying, setIsPlaying] = useState(false);
  const { getTodayLog, saveLog } = useUserStorage();

  const handleWorkoutComplete = () => {
    setIsPlaying(false);
    setSelectedWorkout(null);
    const todayLog = getTodayLog();
    saveLog({ ...todayLog, workoutCompleted: true });
    // You could add a dedicated completion modal here
  };

  // Filter workouts logic
  const filteredWorkouts = getApprovedWorkouts().filter(w => {
    const matchesCategory = filter === 'All' ? true : w.category === filter;
    const matchesFavorite = showFavorites ? (profile.favorites || []).includes(w.id) : true;
    return matchesCategory && matchesFavorite;
  });

  const openPlanWorkout = (workoutId: string) => {
      const workout = WORKOUT_DB.find(w => w.id === workoutId);
      if (workout) setSelectedWorkout(workout);
  };

  const getActivePlan = () => {
    switch (selectedPlan) {
      case 'Chris Heria': return CHRIS_HERIA_WEEKLY_PLAN;
      case 'Midas Movement': return MIDAS_MVMT_WEEKLY_PLAN;
      case 'NEXT Workout': return NEXT_WORKOUT_WEEKLY_PLAN;
      case 'WildMoose': return WILDMOOSE_WEEKLY_PLAN;
      case 'Smart Mix': return MIXED_WEEKLY_PLAN;
      default: return CHRIS_HERIA_WEEKLY_PLAN;
    }
  };

  const getPlanColor = (creator: Creator) => {
    switch (creator) {
      case 'Chris Heria': return 'indigo';
      case 'Midas Movement': return 'yellow';
      case 'NEXT Workout': return 'cyan';
      case 'WildMoose': return 'orange';
      case 'Smart Mix': return 'purple';
      default: return 'slate';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="p-6 pb-24"
    >
      <AnimatePresence>
        {isPlaying && selectedWorkout && (
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="fixed inset-0 z-[200] bg-black"
            >
                <WorkoutPlayer 
                    workout={selectedWorkout} 
                    onClose={() => setIsPlaying(false)} 
                    onComplete={handleWorkoutComplete} 
                />
            </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedWorkout && !isPlaying && (
            <WorkoutDetail 
                workout={selectedWorkout} 
                onClose={() => setSelectedWorkout(null)} 
                onStart={() => setIsPlaying(true)}
            />
        )}
      </AnimatePresence>

      <div className="flex justify-between items-center mb-2">
        <h1 className="text-2xl font-bold text-white">Allenamenti</h1>
        <button 
            onClick={() => setShowFavorites(!showFavorites)}
            className={`p-2 rounded-full border transition-colors ${showFavorites ? 'bg-red-500/20 text-red-400 border-red-500/50' : 'bg-slate-800 text-slate-400 border-slate-700'}`}
        >
            <Heart size={20} fill={showFavorites ? "currentColor" : "none"} />
        </button>
      </div>
      <p className="text-slate-400 text-sm mb-6">Scegli il tuo obiettivo di oggi.</p>

      {/* Plan Selector */}
      <div className="flex overflow-x-auto gap-2 pb-4 no-scrollbar mb-2">
         {(['Chris Heria', 'Midas Movement', 'NEXT Workout', 'WildMoose', 'Smart Mix'] as Creator[]).map(creator => (
           <button
             key={creator}
             onClick={() => setSelectedPlan(creator)}
             className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
               selectedPlan === creator 
               ? `bg-${getPlanColor(creator)}-500/20 text-${getPlanColor(creator)}-400 border-${getPlanColor(creator)}-500/50`
               : 'bg-slate-900 text-slate-400 border-slate-800'
             }`}
           >
             {creator}
           </button>
         ))}
      </div>

      {/* Active Weekly Plan */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <CalendarDays className={`text-${getPlanColor(selectedPlan)}-400`} size={20} />
                Piano Settimanale
            </h2>
        </div>
        <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar -mx-6 px-6">
            {getActivePlan().map((day, i) => {
                const workout = getApprovedWorkouts().find(w => w.id === day.workoutId);
                if (!workout) return null;
                const isToday = new Date().getDay() === (i + 1 === 7 ? 0 : i + 1); // Simple logic (Mon=1, Sun=7/0)
                const activeColor = getPlanColor(selectedPlan);
                
                return (
                    <div 
                        key={day.day}
                        onClick={() => openPlanWorkout(day.workoutId)}
                        className={`shrink-0 w-32 p-3 rounded-xl border flex flex-col gap-2 cursor-pointer relative overflow-hidden group ${
                            isToday 
                            ? `bg-${activeColor}-600 border-${activeColor}-500` 
                            : `bg-slate-900 border-slate-800 hover:border-${activeColor}-500/50`
                        }`}
                    >
                        <span className={`text-[10px] font-bold uppercase tracking-wider ${isToday ? 'text-white/80' : 'text-slate-500'}`}>
                            {day.day}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-lg mb-1">
                            {workout.icon}
                        </div>
                        <div>
                            <p className={`text-xs font-bold leading-tight line-clamp-2 ${isToday ? 'text-white' : 'text-slate-200'}`}>
                                {workout.title}
                            </p>
                            <p className={`text-[10px] mt-1 ${isToday ? 'text-white/70' : 'text-slate-500'}`}>
                                {day.focus}
                            </p>
                        </div>
                        {isToday && (
                            <div className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full animate-pulse shadow-[0_0_10px_rgba(255,255,255,0.5)]"></div>
                        )}
                    </div>
                );
            })}
        </div>
      </div>

      <div className="flex overflow-x-auto gap-2 pb-2 mb-6 no-scrollbar">
        {['All', 'Full Body', 'Cardio', 'Core', 'Upper Body', 'Lower Body', 'Mobility'].map((cat) => (
          <button 
            key={cat}
            onClick={() => setFilter(cat as typeof filter)}
            className={`px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-colors border ${
              filter === cat 
              ? 'bg-indigo-600 border-indigo-600 text-white' 
              : 'bg-slate-800 border-slate-700 text-slate-400 hover:bg-slate-700'
            }`}
          >
            {cat === 'All' ? 'Tutti' : cat}
          </button>
        ))}
      </div>

      <div className="space-y-4">
        {filteredWorkouts.map((workout) => (
          <div 
            key={workout.id} 
            onClick={() => setSelectedWorkout(workout)}
            className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 group cursor-pointer hover:border-indigo-500/50 transition-colors"
          >
            <div 
              className="h-28 p-4 flex flex-col justify-between relative"
              style={{ background: workout.imageColor }}
            >
              <div className="flex justify-between items-start relative z-10">
                <span className="bg-black/20 backdrop-blur-md text-white text-[10px] font-bold px-2 py-1 rounded-lg uppercase tracking-wider border border-white/10">
                  {workout.level}
                </span>
                <span className="text-2xl drop-shadow-md">{workout.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-white relative z-10 drop-shadow-md">{workout.title}</h3>
              {/* Overlay pattern for texture */}
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
            </div>
            
            <div className="p-4 flex items-center justify-between">
              <div className="flex gap-4 text-slate-400 text-xs font-medium">
                <div className="flex items-center gap-1.5">
                  <Clock size={14} className="text-indigo-400" />
                  {workout.duration} min
                </div>
                <div className="flex items-center gap-1.5">
                  <Flame size={14} className="text-orange-400" />
                  {workout.calories} kcal
                </div>
                 <div className="flex items-center gap-1.5">
                  <User size={14} className="text-emerald-400" />
                  {workout.creator}
                </div>
              </div>
              <button 
                  onClick={(e) => {
                      e.stopPropagation();
                      toggleFavorite(workout.id);
                  }}
                  className={`p-1.5 rounded-full transition-colors ${
                      (profile.favorites || []).includes(workout.id) 
                      ? 'text-red-500 bg-red-500/10' 
                      : 'text-slate-600 hover:text-red-400 hover:bg-slate-700'
                  }`}
              >
                  <Heart size={16} fill={(profile.favorites || []).includes(workout.id) ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        ))}
        {filteredWorkouts.length === 0 && (
            <div className="text-center py-10 text-slate-500">
                <Trophy size={40} className="mx-auto mb-2 opacity-20" />
                <p>Nessun allenamento trovato in questa categoria.</p>
            </div>
        )}
      </div>
    </motion.div>
  );
}