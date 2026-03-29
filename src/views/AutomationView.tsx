import React from 'react';
import { ToggleRight, ToggleLeft, Cloud, Bot, Clock } from 'lucide-react';

export default function AutomationView() {
  const [settings, setSettings] = React.useState({
    scheduleScrape: true,
    aiGeneration: false,
    googleDriveSync: true,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="animate-in fade-in duration-500 max-w-3xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Automation Settings</h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm">Configure background tasks and integrations</p>
      </div>

      <div className="space-y-4">
        {/* Scraper Setting */}
        <div className="glass-card rounded-2xl p-6 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center text-orange-500 shrink-0 mt-1">
              <Clock size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Scheduled Scraper</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-3">
                Automatically search defined sources for new patterns matching your Themes every 24 hours.
              </p>
              <div className="text-xs font-medium px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded inline-block">
                Last run: 4 hours ago
              </div>
            </div>
          </div>
          <button onClick={() => toggleSetting('scheduleScrape')} className="text-blue-600 dark:text-blue-400">
            {settings.scheduleScrape ? <ToggleRight size={36} /> : <ToggleLeft size={36} className="text-slate-300 dark:text-slate-600" />}
          </button>
        </div>

        {/* AI Generator */}
        <div className="glass-card rounded-2xl p-6 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-purple-50 dark:bg-purple-500/10 flex items-center justify-center text-purple-600 dark:text-purple-400 shrink-0 mt-1">
              <Bot size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">AI Pattern Variations</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
                Automatically generate 3 AI variations for every new pattern that is scraped or manually added.
              </p>
            </div>
          </div>
          <button onClick={() => toggleSetting('aiGeneration')} className="text-blue-600 dark:text-blue-400">
            {settings.aiGeneration ? <ToggleRight size={36} /> : <ToggleLeft size={36} className="text-slate-300 dark:text-slate-600" />}
          </button>
        </div>

        {/* Cloud Sync */}
        <div className="glass-card rounded-2xl p-6 flex items-start justify-between">
          <div className="flex gap-4">
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 mt-1">
              <Cloud size={20} />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-lg">Google Drive Sync</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm mt-1 mb-3">
                Automatically upload approved patterns and bundles to your connected Google Drive folder.
              </p>
              <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                Manage Connection
              </button>
            </div>
          </div>
          <button onClick={() => toggleSetting('googleDriveSync')} className="text-blue-600 dark:text-blue-400">
            {settings.googleDriveSync ? <ToggleRight size={36} /> : <ToggleLeft size={36} className="text-slate-300 dark:text-slate-600" />}
          </button>
        </div>
      </div>
    </div>
  );
}
