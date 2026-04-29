import React, { useState, useEffect } from 'react';
import './TodoApp.css';

function TodoApp() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem('kre-todo-tasks');
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('kre-todo-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() === '') return;
    setTasks(prevTasks => [
      ...prevTasks,
      { id: Date.now(), text: newTask.trim(), completed: false }
    ]);
    setNewTask('');
  };

  const handleToggleComplete = (id) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleDeleteTask = (id) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  };

  const remainingTasksCount = tasks.filter(task => !task.completed).length;

  return (
    <div className="todo-app">
      <h1>KRE Todo App</h1>
      <div className="task-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleAddTask()}
          placeholder="Add a new task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className={task.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
            />
            <span>{task.text}</span>
            <button onClick={() => handleDeleteTask(task.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <div className="task-count">
        {remainingTasksCount} tasks remaining
      </div>
    </div>
  );
}

export default TodoApp;