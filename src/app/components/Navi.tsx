'use client';

import Link from 'next/link';
import NavList from './NavList';

const convenienceMenu = [
  { name: '검색', onClick: () => console.log('검색 클릭'), icon: '🔍' },
  { name: '쿠폰', href: '/mypage/consumer/coupons', icon: '🎫' },
  { name: '마이페이지', href: '/mypage/consumer', icon: '👤' },
  { name: '장바구니', href: '/cart', icon: '🛒' },
];

const mainMenu = [
  { name: '필기구', href: '/products/writing' },
  { name: '페이퍼', href: '/products/paper' },
  { name: '다꾸/데코', href: '/products/deco' },
  { name: '소품/액세서리', href: '/products/accessory' },
];

export default function Header() {
  return (
    <>
      {/* 쿠폰 */}
      {/* 로그인 여부에 따라 해당 쿠폰 표출/비표출 */}
      <Link href={'/coupon'} className="flex px-8 py-2 bg-[#FF6B6B] text-sm text-white focus:z-30">
        🎉 신규가입 시 5,000원 할인쿠폰 증정!
      </Link>

      <header className="top-0 w-full bg-white sticky z-20 border-be border-be-[#2D3142]/9">
        {/* 편의 메뉴 */}
        <div className="flex max-w-7xl px-4 mx-auto md:px-4 py-4 justify-between items-center relative">
          {/* 타이틀 */}
          <h1>
            <Link href="/" className="font-bold text-2xl">
              행쇼마켓
            </Link>
          </h1>

          {/* 스킵링크 */}
          <a href="#main-content" className="sr-only bg-black text-white focus:not-sr-only focus:z-30 focus:absolute top-0 left-0">
            상품 리스트로 바로가기
          </a>

          {/* 메뉴 리스트 */}
          <NavList label="main-menu" items={mainMenu} className="md:absolute md:left-1/2 md:-translate-x-1/2" mainMenu />

          {/* 유저 메뉴 */}
          <NavList label="convenience-menu" items={convenienceMenu} />
        </div>
      </header>
    </>
  );
}
