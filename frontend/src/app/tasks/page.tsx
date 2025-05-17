/*
'use client';

import { useEffect, useState } from 'react';
import axios from '@/lib/api';  // Assuming you configured axios baseURL there
import TaskCard from '@/app/tasks/components/TaskCard';
import TaskForm from '@/app/tasks/components/TaskForm';
import { Task } from '@/types/task';

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // Fetch tasks from the server
  const fetchTasks = async () => {
    try {
      const res = await axios.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // Handle create new task
  const handleCreate = async (task: Task) => {
    try {
      await axios.post('/tasks', task);
      fetchTasks();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  // Handle update task
  const handleUpdate = async (task: Task) => {
    try {
      await axios.put(`/tasks/${task._id}`, task);
      fetchTasks();
      setEditingTask(null);
      setShowForm(false);
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  // Handle delete task
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Filter tasks by title (case-insensitive)
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search tasks"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border p-2 rounded w-full mr-2"
        />
        <button
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>

      {showForm && (
        <TaskForm
          task={editingTask}
          onCancel={() => {
            setShowForm(false);
            setEditingTask(null);
          }}
          onSave={editingTask ? handleUpdate : handleCreate}
        />
      )}

      <div className="grid gap-4">
        {filteredTasks.length === 0 ? (
          <p className="text-center text-gray-500">No tasks found.</p>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task._id}
              task={task}
              onEdit={() => {
                setEditingTask(task);
                setShowForm(true);
              }}
              onDelete={() => handleDelete(task._id!)}

            />
          ))
        )}
      </div>
    </main>
  );
}
*/



'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';

interface Task {
  _id: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  dueDate?: string;
  assignedTo?: string;
}

const initialForm = {
  title: '',
  description: '',
  priority: 'Low',
  status: 'Todo',
  dueDate: '',
};

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskForm, setTaskForm] = useState(initialForm);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [filter, setFilter] = useState('');
  const [showForm, setShowForm] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await api.get('/tasks');
      setTasks(res.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setTaskForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingTaskId) {
        await api.put(`/tasks/${editingTaskId}`, taskForm);
      } else {
        await api.post('/tasks', taskForm);
      }
      fetchTasks();
      setTaskForm(initialForm);
      setEditingTaskId(null);
      setShowForm(false);
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleEdit = (task: Task) => {
    setTaskForm({
      title: task.title,
      description: task.description,
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate?.slice(0, 10) || '',
    });
    setEditingTaskId(task._id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(filter.toLowerCase()) ||
    task.description.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>

      {!showForm && (
        <button
          onClick={() => {
            setShowForm(true);
            setTaskForm(initialForm);
            setEditingTaskId(null);
          }}
          className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} className="space-y-4 mb-6 border p-4 rounded shadow">
          <label className="block">
            <span className="block text-sm font-medium">Title</span>
            <input
              type="text"
              name="title"
              value={taskForm.title}
              onChange={handleChange}
              required
              className="border p-2 w-full"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium">Description</span>
            <textarea
              name="description"
              value={taskForm.description}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </label>

          <label className="block">
            <span className="block text-sm font-medium">Due Date</span>
            <input
              type="date"
              name="dueDate"
              value={taskForm.dueDate}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </label>

          <div className="flex gap-4">
            <label className="block flex-1">
              <span className="block text-sm font-medium">Priority</span>
              <select
                name="priority"
                value={taskForm.priority}
                onChange={handleChange}
                className="border p-2 w-full"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>

            <label className="block flex-1">
              <span className="block text-sm font-medium">Status</span>
              <select
                name="status"
                value={taskForm.status}
                onChange={handleChange}
                className="border p-2 w-full"
              >
                <option value="Todo">Todo</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </label>
          </div>

          <div className="flex gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Save
            </button>
            <button
              type="button"
              onClick={() => {
                setShowForm(false);
                setEditingTaskId(null);
                setTaskForm(initialForm);
              }}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <label className="block mb-4">
        <span className="block text-sm font-medium">Search</span>
        <input
          type="text"
          placeholder="Search tasks"
          value={filter}
          onChange={e => setFilter(e.target.value)}
          className="border p-2 w-full"
        />
      </label>

      <ul className="space-y-4">
        {filteredTasks.map(task => (
          <li key={task._id} className="border p-4 rounded shadow-sm">
            <h2 className="font-semibold text-lg">{task.title}</h2>
            <p>{task.description}</p>
            <p className="text-sm text-gray-600">
              Priority: {task.priority} | Status: {task.status}
            </p>
            {task.dueDate && (
              <p className="text-sm text-gray-600">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            )}
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => handleEdit(task)}
                className="bg-yellow-500 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(task._id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
