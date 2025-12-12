import React from 'react';
import { Todo } from '../types/todo';
import { Check, Trash2, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { format } from 'date-fns';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ scale: 1.01 }}
      className={cn(
        "group flex items-center gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700/50 transition-all",
        todo.completed && "bg-slate-50/50 dark:bg-slate-800/50"
      )}
    >
      <button
        onClick={() => onToggle(todo.id)}
        className={cn(
          "flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors duration-300",
          todo.completed
            ? "bg-green-500 border-green-500"
            : "border-slate-300 hover:border-indigo-500 dark:border-slate-600"
        )}
      >
        {todo.completed && <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />}
      </button>

      <div className="flex-1 min-w-0">
        <p
          className={cn(
            "text-base font-medium truncate transition-all duration-300",
            todo.completed
              ? "text-slate-400 line-through decoration-slate-400/50"
              : "text-slate-700 dark:text-slate-200"
          )}
        >
          {todo.text}
        </p>
        <div className="flex items-center gap-2 mt-1">
          <Calendar className="w-3 h-3 text-slate-400" />
          <span className="text-xs text-slate-400">
            {format(todo.createdAt, 'MMM d, h:mm a')}
          </span>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.1, color: "#ef4444" }}
        whileTap={{ scale: 0.9 }}
        onClick={() => onDelete(todo.id)}
        className="opacity-0 group-hover:opacity-100 p-2 text-slate-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-all"
        aria-label="Delete todo"
      >
        <Trash2 className="w-4 h-4" />
      </motion.button>
    </motion.div>
  );
}
