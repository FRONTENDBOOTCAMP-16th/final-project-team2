'use client'

import { useAuth } from '@/hooks/useAuth'
import NavList, { NaviProps } from './NavList'
import { LucideSearch, LucideShoppingCart, LucideUser } from 'lucide-react'
import { useState } from 'react'
import ConfirmModal from './main/ConfirmModal'
import Modal from './Modal'
import SearchForm from '../search/_components/SearchForm'

export default function Header() {
  const { isLogin, handleLogout } = useAuth()
  const [isLogoutModal, setIsLogoutModal] = useState(false)
  const [isSearchModal, setSearchModal] = useState(false)

  {
    /* 유저 메뉴 */
  }
  const convenienceMenu = [
    {
      name: '검색',
      onClick: () => setSearchModal(true),
      icon: <LucideSearch aria-label="검색" />,
      className: 'hidden md:flex',
    },
    isLogin && {
      name: '마이페이지',
      href: '/mypage',
      icon: <LucideUser aria-label="마이페이지" />,
    },
    {
      name: '장바구니',
      href: '/cart',
      icon: <LucideShoppingCart aria-label="장바구니" />,
      className: 'hidden md:flex',
    },
    isLogin
      ? {
          name: '로그아웃',
          onClick: () => setIsLogoutModal(true),
          text: '로그아웃',
        }
      : { name: '로그인', href: '/login', text: '로그인' },
  ].filter(Boolean) as NaviProps[]

  return (
    <>
      <NavList
        title="유저 서비스 메뉴"
        label="convenience-menu"
        items={convenienceMenu}
      />

      {/* 로그인 모달 */}
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

      {/* 검색 모달 */}
      {isSearchModal && (
        <Modal
          isOpen={isSearchModal}
          onClose={() => setSearchModal(false)}
          title="제품 검색"
        >
          <div className="">
            <SearchForm onClose={() => setSearchModal(false)} />
          </div>
        </Modal>
      )}
    </>
  )
}
