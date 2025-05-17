// src/app/tasks/[id]/edit.tsx

'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import TaskForm from '../components/TaskForm';
import axios from 'axios';

export default function EditTaskPage() {
  const router = useRouter();
  const pathname = usePathname();
  const [taskData, setTaskData] = useState(null);
  const [loading, setLoading] = useState(false);

  const taskId = pathname.split('/').pop();

  useEffect(() => {
    async function fetchTask() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTaskData(res.data);
      } catch (err) {
        console.error('Failed to fetch task', err);
      }
    }
    if (taskId) fetchTask();
  }, [taskId]);

  async function handleSave(updatedTask: any) {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.put(`${process.env.NEXT_PUBLIC_API_URL}/tasks/${taskId}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/tasks');
    } catch (err) {
      console.error('Failed to update task', err);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.push('/tasks');
  }

  if (!taskData) {
    return <p className="p-8 max-w-md mx-auto">Loading task data...</p>;
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit Task</h1>
      <TaskForm task={taskData} onSave={handleSave} onCancel={handleCancel} loading={loading} />
    </main>
  );
}
