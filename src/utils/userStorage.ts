import { useState } from 'react';

// --- Interfaces ---

export interface DailyLog {
  date: string; // YYYY-MM-DD
  weight: number | null;
  sleepHours: number;
  soreness: number; // 1 (No pain) to 5 (Extreme pain)
  energyLevel: number; // 1 (Low) to 5 (High)
  waterIntake: number; // in ml
  waterGoal: number; // in ml
  workoutCompleted: boolean;
  notes: string;
}

import { Creator } from '../data/workoutData';

export interface UserSettings {
  name: string;
  height: number;
  targetWeight: number;
  activityLevel: 'Sedentary' | 'Light' | 'Moderate' | 'Active' | 'Athlete';
  activePlan?: Creator;
}

// --- Storage Keys ---
const LOGS_KEY = 'fitmath_daily_logs';
const SETTINGS_KEY = 'fitmath_user_settings';

// --- Helpers ---
const getTodayStr = () => new Date().toISOString().split('T')[0];

// --- API ---

export const useUserStorage = () => {
  const [logs, setLogs] = useState<Record<string, DailyLog>>(() => {
    try {
      const saved = localStorage.getItem(LOGS_KEY);
      return saved ? JSON.parse(saved) : {};
    } catch (e) {
      return {};
    }
  });
  
  const [settings, setSettings] = useState<UserSettings>(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_KEY);
      return saved ? JSON.parse(saved) : {
        name: 'Atleta',
        height: 175,
        targetWeight: 70,
        activityLevel: 'Moderate',
        activePlan: 'Chris Heria'
      };
    } catch (e) {
      return {
        name: 'Atleta',
        height: 175,
        targetWeight: 70,
        activityLevel: 'Moderate',
        activePlan: 'Chris Heria'
      };
    }
  });

  // Save methods
  const saveLog = (log: DailyLog) => {
    const newLogs = { ...logs, [log.date]: log };
    setLogs(newLogs);
    localStorage.setItem(LOGS_KEY, JSON.stringify(newLogs));
  };

  const updateSettings = (newSettings: UserSettings) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
  };

  const getTodayLog = (): DailyLog => {
    const today = getTodayStr();
    return logs[today] || {
      date: today,
      weight: null,
      sleepHours: 7,
      soreness: 2,
      energyLevel: 3,
      waterIntake: 0,
      waterGoal: 2500, // Default, will be recalculated
      workoutCompleted: false,
      notes: ''
    };
  };

  // --- Scientific Algorithms ---

  // 1. Calculate Readiness Score (0-100)
  // Based on Sleep (50%) and Soreness (50%) + Energy Modifier
  const calculateReadiness = (log: DailyLog): { score: number; status: string; color: string } => {
    // Sleep Score: Optimal is 7-9 hours. 
    // <5: 0pts, 5-6: 50pts, 7-9: 100pts, >9: 90pts
    let sleepScore = 0;
    if (log.sleepHours >= 7 && log.sleepHours <= 9) sleepScore = 100;
    else if (log.sleepHours >= 5) sleepScore = 60;
    else if (log.sleepHours > 9) sleepScore = 90;
    else sleepScore = 30;

    // Soreness Score: 1=100pts, 5=0pts
    const sorenessScore = 100 - ((log.soreness - 1) * 25);

    // Energy Modifier: +/- 10%
    const energyMod = (log.energyLevel - 3) * 5; 

    let totalScore = ((sleepScore + sorenessScore) / 2) + energyMod;
    totalScore = Math.min(100, Math.max(0, totalScore));

    let status = 'Ottimale';
    let color = 'text-emerald-400';
    if (totalScore < 40) { status = 'Recupero Necessario'; color = 'text-red-400'; }
    else if (totalScore < 70) { status = 'Moderato'; color = 'text-yellow-400'; }

    return { score: Math.round(totalScore), status, color };
  };

  // 2. Calculate Water Goal
  // Formula: (WeightKg * 35) + (ActivityModifier)
  const calculateWaterGoal = (weight: number | null, workoutDurationMin: number = 0) => {
    const baseWeight = weight || 70; // Fallback
    let goal = baseWeight * 35; // 35ml per kg

    // Activity multiplier (sweat loss)
    if (workoutDurationMin > 0) {
        goal += (workoutDurationMin / 30) * 500; // +500ml every 30 mins exercise
    }

    return Math.round(goal);
  };

  return {
    logs,
    settings,
    saveLog,
    updateSettings,
    getTodayLog,
    calculateReadiness,
    calculateWaterGoal,
    getTodayStr
  };
};
