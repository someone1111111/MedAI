import { Link } from 'react-router-dom'

export default function Navbar() {
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
    </nav>
  )
}