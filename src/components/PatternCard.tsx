import React from 'react';
import { Download, Heart, FolderPlus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppContext } from '../context/AppContext';

interface PatternCardProps {
  id: string | number;
  title: string;
  source: string;
  resolution: string;
  imageUrl: string;
  isFavorite?: boolean;
}

export default function PatternCard({ id, title, source, resolution, imageUrl, isFavorite = false }: PatternCardProps) {
  const { dispatch } = useAppContext();

  const handleFavoriteClick = () => {
    dispatch({ type: 'TOGGLE_FAVORITE', payload: id });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="group relative overflow-hidden rounded-2xl glass-card border border-slate-200 dark:border-slate-800"
    >
      <div className="aspect-[4/5] bg-slate-100 dark:bg-slate-800 relative">
        {/* Placeholder for image since we don't have actual generated images */}
        <div className="absolute inset-0 flex items-center justify-center opacity-50 bg-gradient-to-br from-blue-100 to-indigo-50 dark:from-slate-800 dark:to-slate-900">
          <img src={imageUrl} alt={title} className="w-full h-full object-cover mix-blend-multiply dark:mix-blend-screen opacity-60" />
        </div>
        
        {/* Hover overlay */}
        <div className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 backdrop-blur-[2px]">
          <div className="flex justify-end gap-2">
            <button 
              onClick={handleFavoriteClick}
              className={`p-2 rounded-full transition-colors tooltip ${isFavorite ? 'bg-rose-500 text-white hover:bg-rose-600' : 'bg-white/20 text-white hover:bg-white hover:text-rose-500'}`} 
              title={isFavorite ? 'Remove Favorite' : 'Favorite'}
            >
              <Heart size={18} className={isFavorite ? 'fill-current' : ''} />
            </button>
            <button className="p-2 rounded-full bg-white/20 hover:bg-white text-white hover:text-blue-600 transition-colors" title="Add to bundle">
              <FolderPlus size={18} />
            </button>
          </div>
          
          <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white text-slate-900 font-semibold hover:bg-blue-50 transition-colors">
            <Download size={18} />
            Download High-Res
          </button>
        </div>
      </div>
      
      <div className="p-4 bg-white dark:bg-slate-900">
        <h4 className="font-semibold text-slate-900 dark:text-white truncate">{title}</h4>
        <div className="flex items-center justify-between mt-1 text-xs text-slate-500 dark:text-slate-400">
          <span>{source}</span>
          <span>{resolution}</span>
        </div>
      </div>
    </motion.div>
  );
}
