import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

/* eslint-disable react-refresh/only-export-components */
export interface UserProfile {
  name: string;
  age: number;
  height: number; // cm
  weight: number; // kg
  gender: 'male' | 'female';
  goal: 'fat_loss' | 'muscle_gain' | 'maintenance';
  activityLevel: 'sedentary' | 'light' | 'moderate' | 'active' | 'athlete';
  avatarSeed: string; // DiceBear seed
  xp: number;
  level: number;
  badges: string[];
  favorites: string[];
}

const DEFAULT_PROFILE: UserProfile = {
  name: 'Utente',
  age: 30,
  height: 175,
  weight: 70,
  gender: 'male',
  goal: 'fat_loss',
  activityLevel: 'moderate',
  avatarSeed: 'Felix',
  xp: 0,
  level: 1,
  badges: [],
  favorites: []
};

interface UserContextType {
  profile: UserProfile;
  updateProfile: (updates: Partial<UserProfile>) => void;
  addXp: (amount: number) => void;
  unlockBadge: (badgeName: string) => void;
  toggleFavorite: (workoutId: string) => void;
  calculatedMacros: {
    bmr: number;
    tdee: number;
    calories: number;
    protein: number;
    fat: number;
    carbs: number;
    
  };
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('fitmath_user_profile');
    return saved ? JSON.parse(saved) : DEFAULT_PROFILE;
  });

  useEffect(() => {
    localStorage.setItem('fitmath_user_profile', JSON.stringify(profile));
  }, [profile]);

  const updateProfile = (updates: Partial<UserProfile>) => {
    setProfile(prev => ({ ...prev, ...updates }));
  };

  const addXp = (amount: number) => {
    setProfile(prev => {
        const newXp = (prev.xp || 0) + amount;
        const newLevel = Math.floor(newXp / 1000) + 1;
        return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const unlockBadge = (badgeName: string) => {
    setProfile(prev => {
        const currentBadges = prev.badges || [];
        if (currentBadges.includes(badgeName)) return prev;
        return { ...prev, badges: [...currentBadges, badgeName] };
    });
  };

  const toggleFavorite = (workoutId: string) => {
    setProfile(prev => {
        const currentFavorites = prev.favorites || [];
        if (currentFavorites.includes(workoutId)) {
            return { ...prev, favorites: currentFavorites.filter(id => id !== workoutId) };
        } else {
            return { ...prev, favorites: [...currentFavorites, workoutId] };
        }
    });
  };

  // Calculate Macros dynamically based on profile
  const calculateMacros = () => {
    // Mifflin-St Jeor Formula
    const s = profile.gender === 'male' ? 5 : -161;
    const bmr = 10 * profile.weight + 6.25 * profile.height - 5 * profile.age + s;
    
    let activityMultiplier = 1.2;
    switch(profile.activityLevel) {
        case 'sedentary': activityMultiplier = 1.2; break;
        case 'light': activityMultiplier = 1.375; break;
        case 'moderate': activityMultiplier = 1.55; break;
        case 'active': activityMultiplier = 1.725; break;
        case 'athlete': activityMultiplier = 1.9; break;
    }

    const tdee = bmr * activityMultiplier;
    
    let targetCalories = tdee;
    if (profile.goal === 'fat_loss') targetCalories -= 500;
    else if (profile.goal === 'muscle_gain') targetCalories += 300;

    targetCalories = Math.round(targetCalories);

    // Scientific Split
    const protein = Math.round(profile.weight * (profile.goal === 'muscle_gain' ? 2.2 : 2.0));
    const fat = Math.round(profile.weight * 0.9);
    const remainingKcal = targetCalories - (protein * 4) - (fat * 9);
    const carbs = Math.max(50, Math.round(remainingKcal / 4));

    return { bmr: Math.round(bmr), tdee: Math.round(tdee), calories: targetCalories, protein, fat, carbs };
  };

  return (
    <UserContext.Provider value={{ profile, updateProfile, addXp, unlockBadge, toggleFavorite, calculatedMacros: calculateMacros() }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

export const useUserContext = useUser;
