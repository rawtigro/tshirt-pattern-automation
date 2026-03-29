import React from 'react';
import { Moon, Sun, Zap } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [autoEnabled, setAutoEnabled] = React.useState(true);

  return (
    <header className="px-8 py-6 flex justify-between items-start">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-1 tracking-tight">
          T-Shirt Pattern Automation
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your pattern themes, collections, and automation settings
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button 
          onClick={() => setAutoEnabled(!autoEnabled)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium border transition-all ${
            autoEnabled 
              ? 'border-emerald-200 bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/30 dark:text-emerald-400 shadow-sm' 
              : 'border-slate-200 bg-white text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300'
          }`}
        >
          <Zap size={18} className={autoEnabled ? "fill-emerald-500/20" : ""} />
          Auto {autoEnabled ? 'ON' : 'OFF'}
        </button>
        
        <button 
          onClick={toggleTheme}
          className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
        >
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
    </header>
  );
}
