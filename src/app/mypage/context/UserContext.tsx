'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useMemo,
} from 'react'
import { getSupabaseClient } from '@/utils/supabase/client'

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

export function UserProvider({
  children,
  initialUser,
}: {
  children: ReactNode
  initialUser?: User | null
}) {
  // initialUser가 없을 때만 클라이언트 fetch 결과를 담는 state
  const [fetchedUser, setFetchedUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(!initialUser)

  useEffect(() => {
    if (initialUser) return // 서버에서 이미 받았으면 스킵

    const supabase = getSupabaseClient()

    const fetchFullUserData = async () => {
      try {
        const {
          data: { user: authUser },
        } = await supabase.auth.getUser()

        if (!authUser) {
          setIsLoading(false)
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

          setFetchedUser(finalUserData)
        }
      } catch (error) {
        console.error('User fetch error:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFullUserData()
  }, [initialUser])

  // initialUser(서버)가 있으면 그걸 우선 사용, 없으면 클라이언트 fetch 결과 사용
  // initialUser?.id가 바뀌면 자동으로 새 값으로 파생됨 → useEffect 불필요
  const value = useMemo<UserContextType>(() => {
    const activeUser = initialUser ?? fetchedUser
    return {
      user: activeUser,
      role: (activeUser?.role as Role) ?? null,
      isLoading,
    }
  }, [initialUser, fetchedUser, isLoading])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}

export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('UserProvider 안에서만 사용 가능합니다.')
  return context
}
