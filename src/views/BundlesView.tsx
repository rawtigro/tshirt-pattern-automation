import { useState } from 'react';
import { Package, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';
import NewBundleModal from '../components/NewBundleModal';

export default function BundlesView() {
  const { state } = useAppContext();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="animate-in fade-in duration-500">
      <div className="flex justify-between items-end mb-8">
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">Pattern Bundles</h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm">Organize patterns into collections for bulk export</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-4 py-2 rounded-lg font-medium shadow-sm transition-colors hover:bg-slate-800 dark:hover:bg-slate-100"
        >
          <Plus size={18} />
          New Bundle
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {state.bundles.map(bundle => {
          // Calculate pattern count based on actual patterns in state
          const count = state.patterns.filter(p => p.bundleIds.includes(bundle.id)).length;
          
          return (
            <motion.div 
              key={bundle.id}
              whileHover={{ y: -4 }}
              className="glass-card rounded-2xl p-6 cursor-pointer group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-blue-50 dark:bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
                  <Package size={24} />
                </div>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {bundle.name}
                </h3>
              </div>
              <div className="flex items-center justify-between mt-6 text-sm">
                <span className="font-medium text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                  {count > 0 ? count : bundle.patternCount} items
                </span>
                <span className="text-slate-500 dark:text-slate-400">
                  {bundle.lastUpdated}
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>

      <NewBundleModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
