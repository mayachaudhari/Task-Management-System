/*'use client';

import { useState } from 'react';
import { Task } from '../../../types/task'; // Adjust path if needed

export default function TaskForm({
  task,
  onCancel,
  onSave,
}: {
  task?: Task | null;
  onCancel: () => void;
  onSave: (task: Task) => void;
}) {
  const [form, setForm] = useState<Task>({
    _id: task?._id || '',
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'medium',
    status: task?.status || 'pending',
    assignedTo: task?.assignedTo || '',
    createdBy: task?.createdBy || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded bg-gray-50 mb-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Title</span>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter task description"
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Due Date</span>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Priority</span>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Status</span>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <div className="flex justify-between pt-4">
        <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
          Save
        </button>
        <button type="button" onClick={onCancel} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
          Cancel
        </button>
      </div>
    </form>
  );
}
*/


'use client';

import { useState } from 'react';
import { Task } from '../../../types/task'; // Adjust path if needed

export default function TaskForm({
  task,
  onCancel,
  onSave,
  loading = false,
}: {
  task?: Task | null;
  onCancel: () => void;
  onSave: (task: Task) => void;
  loading?: boolean;
}) {
  const [form, setForm] = useState<Task>({
    _id: task?._id || '',
    title: task?.title || '',
    description: task?.description || '',
    dueDate: task?.dueDate || '',
    priority: task?.priority || 'medium',
    status: task?.status || 'pending',
    assignedTo: task?.assignedTo || '',
    createdBy: task?.createdBy || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 border p-4 rounded bg-gray-50 mb-4">
      <label className="block">
        <span className="text-sm font-medium text-gray-700">Title</span>
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Enter task title"
          className="w-full p-2 border rounded mt-1"
          required
          disabled={loading}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Description</span>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Enter task description"
          className="w-full p-2 border rounded mt-1"
          required
          disabled={loading}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Due Date</span>
        <input
          type="date"
          name="dueDate"
          value={form.dueDate}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
          disabled={loading}
        />
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Priority</span>
        <select
          name="priority"
          value={form.priority}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
          disabled={loading}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </label>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Status</span>
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="w-full p-2 border rounded mt-1"
          required
          disabled={loading}
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </label>

      <div className="flex justify-between pt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:opacity-50"
          disabled={loading}
        >
          Save
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 disabled:opacity-50"
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
