'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { createClient } from '@/utils/supabase/client'

type Role = 'USER' | 'BUSINESS' | null

interface UserContextType {
  role: Role
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const fetchUserRole = async () => {
      setIsLoading(true)

      // 현재 로그인한 유저 정보 가져오기
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (user) {
        // 해당 유저의 role을 DB(users 테이블)에서 조회
        const { data: profile } = await supabase
          .from('users')
          .select('role')
          .eq('id', user.id)
          .single()

        setRole(profile?.role || null)
      } else {
        setRole(null)
      }
      setIsLoading(false)
    }

    fetchUserRole()
  }, [supabase])

  return (
    <UserContext.Provider value={{ role, isLoading }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('UserProvider 안에서만 사용 가능합니다.')
  return context
}
