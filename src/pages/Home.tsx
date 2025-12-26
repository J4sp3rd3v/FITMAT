import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Droplets, Scale, ChevronRight, AlertCircle, CheckCircle2, Flame, Settings as SettingsIcon, Trophy, Award, Download } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserStorage, DailyLog } from '../utils/userStorage';
import { useUserContext } from '../context/UserContext';
import { 
  WORKOUT_DB, 
  CHRIS_HERIA_WEEKLY_PLAN, 
  MIDAS_MVMT_WEEKLY_PLAN, 
  NEXT_WORKOUT_WEEKLY_PLAN, 
  WILDMOOSE_WEEKLY_PLAN,
  MIXED_WEEKLY_PLAN,
  Creator,
  WeeklyPlanDay,
  getApprovedWorkouts
} from '../data/workoutData';

export default function Home() {
  const { getTodayLog, saveLog, calculateReadiness, calculateWaterGoal, settings, updateSettings } = useUserStorage();
  const { profile } = useUserContext();
  const [log, setLog] = useState<DailyLog | null>(null);
  const [readiness, setReadiness] = useState<{ score: number, status: string, color: string }>({ score: 0, status: '', color: '' });
  const [showPlanSelector, setShowPlanSelector] = useState(false);

  // Initialize data
  useEffect(() => {
    const todayLog = getTodayLog();
    setLog(todayLog);
    setReadiness(calculateReadiness(todayLog));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update logic when log changes
  useEffect(() => {
    if (!log) return;
    
    // Recalculate Readiness
    const newReadiness = calculateReadiness(log);
    setReadiness(newReadiness);

    // Recalculate Water Goal (Dynamic)
    // Assume 45min workout if completed, else 0. This could be more precise.
    const workoutDuration = log.workoutCompleted ? 45 : 0;
    const newWaterGoal = calculateWaterGoal(log.weight || settings.targetWeight, workoutDuration);
    
    if (newWaterGoal !== log.waterGoal) {
        setLog(prev => prev ? ({ ...prev, waterGoal: newWaterGoal }) : null);
    }
    
    // Save to storage
    saveLog(log);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [log?.sleepHours, log?.soreness, log?.energyLevel, log?.weight, log?.workoutCompleted, log?.waterIntake]);

  if (!log) return null;

  // --- Handlers ---
  const addWater = (amount: number) => {
    setLog(prev => prev ? ({ ...prev, waterIntake: prev.waterIntake + amount }) : null);
  };

  const toggleWorkout = () => {
    setLog(prev => prev ? ({ ...prev, workoutCompleted: !prev.workoutCompleted }) : null);
  };

  const changePlan = (creator: Creator) => {
    updateSettings({ ...settings, activePlan: creator });
    setShowPlanSelector(false);
  };

  // --- Dynamic Suggestions ---
  const getDailySuggestion = () => {
    if (readiness.score < 40) return "Il corpo chiede riposo. Oggi concentrati su idratazione e stretching leggero. Niente HIIT.";
    if (readiness.score < 70) return "Energia moderata. Mantieni i carichi stabili ma non cercare il massimale. Ottimo per cardio LISS.";
    return "Sei al top! Oggi è il giorno perfetto per spingere al massimo e tentare un PR o HIIT intenso.";
  };

  const getWeeklyPlan = (creator: Creator | undefined): WeeklyPlanDay[] => {
    switch (creator) {
      case 'Midas Movement': return MIDAS_MVMT_WEEKLY_PLAN;
      case 'NEXT Workout': return NEXT_WORKOUT_WEEKLY_PLAN;
      case 'WildMoose': return WILDMOOSE_WEEKLY_PLAN;
      case 'Smart Mix': return MIXED_WEEKLY_PLAN;
      case 'Chris Heria':
      default: return CHRIS_HERIA_WEEKLY_PLAN;
    }
  };

  const getTodayWorkout = () => {
      const dayIndex = new Date().getDay(); // 0=Sun, 1=Mon
      const planDayIndex = dayIndex === 0 ? 6 : dayIndex - 1; // Convert to 0=Mon, 6=Sun index for array
      const plan = getWeeklyPlan(settings.activePlan);
      const planItem = plan[planDayIndex];
      const workout = getApprovedWorkouts().find(w => w.id === planItem?.workoutId);
      return { planItem, workout };
  };
  const { workout, planItem } = getTodayWorkout();

  const getPlanColor = (creator: Creator | undefined) => {
      switch (creator) {
          case 'Midas Movement': return 'text-yellow-400';
          case 'NEXT Workout': return 'text-cyan-400';
          case 'WildMoose': return 'text-orange-400';
          case 'Smart Mix': return 'text-purple-400';
          default: return 'text-indigo-400'; // Chris Heria
      }
  };

  const exportCalendar = () => {
    const plan = getWeeklyPlan(settings.activePlan);
    const events = plan.map((day, index) => {
        // Calculate date for this day of the week (assuming starting from next Monday or current week)
        const today = new Date();
        const currentDay = today.getDay(); // 0-6
        // Adjust to find Monday of current week (if Sunday(0), go back 6 days. if Monday(1), go back 0)
        const distanceToMonday = currentDay === 0 ? -6 : 1 - currentDay;
        const mondayDate = new Date(today);
        mondayDate.setDate(today.getDate() + distanceToMonday);
        
        const eventDate = new Date(mondayDate);
        eventDate.setDate(mondayDate.getDate() + index); // index 0 is Monday
        
        const workout = WORKOUT_DB.find(w => w.id === day.workoutId);
        
        const dateString = eventDate.toISOString().split('T')[0].replace(/-/g, '');
        
        return `BEGIN:VEVENT
SUMMARY:Workout: ${workout?.title || 'Workout'}
DTSTART;VALUE=DATE:${dateString}
DESCRIPTION:Focus: ${day.focus}. Creator: ${workout?.creator}. Duration: ${workout?.duration} min.
END:VEVENT`;
    }).join('\n');

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//FitMathCoach//Workout Plan//EN
${events}
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'fitmath-plan.ics');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 pb-24 space-y-6"
    >
      {/* Header Date */}
      <div className="flex justify-between items-end">
        <div>
          <p className="text-slate-400 text-xs font-medium uppercase tracking-wider">{new Date().toLocaleDateString('it-IT', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
          <h1 className="text-2xl font-bold text-white">Ciao, {settings.name}</h1>
          <div className="flex items-center gap-2 mt-1">
             <span className="text-xs font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/20">Lv. {profile?.level || 1}</span>
             <span className="text-xs text-slate-500">{profile?.xp || 0} XP</span>
          </div>
        </div>
        <button className="text-indigo-400 text-xs font-bold bg-indigo-500/10 px-3 py-1.5 rounded-full border border-indigo-500/20 opacity-50 cursor-not-allowed">
            Biofeedback
        </button>
      </div>

      {/* Gamification Banner */}
      <div className="bg-gradient-to-r from-indigo-900/50 to-slate-900/50 rounded-2xl p-4 border border-indigo-500/20 flex items-center justify-between relative overflow-hidden">
         <div className="relative z-10">
             <div className="flex items-center gap-2 mb-2">
                 <Trophy className="text-yellow-400" size={16} />
                 <span className="text-xs font-bold text-indigo-200">Prossimo Livello</span>
             </div>
             <div className="w-48 h-2 bg-slate-800 rounded-full overflow-hidden">
                 <div 
                    className="h-full bg-indigo-500 rounded-full" 
                    style={{ width: `${((profile?.xp || 0) % 1000) / 10}%` }}
                 />
             </div>
             <p className="text-[10px] text-slate-400 mt-1">
                {1000 - ((profile?.xp || 0) % 1000)} XP al Livello {(profile?.level || 1) + 1}
             </p>
         </div>
         <div className="relative z-10 text-right">
             <p className="text-[10px] text-slate-400 uppercase tracking-wider">Badge</p>
             <div className="flex -space-x-2 mt-1 justify-end">
                {(profile?.badges || []).slice(-3).map((badge, i) => (
                    <div key={i} className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-[10px]" title={badge}>
                        <Award size={12} className="text-emerald-400" />
                    </div>
                ))}
                {(profile?.badges || []).length === 0 && (
                    <span className="text-xs text-slate-600 italic">Nessuno</span>
                )}
             </div>
         </div>
         {/* Decorative Glow */}
         <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full -mr-10 -mt-10 pointer-events-none" />
      </div>

      {/* 1. Readiness Score Card */}
      <div className="bg-slate-900 rounded-3xl p-6 border border-slate-800 relative overflow-hidden">
        <div className="flex justify-between items-start relative z-10">
            <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Readiness Score</span>
                <div className={`text-4xl font-black mt-1 ${readiness.color}`}>
                    {readiness.score}%
                </div>
                <p className={`text-sm font-medium ${readiness.color}`}>{readiness.status}</p>
            </div>
            <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                <Activity className={readiness.color} size={24} />
            </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-slate-800 relative z-10">
            <p className="text-slate-300 text-xs leading-relaxed">
                <AlertCircle size={12} className="inline mr-1 text-indigo-400" />
                {getDailySuggestion()}
            </p>
        </div>

        {/* Background Gradient */}
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${readiness.score > 70 ? 'from-emerald-500/20' : readiness.score < 40 ? 'from-red-500/20' : 'from-yellow-500/20'} to-transparent blur-3xl rounded-full -mr-10 -mt-10 pointer-events-none`} />
      </div>

      {/* 2. Today's Mission (Workout) */}
      <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-white">Missione di Oggi</h2>
            <div className="relative flex gap-2">
                <button
                    onClick={exportCalendar}
                    className="text-xs font-bold text-slate-400 bg-slate-800 p-1.5 rounded-lg border border-slate-700 hover:text-white transition-colors"
                    title="Esporta Calendario"
                >
                    <Download size={14} />
                </button>
                <button 
                    onClick={() => setShowPlanSelector(!showPlanSelector)}
                    className={`text-xs font-bold flex items-center gap-1 ${getPlanColor(settings.activePlan)} bg-slate-800 px-2 py-1 rounded-lg border border-slate-700`}
                >
                    {settings.activePlan || 'Chris Heria'} <SettingsIcon size={12} />
                </button>
                
                {/* Plan Selector Dropdown */}
                <AnimatePresence>
                    {showPlanSelector && (
                        <motion.div 
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            className="absolute right-0 top-8 z-20 bg-slate-800 border border-slate-700 rounded-xl shadow-xl p-2 w-48 flex flex-col gap-1"
                        >
                            {(['Chris Heria', 'Midas Movement', 'NEXT Workout', 'WildMoose', 'Smart Mix'] as Creator[]).map(creator => (
                                <button
                                    key={creator}
                                    onClick={() => changePlan(creator)}
                                    className={`text-left px-3 py-2 rounded-lg text-xs font-bold transition-colors ${settings.activePlan === creator ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:bg-slate-700 hover:text-white'}`}
                                >
                                    {creator}
                                </button>
                            ))}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
          </div>
          
          {workout ? (
             <Link to="/workouts" className="block bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-1 border border-indigo-500/30 group">
                <div className="bg-slate-900/50 rounded-xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-indigo-600 flex items-center justify-center text-2xl shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                        {workout.icon}
                    </div>
                    <div className="flex-1">
                        <div className="flex justify-between items-start">
                            <h3 className="text-white font-bold leading-tight">{workout.title}</h3>
                            {log.workoutCompleted && <CheckCircle2 className="text-emerald-400" size={20} />}
                        </div>
                        <p className="text-slate-400 text-xs mt-1 flex items-center gap-2">
                            <span className="text-indigo-400">{planItem?.focus}</span>
                        </p>
                        <p className="text-slate-500 text-[10px] mt-1 flex items-center gap-2">
                            <Flame size={12} className="text-orange-400" /> {workout.calories} kcal
                            <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                            {workout.duration} min
                        </p>
                    </div>
                    <ChevronRight className="text-slate-500 group-hover:text-white transition-colors" />
                </div>
                {!log.workoutCompleted ? (
                    <div 
                        onClick={(e) => { e.preventDefault(); toggleWorkout(); }}
                        className="mx-4 mb-2 mt-2 py-2 bg-indigo-600/20 hover:bg-indigo-600/30 text-indigo-300 text-xs font-bold rounded-lg text-center cursor-pointer transition-colors border border-indigo-500/20"
                    >
                        Segna come Completato
                    </div>
                ) : (
                    <div 
                        onClick={(e) => { e.preventDefault(); toggleWorkout(); }}
                        className="mx-4 mb-2 mt-2 py-2 bg-emerald-500/10 text-emerald-400 text-xs font-bold rounded-lg text-center cursor-pointer border border-emerald-500/20"
                    >
                        Ottimo lavoro! 🔥
                    </div>
                )}
             </Link>
          ) : (
            <div className="bg-slate-800 rounded-2xl p-4 text-center text-slate-400 text-sm">
                Nessun allenamento programmato per oggi con {settings.activePlan || 'Chris Heria'}.
            </div>
          )}
      </div>

      {/* 3. Hydration & Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
          {/* Water Tracker */}
          <div className="bg-slate-800 rounded-3xl p-5 border border-slate-700 flex flex-col justify-between h-40 relative overflow-hidden">
              <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-1">
                      <Droplets size={18} className="text-cyan-400" />
                      <span className="text-slate-400 text-xs font-bold uppercase">Acqua</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{log.waterIntake}</span>
                  <span className="text-xs text-slate-500"> / {log.waterGoal} ml</span>
              </div>
              
              <div className="relative z-10 flex gap-2 mt-2">
                  <button onClick={() => addWater(250)} className="flex-1 bg-cyan-900/50 hover:bg-cyan-800 text-cyan-300 text-xs font-bold py-2 rounded-lg border border-cyan-700/50 transition-colors">+250</button>
              </div>

              {/* Water Fill Effect */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-cyan-500/10 transition-all duration-500"
                style={{ height: `${Math.min(100, (log.waterIntake / log.waterGoal) * 100)}%` }}
              />
          </div>

          {/* Weight Tracker */}
          <div className="bg-slate-800 rounded-3xl p-5 border border-slate-700 flex flex-col justify-between h-40 relative overflow-hidden">
              <div>
                  <div className="flex items-center gap-2 mb-1">
                      <Scale size={18} className="text-pink-400" />
                      <span className="text-slate-400 text-xs font-bold uppercase">Peso</span>
                  </div>
                  <span className="text-2xl font-bold text-white">{log.weight || '--'}</span>
                  <span className="text-xs text-slate-500"> kg</span>
              </div>
              <p className="text-[10px] text-slate-400 leading-tight">
                  Target: <span className="text-white font-bold">{settings.targetWeight} kg</span>.
                  Aggiorna ogni mattina a digiuno.
              </p>
          </div>
      </div>

      {/* Version Indicator */}
      <div className="text-center pb-4">
        <p className="text-[10px] text-slate-600">App v2.4.0</p>
      </div>

    </motion.div>
  );
}
