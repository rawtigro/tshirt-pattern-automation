
import { Settings, Image, Package, Zap } from 'lucide-react';

export type TabId = 'themes' | 'patterns' | 'bundles' | 'automation';

interface TabNavProps {
  activeTab: TabId;
  setActiveTab: (tab: TabId) => void;
}

export default function TabNav({ activeTab, setActiveTab }: TabNavProps) {
  const tabs = [
    { id: 'themes', label: 'Themes', icon: Settings },
    { id: 'patterns', label: 'Patterns', icon: Image },
    { id: 'bundles', label: 'Bundles', icon: Package },
    { id: 'automation', label: 'Automation', icon: Zap },
  ] as const;

  return (
    <div className="px-8 mb-6">
      <div className="flex bg-slate-100 dark:bg-slate-800/50 p-1 rounded-xl w-full">
        {tabs.map(tab => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${
                isActive 
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm' 
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-white/50 dark:hover:bg-slate-800'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
