import React, { useState } from 'react';
import PatternCard from '../components/PatternCard';
import { useAppContext } from '../context/AppContext';

export default function PatternsView() {
  const { state } = useAppContext();
  const [selectedThemeId, setSelectedThemeId] = useState<string>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Filter patterns
  const filteredPatterns = state.patterns.filter(pattern => {
    const matchesTheme = selectedThemeId === 'all' || pattern.themeId?.toString() === selectedThemeId;
    const matchesFavorites = showFavoritesOnly ? pattern.isFavorite : true;
    return matchesTheme && matchesFavorites;
  });

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Pattern Gallery</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">View and manage your scraped patterns</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <select 
              value={selectedThemeId}
              onChange={(e) => setSelectedThemeId(e.target.value)}
              className="appearance-none pl-4 pr-10 py-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/50 dark:text-slate-200 font-medium"
            >
              <option value="all">All Themes</option>
              {state.themes.map(theme => (
                <option key={theme.id} value={theme.id.toString()}>{theme.title}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl w-full mb-6">
        <button 
          onClick={() => setShowFavoritesOnly(false)}
          className={`flex-1 py-1.5 px-4 rounded-lg text-sm font-medium transition-colors ${!showFavoritesOnly ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
        >
          All Patterns
        </button>
        <button 
          onClick={() => setShowFavoritesOnly(true)}
          className={`flex-1 py-1.5 px-4 rounded-lg text-sm font-medium transition-colors ${showFavoritesOnly ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'}`}
        >
          Favorites
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredPatterns.map(pattern => (
          <PatternCard 
            key={pattern.id}
            id={pattern.id}
            title={pattern.title}
            source={pattern.source}
            resolution={pattern.resolution}
            imageUrl={pattern.imageUrl}
            isFavorite={pattern.isFavorite}
          />
        ))}
        {filteredPatterns.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500 dark:text-slate-400">
            No patterns match your filters.
          </div>
        )}
      </div>
    </div>
  );
}
