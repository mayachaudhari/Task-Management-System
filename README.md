# Task Management System

A feature-rich Task Management System built for small teams to efficiently create, assign, track, and manage tasks. This project demonstrates strong skills in full-stack development, security, real-time features, and user experience.

---

## 📝 Table of Contents

- [Project Overview](#project-overview)  
- [Features](#features)  
- [Tech Stack](#tech-stack)  
- [Setup Instructions](#setup-instructions)  
- [Approach & Architecture](#approach--architecture)  
- [Assumptions & Trade-offs](#assumptions--trade-offs)  
- [Advanced Features (Optional)](#advanced-features-optional)  
- [AI Usage Disclosure](#ai-usage-disclosure)  
- [Deployment](#deployment)  
- [License](#license)  

---

## Project Overview

This Task Management System allows team members to:

- Register, login securely, and manage sessions
- Create, update, delete tasks with details like title, description, due date, priority, and status
- Assign tasks to other registered users for collaboration
- Receive notifications when tasks are assigned
- View a personalized dashboard with tasks they created, assigned, and overdue tasks
- Search and filter tasks by various attributes for better task management

---

## Features

### Core Features

- **User Authentication:**  
  Secure registration and login with hashed passwords and JWT-based session management.

- **Task CRUD:**  
  Create, read, update, and delete tasks with fields: title, description, due date, priority (low, medium, high), and status (pending, in-progress, completed).

- **Team Collaboration:**  
  Assign tasks to other users. Assigned users receive real-time in-app notifications.

- **Dashboard:**  
  Personalized dashboard shows tasks assigned to the user, tasks created by the user, and overdue tasks.

- **Search & Filter:**  
  Search tasks by title/description. Filter tasks by status, priority, and due date.

---

## Tech Stack

| Layer           | Technology            |
|-----------------|-----------------------|
| Frontend        | Next.js (React)       |
| Backend         | Node.js, NestJS       |
| Database        | MongoDB               |
| Real-time Comm. | Socket.io             |
| Authentication  | JWT, bcrypt           |
| Deployment      | Vercel (frontend), Railway (backend) |

---

## Setup Instructions

### Prerequisites

- Node.js (v16+)
- npm or yarn
- MongoDB instance (local or cloud)
- Environment variables setup (see `.env.example`)
- MONGO_URI=mongodb://127.0.0.1:27017/task_manager
  PORT=3001
  FRONTEND_URL=http://localhost:3000


### Clone & Install

```bash
git clone https://github.com/yourusername/task-management-system.git
cd task-management-system

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
