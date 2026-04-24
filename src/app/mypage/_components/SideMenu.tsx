"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function SideMenu() {
  const pathname = usePathname();
  const role: "consumer" | "seller" = "consumer";

  const CONSUMER_PATH = "/mypage/consumer";
  const SELLER_PATH = "/mypage/seller";

  const menus = {
    consumer: [
      { name: "주문내역", href: `${CONSUMER_PATH}/orders` },
      { name: "프로필 관리", href: `${CONSUMER_PATH}/profile` },
      { name: "찜한 상품", href: `${CONSUMER_PATH}/wishlist` },
    ],
    seller: [
      { name: "나의 상품", href: `${SELLER_PATH}/products` },
      { name: "상품 등록", href: `${SELLER_PATH}/register` },
      { name: "상점 정보 관리", href: `${SELLER_PATH}/info` },
      { name: "배송 상태 관리", href: `${SELLER_PATH}/delivery` },
    ],
  };

  const currentMenu = menus[role];
  return (
    <aside className="w-50 p-3 pt-50">
      <nav aria-label="마이페이지 메뉴">
        <ul className="flex flex-col gap-10">
          {currentMenu.map((menu) => {
            const isActive = pathname === menu.href;
            return (
              <li
                key={menu.name}
                className={`cursor-pointer ${isActive ? "font-bold" : "hover:font-bold"}`}
              >
                <Link
                  href={menu.href}
                  aria-current={isActive ? "page" : undefined}
                >
                  <span className="mr-3" aria-hidden="true">
                    ■
                  </span>
                  {menu.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
}
