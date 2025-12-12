import React from 'react';
import { FilterType } from '../types/todo';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

interface FilterTabsProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
}

export function FilterTabs({ currentFilter, onFilterChange }: FilterTabsProps) {
  const filters: FilterType[] = ['all', 'active', 'completed'];

  return (
    <div className="flex p-1 space-x-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
      {filters.map((filter) => (
        <button
          key={filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            "relative flex-1 px-4 py-2 text-sm font-medium transition-colors rounded-lg capitalize",
            currentFilter === filter
              ? "text-slate-900 dark:text-white"
              : "text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
          )}
        >
          {currentFilter === filter && (
            <motion.div
              layoutId="active-pill"
              className="absolute inset-0 bg-white dark:bg-slate-700 shadow-sm rounded-lg"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <span className="relative z-10">{filter}</span>
        </button>
      ))}
    </div>
  );
}
