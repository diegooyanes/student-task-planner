import { useContext } from 'react'
import { AuthContext } from './authContextValue'

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) throw new Error('AuthProvider is required.')
  return context
}
