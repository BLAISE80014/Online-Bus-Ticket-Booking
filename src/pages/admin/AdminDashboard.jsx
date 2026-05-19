// src/pages/admin/AdminDashboard.jsx
import React from 'react'
import { Link } from 'react-router-dom'

function AdminDashboard() {
  return (
    <div className="min-h-screen bg-neutral-100 dark:bg-neutral-950 pt-[8ch]">
      <div className="p-8">
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-8 text-center">
          <h1 className="text-3xl font-bold text-violet-600 mb-4">Admin Dashboard</h1>
          <p className="text-neutral-600 dark:text-neutral-400 mb-6">
            Welcome to the Admin Dashboard. This page is under construction.
          </p>
          <Link to="/" className="bg-violet-600 text-white px-6 py-2 rounded-lg hover:bg-violet-700">
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard