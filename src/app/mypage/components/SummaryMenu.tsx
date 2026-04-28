import Link from "next/link";
import { StatData, StatCardProps, UserData } from "../types/user";
import { BadgePercent, BookHeart, ShoppingBasket } from "lucide-react";

const CONSUMER_PATH = "/mypage/consumer";

const STATS_CONFIG: StatData[] = [
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
];

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
  const userData: UserData = {
    orders: 3,
    coupons: 6,
    reviews: 10,
  };
  return (
    <div className="flex gap-6 mx-auto w-full max-w-4xl">
      {STATS_CONFIG.map((stat) => (
        <StatCard
          key={stat.key}
          label={stat.label}
          value={userData[stat.key]}
          href={stat.href}
          icon={stat.icon}
        />
      ))}
    </div>
  );
}
