"use client";

import Link from "next/link";
import { useUser } from "../context/UserContext";
import { StatData, StatCardProps } from "../types/user";
import {
  BadgePercent,
  BookHeart,
  ShoppingBasket,
  Package,
  ClipboardList,
} from "lucide-react";

const CONSUMER_PATH = "/mypage/consumer";
const SELLER_PATH = "/mypage/seller";

const STATS_CONFIG: Record<"consumer" | "seller", StatData[]> = {
  consumer: [
    {
      label: "총 주문",
      key: "orders",
      href: `${CONSUMER_PATH}/orders`,
      icon: ShoppingBasket,
    },
    {
      label: "남은 쿠폰 수",
      key: "coupons",
      href: `${CONSUMER_PATH}/coupons`,
      icon: BadgePercent,
    },
    {
      label: "작성 리뷰 수",
      key: "reviews",
      href: `${CONSUMER_PATH}/reviews`,
      icon: BookHeart,
    },
  ],
  seller: [
    {
      label: "주문 현황",
      key: "orderStatus",
      href: `${SELLER_PATH}/delivery`,
      icon: ClipboardList,
    },
    {
      label: "등록 상품",
      key: "products",
      href: `${SELLER_PATH}/products`,
      icon: Package,
    },
    {
      label: "상점 리뷰",
      key: "reviews",
      href: `${SELLER_PATH}/reviews`,
      icon: BookHeart,
    },
  ],
};

const StatCard = ({ label, value, href, icon: Icon }: StatCardProps) => (
  <Link
    href={href}
    className="flex flex-col items-center flex-1 h-[190px] gap-6 justify-center border-4 border-[#FF6B6B]/50 bg-white hover:bg-[#FF6B6B]/5 transition-colors cursor-pointer"
  >
    <span className="font-black text-5xl">{value}</span>
    <span className="text-[#FF6B6B] font-black text-base flex items-center gap-1">
      {Icon && <Icon size={18} strokeWidth={2.5} />}
      {label}
    </span>
  </Link>
);

export default function SummaryMenu() {
  const { role } = useUser();
  // 테스트용 임의 값
  const mockData = {
    consumer: { orders: 3, coupons: 6, reviews: 10 },
    seller: { orderStatus: 12, products: 45, reviews: 88 },
  };

  const currentStats = STATS_CONFIG[role];
  const currentData = mockData[role];

  return (
    <div className="flex gap-6 mx-auto w-full max-w-4xl">
      {currentStats.map((stat) => (
        <StatCard
          key={stat.key}
          label={stat.label}
          value={currentData[stat.key as keyof typeof currentData]}
          href={stat.href}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
