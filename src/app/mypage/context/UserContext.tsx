'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react'
import { createClient } from '@/utils/supabase/client'

interface User {
  id: string
  email?: string
  name: string
  role: 'USER' | 'BUSINESS'
  grade?: string
  profile_image?: string
  store_image?: string
}

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
    const fetchFullUserData = async () => {
      setIsLoading(true)

      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (authUser) {
        const { data: profile } = await supabase
          .from('users')
          .select('id, email, name, role, grade, profile_image')
          .eq('id', authUser.id)
          .single()

        if (profile) {
          const finalUserData: User = { ...profile }

          if (profile.role === 'BUSINESS') {
            const { data: storeData } = await supabase
              .from('stores')
              .select('profile_image')
              .eq('owner_id', profile.id)
              .single()

            if (storeData) {
              finalUserData.store_image = storeData.profile_image
            }
          }

          setUser(finalUserData)
          setRole(profile.role as Role)
        }
      } else {
        setUser(null)
        setRole(null)
      }
      setIsLoading(false)
    }

    fetchFullUserData()
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
