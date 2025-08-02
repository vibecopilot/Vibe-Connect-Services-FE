import type React from "react"
import { Link, Outlet } from "react-router-dom"

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm py-4 px-6 flex items-center justify-between">
        <nav className="flex space-x-6">
          <Link to="/helpdesk" className="text-gray-700 hover:text-blue-600 font-medium">
            Setup
          </Link>
          <Link to="/manage-user" className="text-gray-700 hover:text-blue-600 font-medium">
            Manage User
          </Link>
        </nav>
      </header>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
