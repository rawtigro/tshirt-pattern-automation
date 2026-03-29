import React from 'react';
import { LayoutDashboard, PanelLeftClose, PanelLeft } from 'lucide-react';

export default function Sidebar() {
  const [isOpen, setIsOpen] = React.useState(true);

  return (
    <aside 
      className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ease-in-out border-r border-slate-200 dark:border-slate-800 bg-surface-light dark:bg-surface-dark flex flex-col justify-between 
      ${isOpen ? 'w-64' : 'w-20'}`}
    >
      <div>
        <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
          {isOpen && <span className="font-semibold text-slate-800 dark:text-slate-200">Navigation</span>}
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            {isOpen ? <PanelLeftClose size={20} /> : <PanelLeft size={20} />}
          </button>
        </div>

        <nav className="p-4 space-y-2">
          <a href="#" className="flex items-center gap-3 px-3 py-2.5 rounded-lg bg-primary-50 dark:bg-primary-500/10 text-primary-600 dark:text-primary-500 font-medium transition-colors">
            <LayoutDashboard size={20} />
            {isOpen && <span>Dashboard</span>}
          </a>
        </nav>
      </div>

      <div className={`p-4 border-t border-slate-200 dark:border-slate-800 flex items-center gap-3 transition-opacity duration-300 ${!isOpen && 'justify-center cursor-pointer'}`}>
        <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-300 font-semibold shrink-0">
          P
        </div>
        {isOpen && (
          <div className="flex flex-col overflow-hidden">
            <span className="text-sm font-semibold text-slate-900 dark:text-slate-100 truncate">Prashant Rawat</span>
            <span className="text-xs text-slate-500 dark:text-slate-400 truncate">rawtigro@gmail.com</span>
          </div>
        )}
      </div>
    </aside>
  );
}
