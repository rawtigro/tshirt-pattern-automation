import React from 'react';
import Sidebar from './Sidebar';

export default function Layout({ children, onLogout }: { children: React.ReactNode, onLogout: () => void }) {
  // We mock the state of the sidebar being open to allow margin calculation.
  // In a real app we might put this in a Context. We'll just hardcode the left margin for simplicity,
  // matching the `w-64` (16rem) from Sidebar.tsx when open.
  
  return (
    <div className="min-h-screen font-sans flex text-slate-900 dark:text-slate-100">
      <Sidebar onLogout={onLogout} />
      <main className="flex-1 ml-64 p-4 transition-all duration-300 min-h-screen flex flex-col">
        <div className="flex-1 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/40 dark:border-slate-800 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col">
          {children}
        </div>
      </main>
    </div>
  );
}
