/*'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [createdTasks, setCreatedTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user || !token) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const now = new Date().toISOString();

        const created = res.data.filter((task: any) => task.createdBy?._id === user.sub);
        const assigned = res.data.filter((task: any) => task.assignedTo?._id === user.sub);
        const overdue = assigned.filter(
          (task: any) => task.dueDate < now && task.status !== 'completed'
        );

        setCreatedTasks(created);
        setAssignedTasks(assigned);
        setOverdueTasks(overdue);
      } catch (err) {
        console.error('Error fetching tasks', err);
      }
    };

    fetchTasks();
  }, [user]);

  const TaskList = ({ title, tasks }: { title: string; tasks: any[] }) => (
    <div className="bg-white rounded-xl p-4 shadow-md mb-6">
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-gray-500">No tasks</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task: any) => (
            <li key={task._id} className="border p-2 rounded">
              <p className="font-medium">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <TaskList title="Tasks Assigned to You" tasks={assignedTasks} />
      <TaskList title="Tasks You Created" tasks={createdTasks} />
      <TaskList title="Overdue Tasks" tasks={overdueTasks} />
    </main>
  );
}
*/
/*

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

export default function DashboardPage() {
  const { user } = useAuth();
  const [createdTasks, setCreatedTasks] = useState([]);
  const [assignedTasks, setAssignedTasks] = useState([]);
  const [overdueTasks, setOverdueTasks] = useState([]);
  const [isClient, setIsClient] = useState(false); // Track client rendering

  useEffect(() => {
    setIsClient(true); // Prevents hydration mismatch
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log('User:', user);
    console.log('Token:', token);

    if (!user || !token) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log('Tasks response:', res.data);

        const now = new Date().toISOString();

        const created = res.data.filter((task: any) => {
          console.log('Task createdBy:', task.createdBy);
          return task.createdBy === user.sub || task.createdBy?._id === user.sub;
        });

        const assigned = res.data.filter((task: any) => {
          console.log('Task assignedTo:', task.assignedTo);
          return task.assignedTo === user.sub || task.assignedTo?._id === user.sub;
        });

        const overdue = assigned.filter(
          (task: any) => task.dueDate < now && task.status !== 'completed'
        );

        console.log('Created Tasks:', created);
        console.log('Assigned Tasks:', assigned);
        console.log('Overdue Tasks:', overdue);

        setCreatedTasks(created);
        setAssignedTasks(assigned);
        setOverdueTasks(overdue);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, [user]);

  const TaskList = ({ title, tasks }: { title: string; tasks: any[] }) => (
    <div className="bg-white rounded-xl p-4 shadow-md mb-6">
      <h2 className="text-xl font-semibold text-black mb-2">{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600">No tasks</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task: any) => (
            <li key={task._id} className="border p-2 rounded">
              <p className="text-sm text-gray-1000">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  // ❗ Return nothing until mounted on client to avoid blank screen during SSR
  if (!isClient) return null;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <TaskList title="Tasks Assigned to You" tasks={assignedTasks} />
      <TaskList title="Tasks You Created" tasks={createdTasks} />
      <TaskList title="Overdue Tasks" tasks={overdueTasks} />
    </main>
  );
}
*/

//socket

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

interface Task {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  status: string;
  createdBy: string | { _id?: string };
  assignedTo: string | { _id?: string };
}

export default function DashboardPage() {
  const { user } = useAuth();
  const [createdTasks, setCreatedTasks] = useState<Task[]>([]);
  const [assignedTasks, setAssignedTasks] = useState<Task[]>([]);
  const [overdueTasks, setOverdueTasks] = useState<Task[]>([]);
  const [isClient, setIsClient] = useState(false); // Track client rendering

  useEffect(() => {
    setIsClient(true); // Prevents hydration mismatch
  }, []);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!user?.sub || !token) return;

    const fetchTasks = async () => {
      try {
        const res = await axios.get<Task[]>(`${process.env.NEXT_PUBLIC_API_URL}/tasks`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const now = new Date().toISOString();

        const created = res.data.filter((task) => {
          const createdById = typeof task.createdBy === 'string' ? task.createdBy : task.createdBy?._id;
          return createdById === user.sub;
        });

        const assigned = res.data.filter((task) => {
          const assignedToId = typeof task.assignedTo === 'string' ? task.assignedTo : task.assignedTo?._id;
          return assignedToId === user.sub;
        });

        const overdue = assigned.filter(
          (task) => task.dueDate < now && task.status !== 'completed'
        );

        setCreatedTasks(created);
        setAssignedTasks(assigned);
        setOverdueTasks(overdue);
      } catch (err) {
        console.error('Error fetching tasks:', err);
      }
    };

    fetchTasks();
  }, [user]);

  const TaskList = ({ title, tasks }: { title: string; tasks: Task[] }) => (
    <div className="bg-white rounded-xl p-4 shadow-md mb-6">
      <h2 className="text-xl font-semibold text-black mb-2">{title}</h2>
      {tasks.length === 0 ? (
        <p className="text-sm text-gray-600">No tasks</p>
      ) : (
        <ul className="space-y-2">
          {tasks.map((task) => (
            <li key={task._id} className="border p-2 rounded">
              <p className="text-sm text-gray-900">{task.title}</p>
              <p className="text-sm text-gray-600">{task.description}</p>
              <p className="text-sm text-gray-400">Due: {new Date(task.dueDate).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );

  if (!isClient) return null;

  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <TaskList title="Tasks Assigned to You" tasks={assignedTasks} />
      <TaskList title="Tasks You Created" tasks={createdTasks} />
      <TaskList title="Overdue Tasks" tasks={overdueTasks} />
    </main>
  );
}
