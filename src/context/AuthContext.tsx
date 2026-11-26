import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { AuthContext } from './authContextValue'
import { supabase } from '../services/supabase'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!supabase) {
      setLoading(false)
      return
    }
    const client = supabase
    let active = true
    client.auth.getSession().then(({ data }) => {
      if (active) {
        setUser(data.session?.user ?? null)
        setLoading(false)
      }
    })
    const { data: { subscription } } = client.auth.onAuthStateChange((_event, session) => {
      if (active) {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    })
    return () => { active = false; subscription.unsubscribe() }
  }, [])

  async function login(email: string, password: string) {
    if (!supabase) throw new Error('Set up Supabase in .env first.')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
  }

  async function register(email: string, password: string) {
    if (!supabase) throw new Error('Set up Supabase in .env first.')
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) throw error
    return Boolean(data.session)
  }

  async function logout() {
    if (!supabase) return
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{
      user, loading, isAdmin: user?.app_metadata?.role === 'admin', login, register, logout,
    }}>
      {children}
    </AuthContext.Provider>
  )
}
