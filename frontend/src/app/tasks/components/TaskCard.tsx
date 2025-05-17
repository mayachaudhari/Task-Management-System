'use client';

import { Task } from '../../../types/task';

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}: {
  task: Task;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <div className="border rounded p-4 shadow flex justify-between items-start bg-white">
      <div>
        <h3 className="font-bold text-lg">{task.title}</h3>
        <p>{task.description}</p>
        <p className="text-sm text-gray-500">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
        <p className="text-sm text-gray-500">Priority: {task.priority}</p>
        <p className="text-sm text-gray-500">Status: {task.status}</p>
      </div>
      <div className="space-x-2">
        <button onClick={onEdit} className="text-blue-600">Edit</button>
        <button onClick={onDelete} className="text-red-600">Delete</button>
      </div>
    </div>
  );
}
