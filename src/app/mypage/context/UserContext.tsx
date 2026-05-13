'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { createClient } from '@/utils/supabase/client'
import { User } from '@supabase/supabase-js'

type Role = 'USER' | 'BUSINESS' | null

interface UserContextType {
  user: User | null
  role: Role
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [role, setRole] = useState<Role>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchUserRole = async () => {
      setIsLoading(true)

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        setUser(authUser) // 유저 정보 저장
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', authUser.id)
          .single()

        setRole(profile?.role || null)
      } else {
        setUser(null)
        setRole(null)
      }
      setIsLoading(false)
    }

    fetchUserRole()
  }, [supabase])

  return (
    <UserContext.Provider value={{ user, role, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('UserProvider 안에서만 사용 가능합니다.')
  return context
}
