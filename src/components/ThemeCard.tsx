
import { motion } from 'framer-motion';

interface ThemeCardProps {
  title: string;
  description: string;
  colorClass: string;
}

export default function ThemeCard({ title, description, colorClass }: ThemeCardProps) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-6 cursor-pointer group"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className={`w-6 h-6 rounded-md shadow-inner ${colorClass}`} />
        <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
      </div>
      <p className="text-slate-500 dark:text-slate-400 text-sm">
        {description}
      </p>
    </motion.div>
  );
}
