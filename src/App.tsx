import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, ListTodo } from 'lucide-react';
import { Todo, FilterType } from './types/todo';
import { AddTodo } from './components/AddTodo';
import { TodoItem } from './components/TodoItem';
import { FilterTabs } from './components/FilterTabs';

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem('todos');
    if (saved) {
      return JSON.parse(saved);
    }
    return [
      { id: '1', text: 'Welcome to your new Todo App! 👋', completed: false, createdAt: Date.now() },
      { id: '2', text: 'Try adding a new task above', completed: true, createdAt: Date.now() - 100000 },
    ];
  });
  
  const [filter, setFilter] = useState<FilterType>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text: string) => {
    const newTodo: Todo = {
      id: uuidv4(),
      text,
      completed: false,
      createdAt: Date.now(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter(t => !t.completed).length;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      {/* Background decoration */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-indigo-400/10 blur-3xl" />
        <div className="absolute top-[20%] -right-[10%] w-[40%] h-[40%] rounded-full bg-purple-400/10 blur-3xl" />
      </div>

      <div className="relative max-w-2xl mx-auto px-4 py-12 sm:py-20">
        {/* Header */}
        <div className="mb-8 text-center space-y-2">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="inline-flex items-center justify-center p-3 bg-white dark:bg-slate-800 rounded-2xl shadow-sm mb-4"
          >
            <CheckCircle2 className="w-8 h-8 text-indigo-500" />
          </motion.div>
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Task Master
          </h1>
          <p className="text-slate-500 dark:text-slate-400">
            You have <span className="font-semibold text-indigo-500">{activeCount}</span> active tasks remaining
          </p>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          <AddTodo onAdd={addTodo} />
          
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <FilterTabs currentFilter={filter} onFilterChange={setFilter} />
            <span className="text-xs text-slate-400 font-medium px-2">
              {filteredTodos.length} tasks
            </span>
          </div>

          <motion.div layout className="space-y-3">
            <AnimatePresence mode="popLayout">
              {filteredTodos.length > 0 ? (
                filteredTodos.map(todo => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    onToggle={toggleTodo}
                    onDelete={deleteTodo}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <ListTodo className="w-8 h-8 text-slate-400" />
                  </div>
                  <h3 className="text-lg font-medium text-slate-900 dark:text-white">
                    No tasks found
                  </h3>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs mx-auto mt-1">
                    {filter === 'all' 
                      ? "You're all caught up! Add a new task to get started." 
                      : `No ${filter} tasks at the moment.`}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default App;
