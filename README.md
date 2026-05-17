# GlobalTNA Mini Service Request Board

This is a full-stack web application built for the GlobalTNA Full-Stack Developer Intern Technical Assessment.

The system allows users to create, view, update, and delete service job requests.

---

## 📁 Project Structure

globaltna-job-board/
│
├── frontend/ (Next.js App)
├── backend/ (Node.js + Express API)
└── README.md

---

# ⚙️ Setup Instructions

## 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name

## 2. Backend Setup

cd backend
npm install

🔐 Required Environment Variables (Backend)

Create a .env file inside the backend folder:

PORT=5000
MONGODB_URI=your_mongodb_connection_string

## 3. Frontend Setup

cd frontend
npm install

🔐 Required Environment Variables (Frontend)

Create a .env.local file inside the frontend folder:

NEXT_PUBLIC_API_URL=http://localhost:5000/api

## Run Instructions

# Start Backend Server
cd backend
npm run dev

Backend will run on: http://localhost:5000

# Start Frontend Application
cd frontend
npm run dev

Frontend will run on: http://localhost:3000


🔗 API Overview

## Base URL:

/api/jobs


# Endpoints
GET /api/jobs → Get all jobs
GET /api/jobs/:id → Get single job
POST /api/jobs → Create new job
PATCH /api/jobs/:id → Update job status
DELETE /api/jobs/:id → Delete a job


🧪 Notes
Ensure MongoDB is running or MongoDB Atlas is configured properly
Backend must be running before frontend requests will work
Environment variables must be set correctly for both frontend and backend

👨‍💻 Author

Developed for GlobalTNA Technical Assessment