'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

type Role = 'consumer' | 'seller'
interface UserContextType {
  role: Role
  setRole: (role: Role) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: ReactNode }) {
  // 나중에 DB 연동 전까지 여기서 "consumer"나 "seller"를 바꿔가며 테스트할 수 있습니다.
  const [role, setRole] = useState<Role>('seller')

  return (
    <UserContext.Provider value={{ role, setRole }}>
      {children}
    </UserContext.Provider>
  )
}

// 컴포넌트에서 쉽게 꺼내 쓰기 위한 커스텀 훅
export function useUser() {
  const context = useContext(UserContext)
  if (!context) throw new Error('UserProvider 안에서만 사용 가능합니다.')
  return context
}
