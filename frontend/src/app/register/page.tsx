'use client'
import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const [form, setForm] = useState({ username: '', email: '', password: '' })
  const router = useRouter()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, form)
    router.push('/login')
  }

  return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" name="username" placeholder="Username" onChange={handleChange} className="w-full p-2 border" />
        <input type="email" name="email" placeholder="Email" onChange={handleChange} className="w-full p-2 border" />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} className="w-full p-2 border" />
        <button type="submit" className="w-full bg-blue-600 text-white p-2">Register</button>
      </form>
    </main>
  )
}
