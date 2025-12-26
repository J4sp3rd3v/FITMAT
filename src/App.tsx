import { BrowserRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Home, Dumbbell, Utensils, Settings } from 'lucide-react';
import clsx from 'clsx';
import ReloadPrompt from './components/ReloadPrompt';

// Placeholder Pages
import HomePage from './pages/Home';
import WorkoutsPage from './pages/Workouts';
import DietPage from './pages/Diet';
import SettingsPage from './pages/Settings';

function NavBar() {
  const location = useLocation();
  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/workouts', icon: Dumbbell, label: 'Allenamenti' },
    { path: '/diet', icon: Utensils, label: 'Dieta' },
    { path: '/settings', icon: Settings, label: 'Profilo' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-slate-900/90 backdrop-blur-lg border-t border-slate-800 pb-safe z-50">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={clsx(
                "flex flex-col items-center justify-center w-full h-full transition-colors duration-200",
                isActive ? "text-indigo-500" : "text-slate-400 hover:text-slate-200"
              )}
            >
              <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] mt-1 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ReloadPrompt />
      <div className="min-h-screen bg-slate-950 text-slate-100 pb-20 font-sans selection:bg-indigo-500/30">
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/workouts" element={<WorkoutsPage />} />
          <Route path="/diet" element={<DietPage />} />
          <Route path="/settings" element={<SettingsPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
