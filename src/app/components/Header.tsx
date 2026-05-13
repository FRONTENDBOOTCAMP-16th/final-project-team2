import { useAuth } from "@/hooks/useAuth"
import NavList from "./NavList"

interface NaviProps {
  name: string
  href: string
  icon: string
}

export default function Header() {
  const { isLogin, handleLogout } = useAuth()
  
  {/* 유저 메뉴 */}
  const convenienceMenu = [
    { name: '검색', onClick: () => console.log('검색 클릭'), icon: '🔍' },
    isLogin && { name: '마이페이지', href: '/mypage/consumer', icon: '👤' },
    { name: '장바구니', href: '/cart', icon: '🛒' },
    isLogin
      ? { name: '로그아웃', onClick: handleLogout, text: '로그아웃' }
      : { name: '로그인', href: '/login', text: '로그인' },
  ].filter((item): item is NaviProps => item !== false)
  
  return <NavList label="convenience-menu" items={convenienceMenu} />
}