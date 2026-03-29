import { useState } from 'react';
import { Plus } from 'lucide-react';
import ThemeCard from '../components/ThemeCard';
import { useAppContext } from '../context/AppContext';
import NewThemeModal from '../components/NewThemeModal';

export default function ThemesView() {
  const { state } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Pattern Themes</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Create and manage your pattern categories</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors"
        >
          <Plus size={18} />
          New Theme
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.themes.map(theme => (
          <ThemeCard 
            key={theme.id}
            title={theme.title}
            description={theme.description}
            colorClass={theme.colorClass}
          />
        ))}
      </div>

      <NewThemeModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
}
