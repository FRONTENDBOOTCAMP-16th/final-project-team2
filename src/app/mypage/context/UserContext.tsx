'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
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
  store_id?: string
}

type Role = 'USER' | 'BUSINESS' | null

interface UserContextType {
  user: User | null
  role: Role
  isLoading: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  const [authState, setAuthState] = useState<UserContextType>({
    user: null,
    role: null,
    isLoading: true,
  })

  const supabase = createClient()

  useEffect(() => {
    const fetchFullUserData = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          setAuthState({ user: null, role: null, isLoading: false })
          return
        }

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
              .select('id, profile_image')
              .eq('owner_id', profile.id)
              .single()

            if (storeData) {
              finalUserData.store_image = storeData.profile_image
              finalUserData.store_id = storeData.id
            }
          }

          setAuthState({
            user: finalUserData,
            role: profile.role as Role,
            isLoading: false,
          })
        }
      } catch (error) {
        console.error('User fetch error:', error)
        setAuthState((prev) => ({ ...prev, isLoading: false }))
      }
    }

    fetchFullUserData()
  }, [supabase])

  const value = useMemo(() => authState, [authState])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('UserProvider 안에서만 사용 가능합니다.')
  return context
}
