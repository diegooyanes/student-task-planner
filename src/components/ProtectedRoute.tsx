import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

function ProtectedRoute({ children, admin = false }: { children: ReactNode, admin?: boolean }) {
  const { user, loading, isAdmin } = useAuth()
  if (loading) return <p>Checking your session...</p>
  if (!user) return <Navigate to="/login" replace />
  if (admin && !isAdmin) return <Navigate to="/tasks" replace />
  return children
}

export default ProtectedRoute
