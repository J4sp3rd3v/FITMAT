import { motion } from 'framer-motion';
import { Bell, Shield, Moon, ChevronRight, LogOut, Edit2, Save, X, RefreshCw, Target, Droplets, Scale } from 'lucide-react';
import { useState } from 'react';
import { useUser, UserProfile } from '../context/UserContext';
import { useUserStorage } from '../utils/userStorage';

interface SettingItemProps {
    icon: React.ElementType;
    title: string;
    value?: boolean;
    toggle?: boolean;
    onClick?: () => void;
    rightElement?: React.ReactNode;
}

const SettingItem = ({ icon: Icon, title, value, toggle, onClick, rightElement }: SettingItemProps) => (
  <div onClick={onClick} className={`flex items-center justify-between p-4 bg-slate-800/50 border border-slate-700/50 rounded-xl mb-3 ${onClick ? 'cursor-pointer hover:bg-slate-800 transition-colors' : ''}`}>
    <div className="flex items-center gap-3">
      <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-slate-300">
        <Icon size={16} />
      </div>
      <span className="text-slate-200 font-medium">{title}</span>
    </div>
    {rightElement ? rightElement : (
        toggle ? (
           <div className={`w-11 h-6 rounded-full p-1 transition-colors ${value ? 'bg-indigo-600' : 'bg-slate-600'}`}>
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${value ? 'translate-x-5' : 'translate-x-0'}`} />
           </div>
        ) : (
          <ChevronRight size={18} className="text-slate-500" />
        )
    )}
  </div>
);

const SectionHeader = ({ title }: { title: string }) => (
    <h3 className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-4 ml-1 mt-8">{title}</h3>
);

export default function Settings() {
  const { profile, updateProfile } = useUser();
  const { settings, updateSettings } = useUserStorage();
  const [notifications] = useState(true);
  const [darkMode] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  
  // Use a flexible type for the form to handle input strings (prevents "0" sticking issue)
  const [editForm, setEditForm] = useState<Omit<UserProfile, 'age' | 'height' | 'weight'> & {
    age: string | number;
    height: string | number;
    weight: string | number;
    targetWeight: string | number;
  }>({ ...profile, targetWeight: settings.targetWeight });

  const handleSave = () => {
    // Convert back to numbers on save
    const updatedProfile = {
      ...editForm,
      age: parseInt(String(editForm.age)) || 0,
      height: parseInt(String(editForm.height)) || 0,
      weight: parseFloat(String(editForm.weight)) || 0
    };
    
    // Update Context Profile
    updateProfile(updatedProfile);
    
    // Update Storage Settings (Target Weight)
    updateSettings({
        ...settings,
        targetWeight: parseFloat(String(editForm.targetWeight)) || settings.targetWeight,
        height: updatedProfile.height, // Sync height
        name: updatedProfile.name // Sync name
    });

    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditForm({ ...profile, targetWeight: settings.targetWeight });
    setIsEditing(false);
  };



  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 pb-24"
    >
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-white">Impostazioni</h1>
        {isEditing && (
            <div className="flex gap-2">
                <button onClick={handleCancel} className="p-2 bg-slate-800 rounded-full text-slate-400 hover:text-white border border-slate-700">
                    <X size={20} />
                </button>
                <button onClick={handleSave} className="p-2 bg-indigo-600 rounded-full text-white shadow-lg shadow-indigo-900/50">
                    <Save size={20} />
                </button>
            </div>
        )}
      </div>

      {/* Profile Card - Enhanced */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        {!isEditing ? (
            <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-slate-700 overflow-hidden border-2 border-indigo-500 shadow-lg shadow-indigo-900/30">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.avatarSeed}`} alt="Profile" />
                </div>
                <div className="flex-1">
                    <h2 className="text-xl font-bold text-white">{profile.name}</h2>
                    <p className="text-slate-400 text-sm mb-1">{profile.age} anni • {profile.height}cm</p>
                    <div className="flex gap-2 mt-2">
                         <span className="inline-block px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-wider border border-indigo-500/20">
                            {profile.goal === 'fat_loss' ? 'Perdita Grasso' : profile.goal === 'muscle_gain' ? 'Ipertrofia' : 'Mantenimento'}
                        </span>
                    </div>
                </div>
                <button 
                    onClick={() => { setEditForm({ ...profile, targetWeight: settings.targetWeight }); setIsEditing(true); }}
                    className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-slate-400 border border-slate-700 hover:text-white hover:bg-slate-700 transition-colors"
                >
                    <Edit2 size={18} />
                </button>
            </div>
        ) : (
            <div className="space-y-4">
                <div className="flex justify-center mb-6">
                    <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-slate-700 overflow-hidden border-2 border-indigo-500/50">
                            <img 
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${editForm.avatarSeed}`}
                                alt="Avatar"
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <button 
                            onClick={() => {
                                const seeds = ['Felix', 'Aneka', 'Zack', 'Midnight', 'Luna', 'Shadow', 'Bella', 'Max', 'Charlie', 'Daisy'];
                                const randomSeed = seeds[Math.floor(Math.random() * seeds.length)];
                                setEditForm(prev => ({ ...prev, avatarSeed: randomSeed }));
                            }}
                            className="absolute bottom-0 right-0 w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white border-2 border-slate-800 shadow-lg"
                        >
                            <RefreshCw size={14} />
                        </button>
                    </div>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="text-xs text-slate-400 mb-1 block">Nome</label>
                        <input 
                            type="text" 
                            value={editForm.name}
                            onChange={e => setEditForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 mb-1 block">Età</label>
                            <input 
                                type="number" 
                                value={editForm.age}
                                onChange={e => setEditForm(prev => ({ ...prev, age: e.target.value }))}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                            <label className="text-xs text-slate-400 mb-1 block">Sesso</label>
                            <select 
                                value={editForm.gender}
                                onChange={e => setEditForm(prev => ({ ...prev, gender: e.target.value as 'male' | 'female' }))}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                            >
                                <option value="male">Uomo</option>
                                <option value="female">Donna</option>
                            </select>
                        </div>
                    </div>
                    
                     <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs text-slate-400 mb-1 block">Altezza (cm)</label>
                            <input 
                                type="number" 
                                value={editForm.height}
                                onChange={e => setEditForm(prev => ({ ...prev, height: e.target.value }))}
                                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                            />
                        </div>
                        <div>
                             <label className="text-xs text-slate-400 mb-1 block">Obiettivo</label>
                             <select 
                                 value={editForm.goal}
                                 onChange={e => setEditForm(prev => ({ ...prev, goal: e.target.value as 'fat_loss' | 'muscle_gain' | 'maintenance' }))}
                                 className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                             >
                                 <option value="fat_loss">Dimagrimento</option>
                                 <option value="muscle_gain">Ipertrofia</option>
                                 <option value="maintenance">Mantenimento</option>
                             </select>
                         </div>
                    </div>
                </div>
            </div>
        )}
      </div>

      {/* Biofeedback & Metrics Section - Integrated */}
      <SectionHeader title="Biofeedback & Obiettivi" />
      <div className="space-y-2">
         {isEditing ? (
             <div className="grid grid-cols-2 gap-4 mb-2">
                 <div>
                    <label className="text-xs text-slate-400 mb-1 block">Peso Attuale (kg)</label>
                    <input 
                        type="number" 
                        value={editForm.weight}
                        onChange={e => setEditForm(prev => ({ ...prev, weight: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    />
                 </div>
                 <div>
                    <label className="text-xs text-slate-400 mb-1 block">Peso Target (kg)</label>
                    <input 
                        type="number" 
                        value={editForm.targetWeight}
                        onChange={e => setEditForm(prev => ({ ...prev, targetWeight: e.target.value }))}
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-indigo-500"
                    />
                 </div>
             </div>
         ) : (
            <>
                <SettingItem 
                    icon={Scale} 
                    title="Peso Attuale" 
                    rightElement={<span className="text-white font-bold">{profile.weight} kg</span>}
                />
                 <SettingItem 
                    icon={Target} 
                    title="Peso Target" 
                    rightElement={<span className="text-white font-bold">{settings.targetWeight} kg</span>}
                />
            </>
         )}
         
         <SettingItem 
            icon={Droplets} 
            title="Obiettivo Acqua" 
            rightElement={<span className="text-slate-400 text-sm">~{Math.round(profile.weight * 35)} ml/die</span>}
            onClick={() => {}} // Could open water info
         />
      </div>


      {/* App Preferences */}
      <SectionHeader title="Preferenze App" />
      <SettingItem icon={Bell} title="Notifiche Push" toggle value={notifications} />
      <SettingItem icon={Moon} title="Modo Scuro" toggle value={darkMode} />

      {/* Support */}
      <SectionHeader title="Altro" />
      <SettingItem icon={Shield} title="Privacy & Sicurezza" />

      <button className="w-full mt-8 py-4 flex items-center justify-center gap-2 text-red-400 font-medium bg-red-500/10 rounded-xl hover:bg-red-500/20 transition-colors">
        <LogOut size={18} />
        Esci
      </button>

      <div className="mt-8 text-center">
        <p className="text-[10px] text-slate-600 font-mono">
              v2.4.0 (Build {new Date().toLocaleDateString()})
          </p>
      </div>
    </motion.div>
  );
}
