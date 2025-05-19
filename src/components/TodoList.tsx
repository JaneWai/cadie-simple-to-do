import React from 'react';
import TodoItem from './TodoItem';
import { Todo } from '../types/todo';

interface TodoListProps {
  todos: Todo[];
  onToggleComplete: (id: string) => void;
  onDelete: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onToggleComplete, onDelete }) => {
  const activeTodos = todos.filter(todo => !todo.completed);
  const completedTodos = todos.filter(todo => todo.completed);

  if (todos.length === 0) {
    return (
      <div className="text-center py-10 bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No tasks</h3>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Get started by creating a new task.</p>
      </div>
    );
  }

  return (
    <div>
      {activeTodos.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Active Tasks ({activeTodos.length})</h2>
          {activeTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggleComplete={onToggleComplete} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
      
      {completedTodos.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Completed Tasks ({completedTodos.length})</h2>
          {completedTodos.map(todo => (
            <TodoItem 
              key={todo.id} 
              todo={todo} 
              onToggleComplete={onToggleComplete} 
              onDelete={onDelete} 
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TodoList;
