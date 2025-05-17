'use client';
import { useState } from 'react';

export default function TaskFilters({ onFilter }: { onFilter: (filters: any) => void }) {
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');

  const handleFilter = () => {
    onFilter({ status, priority });
  };

  return (
    <div className="flex gap-4 mb-4">
      <div>
        <label htmlFor="status-select" className="sr-only">Filter by status</label>
        <select
          id="status-select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2"
        >
          <option value="">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div>
        <label htmlFor="priority-select" className="sr-only">Filter by priority</label>
        <select
          id="priority-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="border p-2"
        >
          <option value="">All Priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button
        onClick={handleFilter}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Filter
      </button>
    </div>
  );
}
