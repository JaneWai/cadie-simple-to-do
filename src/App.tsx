import React, { useState, useEffect } from 'react';
import TodoForm from './components/TodoForm';
import TodoList from './components/TodoList';
import { Todo } from './types/todo';

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      try {
        return JSON.parse(savedTodos);
      } catch (e) {
        console.error('Error parsing saved todos:', e);
        return [];
      }
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string, description: string, targetDate: string) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title,
      description,
      targetDate,
      completed: false,
      createdAt: new Date(),
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id: string) => {
    setTodos(
      todos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My To-Do List</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Keep track of your daily tasks and stay organized
          </p>
        </header>

        <main>
          <TodoForm onAddTodo={addTodo} />
          
          <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Your Tasks</h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {todos.filter(t => t.completed).length} of {todos.length} completed
              </div>
            </div>
            
            <TodoList 
              todos={todos} 
              onToggleComplete={toggleComplete} 
              onDelete={deleteTodo} 
            />
          </div>
        </main>
        
        <footer className="mt-12 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>Your tasks are saved locally in your browser.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;
