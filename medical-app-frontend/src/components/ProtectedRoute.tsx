import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

type Props = {
  children: React.ReactNode
  requiredRole?: 'student'
  allowVisitor?: boolean
}

export default function ProtectedRoute({ children, requiredRole, allowVisitor = false }: Props) {
  const { user, isAuthenticated } = useAuth()

  // Student only routes
  if (requiredRole === 'student') {
    if (!isAuthenticated || user?.role !== 'student') {
      return <Navigate to="/login" replace />
    }
    return <>{children}</>
  }

  // Patient routes — allow visitors, patients and students
  if (!isAuthenticated && !allowVisitor) {
    return <Navigate to="/login" replace />
  }

  return <>{children}</>
}