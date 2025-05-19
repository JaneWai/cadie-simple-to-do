import React from 'react';
import { format } from 'date-fns';
import { Todo } from '../types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onToggleComplete, onDelete }) => {
  const formattedDate = format(new Date(todo.targetDate), 'MMM dd, yyyy');
  
  return (
    <div className={`p-4 mb-4 rounded-lg shadow-md transition-all duration-300 ${todo.completed ? 'bg-green-50 dark:bg-green-900/20' : 'bg-white dark:bg-gray-800'}`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => onToggleComplete(todo.id)}
            className="mt-1 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
          />
          <div className="flex-1">
            <h3 className={`text-lg font-medium ${todo.completed ? 'line-through text-gray-500 dark:text-gray-400' : 'text-gray-900 dark:text-white'}`}>
              {todo.title}
            </h3>
            <p className={`mt-1 text-sm ${todo.completed ? 'line-through text-gray-400 dark:text-gray-500' : 'text-gray-600 dark:text-gray-300'}`}>
              {todo.description}
            </p>
            <div className="mt-2 flex items-center text-sm text-gray-500 dark:text-gray-400">
              <svg className="mr-1.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>Due: {formattedDate}</span>
            </div>
          </div>
        </div>
        <button
          onClick={() => onDelete(todo.id)}
          className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
