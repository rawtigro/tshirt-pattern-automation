import React, { createContext, useContext, useReducer } from 'react';
import type { ReactNode } from 'react';
import type { Theme, Bundle, Pattern } from '../types';

interface AppState {
  themes: Theme[];
  bundles: Bundle[];
  patterns: Pattern[];
}

type Action =
  | { type: 'ADD_THEME'; payload: Theme }
  | { type: 'ADD_BUNDLE'; payload: Bundle }
  | { type: 'TOGGLE_FAVORITE'; payload: string | number }
  | { type: 'ADD_PATTERN_TO_BUNDLE'; payload: { patternId: string | number; bundleId: string | number } };

const initialState: AppState = {
  themes: [
    { id: 1, title: 'Vintage', description: 'Vintage style patterns', colorClass: 'bg-orange-500' },
    { id: 2, title: 'Vintage Graphics', description: 'Retro-style T-shirt patterns', colorClass: 'bg-rose-400' },
    { id: 3, title: 'Test Theme', description: 'Development testing patterns', colorClass: 'bg-blue-600' },
    { id: 4, title: 'Cyberpunk', description: 'Neon aesthetic future patterns', colorClass: 'bg-purple-500' },
    { id: 5, title: 'Nature Elements', description: 'Floral and organic shapes', colorClass: 'bg-emerald-500' },
    { id: 6, title: 'Minimalist', description: 'Clean line-art designs', colorClass: 'bg-slate-800 dark:bg-slate-300' }
  ],
  bundles: [
    { id: 1, name: 'Summer 2024 Collection', patternCount: 24, lastUpdated: '2 days ago' },
    { id: 2, name: 'Vintage Classics', patternCount: 15, lastUpdated: '1 week ago' },
    { id: 3, name: 'Cyberpunk Drop', patternCount: 8, lastUpdated: '3 hours ago' },
  ],
  patterns: [
    { id: 1, title: 'Summer Flora', source: 'Envato Elements', resolution: '4000x4000px', imageUrl: 'https://images.unsplash.com/photo-1555529733-0e67056058e1?q=80&w=400&auto=format&fit=crop', isFavorite: false, bundleIds: [], themeId: 5 },
    { id: 2, title: 'Retro Sunset', source: 'Scraped AI', resolution: '2048x2048px', imageUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=400&auto=format&fit=crop', isFavorite: true, bundleIds: [2], themeId: 2 },
    { id: 3, title: 'Cyber UI', source: 'Midjourney', resolution: '3200x3200px', imageUrl: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=400&auto=format&fit=crop', isFavorite: false, bundleIds: [3], themeId: 4 },
    { id: 4, title: 'Abstract Geometry', source: 'Internal DB', resolution: '5000x5000px', imageUrl: 'https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=400&auto=format&fit=crop', isFavorite: false, bundleIds: [], themeId: 6 },
    { id: 5, title: 'Vintage Tiger', source: 'Pinterest', resolution: '2048x2048px', imageUrl: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=400&auto=format&fit=crop', isFavorite: false, bundleIds: [2], themeId: 1 },
    { id: 6, title: 'Minimal Waves', source: 'Envato Elements', resolution: '4000x4000px', imageUrl: 'https://images.unsplash.com/photo-1550684376-efcbd6e3f031?q=80&w=400&auto=format&fit=crop', isFavorite: true, bundleIds: [1], themeId: 6 },
    { id: 7, title: 'Neon Skull', source: 'Scraped AI', resolution: '2048x2048px', imageUrl: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?q=80&w=400&auto=format&fit=crop', isFavorite: false, bundleIds: [3], themeId: 4 },
    { id: 8, title: 'Anime Aesthetic', source: 'Midjourney', resolution: '3200x3200px', imageUrl: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=400&auto=format&fit=crop', isFavorite: false, bundleIds: [], themeId: 4 },
  ],
};

function appReducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'ADD_THEME':
      return { ...state, themes: [...state.themes, action.payload] };
    case 'ADD_BUNDLE':
      return { ...state, bundles: [...state.bundles, action.payload] };
    case 'TOGGLE_FAVORITE':
      return {
        ...state,
        patterns: state.patterns.map(pattern =>
          pattern.id === action.payload
            ? { ...pattern, isFavorite: !pattern.isFavorite }
            : pattern
        )
      };
    case 'ADD_PATTERN_TO_BUNDLE':
      return {
        ...state,
        patterns: state.patterns.map(pattern =>
          pattern.id === action.payload.patternId && !pattern.bundleIds.includes(action.payload.bundleId)
            ? { ...pattern, bundleIds: [...pattern.bundleIds, action.payload.bundleId] }
            : pattern
        )
      };
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
} | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
