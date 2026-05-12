import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { usePathname } from 'next/navigation'

// 한 틀만 꺼내 쓸 수 있도록 function밖에 위치
const supabase = createClient()

export function useAuth() {
  const [isLogin, setIsLogin] = useState(false)
  const pathname = usePathname()

  // 경로가 변경되면 로그인/로그아웃 확인하여 값 전달
  // getSession으로 현재 유저로그인데이터가 있는지(값이 있으면 로그인상태)확인
  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setIsLogin(!!session)
    }

    checkSession()
  }, [pathname])

  // onAuthStateChange으로 서버에서 오는 로그인토큰을 항상 확인 (로그아웃, 토큰만료시 확인하는 용도)
  // 해당 값이 없어지면 화면 갱신이 안되어도 로그아웃
  // 클린업코드를 추가하여 header가 없을 시 onAuthStateChange 삭제
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLogin(!!session)
    })

    return () => subscription.unsubscribe()
  }, [])

  // 로그아웃 기능
  const handleLogout = async () => {
    await supabase.auth.signOut()
  }

  return { isLogin, handleLogout }
}
