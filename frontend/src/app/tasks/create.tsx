// src/app/tasks/create.tsx

'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import TaskForm from './components/TaskForm';
import axios from 'axios';

export default function CreateTaskPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSave(task: any) {
    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, task, {
        headers: { Authorization: `Bearer ${token}` },
      });
      router.push('/tasks');
    } catch (err) {
      console.error('Failed to create task', err);
    } finally {
      setLoading(false);
    }
  }

  function handleCancel() {
    router.push('/tasks');
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Create Task</h1>
      <TaskForm onSave={handleSave} onCancel={handleCancel} loading={loading} />
    </main>
  );
}
