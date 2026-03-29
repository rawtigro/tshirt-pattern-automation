import React, { useState } from 'react';
import Modal from './Modal';
import { useAppContext } from '../context/AppContext';

interface NewBundleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewBundleModal({ isOpen, onClose }: NewBundleModalProps) {
  const { dispatch } = useAppContext();
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    dispatch({
      type: 'ADD_BUNDLE',
      payload: {
        id: Date.now(),
        name,
        patternCount: 0,
        lastUpdated: 'Just now',
      },
    });

    setName('');
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Create New Bundle">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
            Bundle Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Summer 2024 Collection"
            className="w-full px-4 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
            required
          />
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
            className="px-4 py-2 rounded-lg font-medium bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm transition-colors hover:bg-slate-800 dark:hover:bg-slate-100"
          >
            Create Bundle
          </button>
        </div>
      </form>
    </Modal>
  );
}
