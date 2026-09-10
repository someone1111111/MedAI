import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <nav className="px-8 py-4 border-b border-gray-100 bg-white flex items-center gap-8 sticky top-0 z-50">
      <Link to="/" className="font-bold text-lg text-gray-900 no-underline">
        🩺 MediApp
      </Link>

      <div className="flex gap-6 ml-4">
        <Link to="/student" className="text-gray-500 hover:text-teal-600 transition-colors no-underline text-sm font-medium">
          For Students
        </Link>
        <Link to="/patient" className="text-gray-500 hover:text-purple-600 transition-colors no-underline text-sm font-medium">
          For Patients
        </Link>
      </div>

      <div className="ml-auto flex items-center gap-3">
        {isAuthenticated ? (
          <>
            <span className="text-sm text-gray-500">
              👋 {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-gray-200 hover:border-red-300 text-gray-600 hover:text-red-500 text-sm font-medium transition-colors"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-medium text-gray-600 hover:text-teal-600 transition-colors no-underline"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-medium transition-colors no-underline"
            >
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}