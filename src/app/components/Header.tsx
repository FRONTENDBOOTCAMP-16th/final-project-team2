import { useAuth } from "@/hooks/useAuth"
import NavList, { NaviProps } from "./NavList"
import { LucideSearch, LucideShoppingCart, LucideUser } from "lucide-react"
import { useState } from "react"
import ConfirmModal from "./main/ConfirmModal"

export default function Header() {
  const { isLogin, handleLogout } = useAuth()
  const [ isLogoutModal, setIsLogoutModal ] = useState(false)

  {/* 유저 메뉴 */}
  const convenienceMenu = [
    { name: '검색', onClick: () => console.log('검색 클릭'), icon: <LucideSearch /> },
    isLogin && { name: '마이페이지', href: '/mypage/consumer', icon: <LucideUser /> },
    { name: '장바구니', href: '/cart', icon: <LucideShoppingCart /> },
    isLogin
      ? { name: '로그아웃', onClick: () => setIsLogoutModal(true), text: '로그아웃' }
      : { name: '로그인', href: '/login', text: '로그인' },
  ].filter(Boolean) as NaviProps[]

  return (
    <>
      <NavList label="convenience-menu" items={convenienceMenu} />

      {isLogoutModal && (
        <ConfirmModal
          isOpen={isLogoutModal}
          onClose={() => setIsLogoutModal(false)}
          title="로그아웃"
          cancel="취소"
          confirm="확인"
          cancelAction={() => setIsLogoutModal(false)}
          confirmAction={async () => {
            await handleLogout()
            setIsLogoutModal(false)
          }}
        >
          로그아웃 하시겠습니까?
        </ConfirmModal>
      )}
    </>
  ) 
}