'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/tasks">Tasks</Link>
        <Link href="/tasks/create">Create Task</Link>
      </div>
      <div>
        {user ? (
          <>
            <span className="mr-4">{user.email}</span>
            <button onClick={logout} className="bg-red-500 px-4 py-2 rounded">Logout</button>
          </>
        ) : (
          <Link href="/login">Login</Link>
        )}
      </div>
    </nav>
  );
}
