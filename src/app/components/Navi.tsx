'use client'

import Link from "next/link"
import NavList from "./NavList"


const convenienceMenu = [
  { name: "검색", onClick: () => console.log('검색 클릭'), icon: '/icon_search.png'},
  { name: "쿠폰", href: "/coupon", icon: '/icon_coupon.png'},
  { name: "마이페이지", href: "/myPage", icon: '/icon_mypage.png'},
  { name: "장바구니", href: "/cart", icon: '/icon_cart.png'},
]

const userMenu = [
  { name: "로그인", href: "/login"},
  { name: "회원가입", href: "/signup"},
]

const mainMenu = [
  { name: "볼펜", href: "/ballPen"},
  { name: "만년필", href: "/fountainPen"},
  { name: "지우개", href: "/eraser"},
  { name: "편지/카드", href: "/card"},
  { name: "노트", href: "note"},
  { name: "마스킹 테이프", href: "/tape"},
  { name: "스티커", href: "sticker"},
  { name: "스탬프/실링왁스", href: "/stamp"},
  { name: "키링", href: "/keyring"},
]

export default function Header() {
  return (
    <header className="top-0 w-full bg-white sticky z-2">
      <div className="flex justify-between border-be">
        {/* 편의 메뉴 */}
        <NavList label="convenience-menu" items={convenienceMenu} />

        {/* 타이틀 */}
        <h1>
          <Link href="/">행쇼</Link>
        </h1>

        {/* 유저 메뉴 */}
        <NavList label="user-menu" items={userMenu} />
      </div>

      {/* 메인 메뉴 */}
      <NavList label="main-menu" items={mainMenu} />
    </header>
  )
}