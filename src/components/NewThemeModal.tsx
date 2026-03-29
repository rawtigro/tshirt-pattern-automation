import React, { useState } from 'react';
import Modal from './Modal';
import { useAppContext } from '../context/AppContext';

interface NewThemeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const colorOptions = [
  'bg-slate-800 dark:bg-slate-300',
  'bg-red-500',
  'bg-orange-500',
  'bg-amber-500',
  'bg-emerald-500',
  'bg-teal-500',
  'bg-cyan-500',
  'bg-blue-600',
  'bg-indigo-500',
  'bg-purple-500',
  'bg-fuchsia-500',
  'bg-rose-400',
];

export default function NewThemeModal({ isOpen, onClose }: NewThemeModalProps) {
  const { dispatch } = useAppContext();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [colorClass, setColorClass] = useState(colorOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    dispatch({
      type: 'ADD_THEME',
      payload: {
        id: Date.now(),
        title,
        description,
        colorClass,
      },
    });

    setTitle('');
    setDescription('');
    setColorClass(colorOptions[0]);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Theme">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Theme Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g., Cyberpunk 2077"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Description
          </label>
          <input
            id="description"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Brief description of the theme pattern style"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
        </div>

        <div>
           <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
            Theme Color
          </label>
          <div className="grid grid-cols-6 gap-2">
             {colorOptions.map((color) => (
               <button
                 key={color}
                 type="button"
                 onClick={() => setColorClass(color)}
                 className={`w-10 h-10 rounded-full transition-transform ${color} ${colorClass === color ? 'ring-2 ring-offset-2 ring-blue-500 dark:ring-offset-slate-900 scale-110' : 'hover:scale-110'}`}
               />
             ))}
          </div>
        </div>

        <div className="pt-4 flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 rounded-lg font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-medium bg-blue-600 hover:bg-blue-700 text-white shadow-sm transition-colors"
          >
            Create Theme
          </button>
        </div>
      </form>
    </Modal>
  );
}
