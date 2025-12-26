import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, CheckCircle2, Volume2, VolumeX } from 'lucide-react';
import { Workout, Exercise } from '../data/workoutData';

interface WorkoutPlayerProps {
  workout: Workout;
  onClose: () => void;
  onComplete: () => void;
}

export default function WorkoutPlayer({ workout, onClose, onComplete }: WorkoutPlayerProps) {
  // Flatten exercises for linear playback, but keep track of sections
  const [flatExercises, setFlatExercises] = useState<{ exercise: Exercise; sectionTitle: string; index: number; total: number }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isResting, setIsResting] = useState(false);
  const [timer, setTimer] = useState(0); // in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  
  // Exercise Timer (for time-based exercises)
  const [exerciseTimer, setExerciseTimer] = useState(0);
  const [isExerciseTimerRunning, setIsExerciseTimerRunning] = useState(false);
  const [exerciseDuration, setExerciseDuration] = useState(0); // Total duration for progress
  const [isMuted, setIsMuted] = useState(true);
  
  // Initialize flattened list
  useEffect(() => {
    if (workout.sections && workout.sections.length > 0) {
      const flat: { exercise: Exercise; sectionTitle: string; index: number; total: number }[] = [];
      let totalCount = 0;
      workout.sections.forEach(section => {
        section.exercises.forEach(() => {
          totalCount++;
        });
      });

      let currentCount = 0;
      workout.sections.forEach(section => {
        section.exercises.forEach(ex => {
          currentCount++;
          flat.push({
            exercise: ex,
            sectionTitle: section.title,
            index: currentCount,
            total: totalCount
          });
        });
      });
      setFlatExercises(flat);
    } else {
        // Handle workouts without sections (legacy support or flat structure)
        // Assuming workout has a virtual single section if not defined, but type definition enforces sections.
        // If empty sections, handle gracefully.
        setFlatExercises([]);
    }
  }, [workout]);

  const currentItem = flatExercises[currentIndex];

  // Initialize Exercise Timer when currentItem changes
  useEffect(() => {
    if (currentItem) {
      const repString = currentItem.exercise.reps.toLowerCase();
      let duration = 0;
      if (repString.includes('sec')) {
        duration = parseInt(repString) || 0;
      } else if (repString.includes('min')) {
        duration = (parseFloat(repString) || 0) * 60;
      }
      
      if (duration > 0) {
        setExerciseTimer(duration);
        setExerciseDuration(duration);
        setIsExerciseTimerRunning(true);
      } else {
        setExerciseTimer(0);
        setExerciseDuration(0);
        setIsExerciseTimerRunning(false);
      }
    }
  }, [currentItem]);

  // Exercise Timer Countdown
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isExerciseTimerRunning && exerciseTimer > 0 && !isResting) {
      interval = setInterval(() => {
        setExerciseTimer((prev) => prev - 1);
      }, 1000);
    } else if (exerciseTimer === 0 && isExerciseTimerRunning) {
      setIsExerciseTimerRunning(false);
    }
    return () => {
        if (interval) clearInterval(interval);
    };
  }, [isExerciseTimerRunning, exerciseTimer, isResting]);

  // Timer logic (Rest Timer)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | null = null;
    if (isTimerRunning && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    } else if (timer === 0 && isTimerRunning) {
      setIsTimerRunning(false);
      // Timer finished (e.g. rest over)
      if (isResting) {
        skipRest();
      }
    }
    return () => {
        if (interval) clearInterval(interval);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isTimerRunning, timer, isResting]);

  const handleNext = () => {
    // If not resting and current exercise has rest > 0, start rest
    if (!isResting && currentItem.exercise.rest > 0) {
      setIsResting(true);
      setTimer(currentItem.exercise.rest);
      setIsTimerRunning(true);
    } else {
      // Move to next exercise
      nextExercise();
    }
  };

  const nextExercise = () => {
    setIsResting(false);
    setIsTimerRunning(false);
    setTimer(0);
    
    if (currentIndex < flatExercises.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onComplete();
    }
  };

  const skipRest = () => {
    setIsResting(false);
    setIsTimerRunning(false);
    nextExercise();
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setIsResting(false);
      setIsTimerRunning(false);
    }
  };

  if (!currentItem) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed inset-0 z-[110] bg-slate-950 flex flex-col"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800">
        <button onClick={onClose} className="p-2 text-slate-400 hover:text-white rounded-full hover:bg-slate-800">
          <X size={24} />
        </button>
        <div className="flex flex-col items-center">
          <span className="text-xs font-bold text-indigo-400 uppercase tracking-wider">{currentItem.sectionTitle}</span>
          <span className="text-white font-bold text-sm">
             Esercizio {currentItem.index} di {currentItem.total}
          </span>
        </div>
        <div className="w-10"></div> {/* Spacer */}
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-slate-800 w-full">
        <div 
          className="h-full bg-indigo-500 transition-all duration-300"
          style={{ width: `${(currentItem.index / currentItem.total) * 100}%` }}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        <AnimatePresence mode="wait">
          {isResting ? (
            <motion.div 
              key="rest"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex flex-col items-center justify-center h-full p-8 text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-2">Recupero</h2>
              <p className="text-slate-400 mb-8">Respira e preparati per il prossimo set.</p>
              
              <div className="relative w-48 h-48 flex items-center justify-center mb-8">
                <svg className="w-full h-full transform -rotate-90">
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    className="text-slate-800"
                  />
                  <circle
                    cx="96"
                    cy="96"
                    r="88"
                    stroke="currentColor"
                    strokeWidth="8"
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 88}
                    strokeDashoffset={2 * Math.PI * 88 * (1 - timer / currentItem.exercise.rest)}
                    className="text-emerald-500 transition-all duration-1000 ease-linear"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-5xl font-black text-white">{timer}</span>
                  <span className="text-xs text-slate-500 uppercase font-bold">Secondi</span>
                </div>
              </div>

              <div className="space-y-4 w-full max-w-sm">
                <div className="bg-slate-900 p-4 rounded-xl border border-slate-800">
                  <p className="text-xs text-slate-500 uppercase font-bold mb-1">Prossimo Esercizio</p>
                  <p className="text-white font-bold text-lg">
                    {flatExercises[currentIndex + 1] ? flatExercises[currentIndex + 1].exercise.name : 'Fine Allenamento'}
                  </p>
                </div>

                <button 
                  onClick={skipRest}
                  className="w-full py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors"
                >
                  Salta Recupero
                </button>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="exercise"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="flex flex-col h-full p-6"
            >
              {/* Exercise Video/Image */}
              <div className="aspect-video bg-black rounded-2xl overflow-hidden border border-slate-800 mb-6 relative shadow-2xl group">
                {currentItem.exercise.youtubeId ? (
                   <>
                   <iframe 
                      width="100%" 
                      height="100%" 
                      src={`https://www.youtube.com/embed/${currentItem.exercise.youtubeId}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${currentItem.exercise.youtubeId}&controls=0&modestbranding=1&rel=0`} 
                      title={currentItem.exercise.name}
                      frameBorder="0" 
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                      className="absolute inset-0 z-10 pointer-events-none"
                  ></iframe>
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="absolute bottom-4 right-4 z-20 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full backdrop-blur-md transition-colors border border-white/10"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </button>
                  </>
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                    <span className="text-6xl">🏋️</span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1 flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{currentItem.exercise.name}</h2>
                
                {/* Exercise Timer or Reps Display */}
                {exerciseDuration > 0 ? (
                    <div className="mb-6 flex flex-col items-center">
                        <div className="text-5xl font-black text-indigo-400 font-mono mb-2">
                            {exerciseTimer}
                        </div>
                        <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Secondi Rimanenti</div>
                        {/* Progress bar for timer */}
                        <div className="w-48 h-1.5 bg-slate-800 rounded-full mt-4 overflow-hidden">
                            <div 
                                className="h-full bg-indigo-500 transition-all duration-1000 ease-linear"
                                style={{ width: `${(exerciseTimer / exerciseDuration) * 100}%` }}
                            />
                        </div>
                    </div>
                ) : (
                    <div className="flex gap-4 mb-6">
                    <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                        <span className="text-slate-400 text-xs font-bold uppercase block">Sets</span>
                        <span className="text-white font-bold text-xl">{currentItem.exercise.sets}</span>
                    </div>
                    <div className="bg-slate-800 px-4 py-2 rounded-lg border border-slate-700">
                        <span className="text-slate-400 text-xs font-bold uppercase block">Reps</span>
                        <span className="text-white font-bold text-xl">{currentItem.exercise.reps}</span>
                    </div>
                    </div>
                )}
                
                {currentItem.exercise.notes && (
                  <div className="bg-indigo-900/20 text-indigo-300 p-4 rounded-xl border border-indigo-500/30 text-sm mb-6 w-full">
                    <span className="font-bold mr-2">Tip:</span>
                    {currentItem.exercise.notes}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Controls */}
      {!isResting && (
        <div className="p-6 bg-slate-900 border-t border-slate-800 flex items-center gap-4">
          <button 
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className={`p-4 rounded-2xl border ${currentIndex === 0 ? 'bg-slate-800 text-slate-600 border-slate-800' : 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'}`}
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={handleNext}
            className="flex-1 py-4 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-2xl transition-colors shadow-lg shadow-indigo-900/50 flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={20} />
            {currentIndex === flatExercises.length - 1 ? 'Completa Allenamento' : 'Fatto, Prossimo'}
          </button>
        </div>
      )}
    </motion.div>
  );
}
